import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path

# Load env from parent dir of app
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(env_path)

MONGO_URL = os.getenv("MONGO_URL")
DB_NAME = os.getenv("DB_NAME", "wedding_db")

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def connect_to_mongo():
    db.client = AsyncIOMotorClient(MONGO_URL)
    db.db = db.client[DB_NAME]
    print(f"Connected to MongoDB: {DB_NAME}")

async def close_mongo_connection():
    if db.client:
        db.client.close()
        print("MongoDB connection closed")

def get_db():
    return db.db
