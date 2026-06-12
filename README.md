# Location Intelligence MVP

Location Intelligence is a web application that helps property buyers evaluate the accessibility and convenience of a location by visualizing nearby facilities and calculating location scores.

## Architecture

- **Frontend**: React, TypeScript, Vite, React Leaflet, Tailwind CSS
- **Backend**: Python, FastAPI, Pydantic, HTTPX, uv package manager

## Setup Instructions

### Docker (Recommended)

1. Ensure Docker and Docker Compose are installed.
2. Run `docker-compose up --build`
3. Frontend is available at `http://localhost:5173`
4. Backend API is available at `http://localhost:8000/api`

### Manual Setup

**Backend**:

```bash
cd backend
uv sync
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend**:

```bash
cd frontend
npm install
npm run dev
```
