# Mehak & Simarpal Wedding Backend

Node.js/Express backend for handling RSVPs and wedding data.

## Features
- RSVP Submission & Retrieval
- MongoDB Integration
- CORS configured for React Frontend
- Status Heartbeat

## Setup
1. Install dependencies: `npm install`
2. Set .env variables:
   - `MONGO_URL`
   - `DB_NAME`
   - `PORT` (Default: 8000)
3. Start dev server: `npm run dev`

## API Endpoints
- `POST /api/rsvps` - Submit a new RSVP
- `GET /api/rsvps` - List all RSVPs
- `GET /api/status` - Check API status
