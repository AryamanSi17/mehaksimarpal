from app.models.rsvp import RSVPCreate, RSVPResponse
from app.database import get_db
from datetime import datetime
import uuid

async def create_rsvp(rsvp_data: RSVPCreate):
    database = get_db()
    
    # Prepare document
    rsvp_dict = rsvp_data.model_dump()
    rsvp_dict["id"] = str(uuid.uuid4())
    rsvp_dict["created_at"] = datetime.utcnow()
    
    # Insert into MongoDB
    await database.rsvps.insert_one(rsvp_dict)
    return RSVPResponse(**rsvp_dict)

async def get_all_rsvps():
    database = get_db()
    rsvps = await database.rsvps.find({}, {"_id": 0}).to_list(1000)
    return [RSVPResponse(**rsvp) for rsvp in rsvps]
