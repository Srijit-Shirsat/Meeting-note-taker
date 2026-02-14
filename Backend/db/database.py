import os
from dotenv import load_dotenv
from sqlalchemy.orm.session import Session
from sqlalchemy import Column, Integer, String, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE)
SessionLocal = sessionmaker[Session](autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column[int](Integer, primary_key=True, index=True)
    title = Column[str](String)
    file_path = Column[str](String)
    date = Column[str](String)
    transcription = Column[str](Text, nullable=True) 
    status = Column[str](String, default="pending") 

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()