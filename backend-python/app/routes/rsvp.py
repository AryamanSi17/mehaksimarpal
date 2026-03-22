from fastapi import APIRouter, HTTPException, status
from typing import List
from app.models.rsvp import RSVPCreate, RSVPResponse
from app.services import rsvp_service

router = APIRouter(prefix="/rsvps", tags=["RSVPs"])

@router.post("/", response_model=RSVPResponse, status_code=status.HTTP_201_CREATED)
async def submit_rsvp(rsvp: RSVPCreate):
    try:
        return await rsvp_service.create_rsvp(rsvp)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while submitting RSVP: {str(e)}"
        )

@router.get("/", response_model=List[RSVPResponse])
async def list_rsvps():
    try:
        return await rsvp_service.get_all_rsvps()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while fetching RSVPs: {str(e)}"
        )
