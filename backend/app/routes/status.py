from fastapi import APIRouter, Field
from pydantic import BaseModel, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone
from app.database import get_db

router = APIRouter(prefix="/status", tags=["Status"])

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

@router.post("/", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    db = get_db()
    status_obj = StatusCheck(client_name=input.client_name)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@router.get("/", response_model=List[StatusCheck])
async def get_status_checks():
    db = get_db()
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks
