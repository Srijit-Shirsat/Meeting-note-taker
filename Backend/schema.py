from pydantic import BaseModel
from typing import Optional

class MeetingBase(BaseModel):
    title: str
    date: str
    status: str
    transcription: Optional[str] = None

class MeetingCreate(MeetingBase):
    pass

class MeetingResponse(MeetingBase):
    id: int

    class Config:
        from_attributes = True