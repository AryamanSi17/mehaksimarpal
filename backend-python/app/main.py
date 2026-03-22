from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import connect_to_mongo, close_mongo_connection
from app.routes import rsvp, status
import os

app = FastAPI(title="Mehak & Simarpal Wedding API")

# Configure CORS
origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Lifecycle events
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

# Include routers
app.include_router(rsvp.router, prefix="/api")
app.include_router(status.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the Wedding API", "status": "online"}
