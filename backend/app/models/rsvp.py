from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime
import uuid

class GuestBase(BaseModel):
    name: str = Field(..., min_length=1)
    foodPreference: Optional[str] = None

class RSVPBase(BaseModel):
    email: EmailStr
    attendingAnandKaraj: bool = False
    attendingReception: bool = False
    guests: List[GuestBase] = Field(..., min_length=1)

class RSVPCreate(RSVPBase):
    pass

class RSVPResponse(RSVPBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True
