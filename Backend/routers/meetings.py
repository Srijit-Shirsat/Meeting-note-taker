from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, status
import os, shutil, base64
from datetime import datetime
from sqlalchemy.orm import Session
from db.database import get_db, Meeting
from schema import MeetingResponse
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage , SystemMessage
from dotenv import load_dotenv
import sqlite3 
from langgraph.checkpoint.sqlite import SqliteSaver
from langchain.agents import create_agent
from typing import List
from fastapi.responses import FileResponse,Response 
from reportlab.lib.pagesizes import letter 
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from pypdf import PdfReader, PdfWriter
import io


router = APIRouter(prefix="/api/meetings", tags=["Meetings"])
load_dotenv()

DB_PATH = "meeting_note.db"
UPLOAD_DIR = "uploads"

def get_checkpointer():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    checkpointer = SqliteSaver(conn)
    checkpointer.setup()
    return checkpointer

checkpointer = get_checkpointer()

def initialize_audio_agent():
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite")
    
    agent = create_agent(
        model=llm,
        tools=[],
        checkpointer=checkpointer
    )
    return agent

audio_agent = initialize_audio_agent()

@router.post("/{meeting_id}/process", response_model=MeetingResponse)
def process_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    try:
        meeting.status = "processing"
        db.commit()

        with open(meeting.file_path, "rb") as f:
            audio_base64 = base64.b64encode(f.read()).decode("utf-8")

        config = {"configurable": {"thread_id": f"transcription_{meeting_id}"}}

        system_prompt = SystemMessage(content="""
            You are a professional note taker agent. 
            Your task is to listen to the provided audio of meeting and return a 
            complete structured notes, action items, key discussion points, and attendee summaries
        """)
        
        user_prompt = HumanMessage(
            content=[
                {"type": "text", "text": "Please take notes of this audio file."},
                {
                    "type": "media", 
                    "mime_type": "audio/mpeg", 
                    "data": audio_base64
                }
            ]
        )

        result = audio_agent.invoke(
            {"messages": [system_prompt, user_prompt]}, 
            config=config
        )

        transcription_text = result["messages"][-1].content

        meeting.transcription = transcription_text
        meeting.status = "completed"
        db.commit()
        db.refresh(meeting)

        return meeting

    except Exception as e:
        meeting.status = "failed"
        db.commit()
        raise HTTPException(status_code=500, detail=f"Agent Processing Error: {str(e)}")

@router.post("/", response_model=MeetingResponse)
def upload_meeting(title: str = Form(...), file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    new_meeting = Meeting(
        title=title,
        file_path=file_path,
        date=datetime.now().strftime("%Y-%m-%d"),
        status="pending"
    )
    db.add(new_meeting)
    db.commit()
    db.refresh(new_meeting)
    return new_meeting

@router.get("/", response_model=List[MeetingResponse])
def get_all_meetings(db: Session = Depends(get_db)):
    try:
        db_meetings = db.query(Meeting).all()
        meetings_list = list(map(MeetingResponse.model_validate, db_meetings))
        
        return meetings_list
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database error while fetching meetings: {str(e)}"
        )
        
        
@router.get("/{meeting_id}", response_model=MeetingResponse)
def get_meeting_details(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting

@router.delete("/{meeting_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_meeting(meeting_id : int,db:Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    try:
        if os.path.exists(meeting.file_path):
            os.remove(meeting.file_path)
            
        db.delete(meeting)
        db.commit()
        
        return None
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"error during database:{str(e)}")

@router.get("/{meeting_id}/export")
def export_meeting(meeting_id: int, format: str = "pdf", db: Session = Depends(get_db)):
    meeting = db.query(Meeting).filter(Meeting.id == meeting_id).first()
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    # Handle Markdown export
    if format == "markdown":
        content = f"# {meeting.title}\nDate: {meeting.date}\n\n## Transcription\n{meeting.transcription}"
        return Response(content=content, media_type="text/markdown")
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []
    
    story.append(Paragraph(f"<b>Meeting: {meeting.title}</b>", styles['Title']))
    story.append(Paragraph(f"Date: {meeting.date}", styles['Normal']))
    story.append(Spacer(1, 12))

    story.append(Paragraph("<b>Full Transcription:</b>", styles['Heading2']))
    clean_text = (meeting.transcription or "No transcription available.").replace('\n', '<br/>')
    story.append(Paragraph(clean_text, styles['Normal']))
    doc.build(story)

    buffer.seek(0)
    reader = PdfReader(buffer)
    writer = PdfWriter()
    
    for page in reader.pages:
        writer.add_page(page)

    final_buffer = io.BytesIO()
    writer.write(final_buffer)
    
    return Response(
        content=final_buffer.getvalue(),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={meeting.title}.pdf"}
    )
    
@router.get("/search", response_model=List[MeetingResponse])
def search_meetings(query:str = None, date:str = None, db:Session = Depends(get_db)):
    
    db_query = db.query(Meeting)
    
    if query:
        db_query=db_query.filter(Meeting.title.ilike(f"%{query}%"))
        
    if date:
        db_query = db_query.filter(Meeting.date == date)
        
        return db_query.all()