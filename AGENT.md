# Location Intelligence - Agent Instructions

This repository contains the source code for the "Location Intelligence" application.

## Project Overview

"Location Intelligence" is a web application that helps property buyers evaluate the accessibility and convenience of a location by visualizing nearby facilities and calculating location scores based on OpenStreetMap data. 
**Important Note**: The application is configured to focus on **New Zealand**.

## Technology Stack

- **Frontend**: React, TypeScript, Vite, React Leaflet, Tailwind CSS v3
- **Backend**: Python, FastAPI, Pydantic, HTTPX, `uv` for dependency management
- **APIs**: Nominatim (Geocoding), Overpass (OSM Data)
- **Deployment**: Docker, Docker Compose

## Architecture

- `frontend/`: Contains the Vite React application. 
- `backend/`: Contains the FastAPI application following Clean Architecture principles (Controllers, Services, Repositories).

## Commands

### Running with Docker (Recommended)
From the project root:
- Build and start: `docker compose up --build`
- Start existing containers: `docker compose up`

### Running Manually
**Backend (Python + uv):**
```bash
cd backend
# Create virtual environment and install dependencies
uv sync
# Activate the virtual environment
source .venv/bin/activate
# Start the server (uvicorn)
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**Frontend (Node.js + Vite):**
```bash
cd frontend
npm install
npm run dev
```

## Key Principles & Important Configurations

- **Aesthetics First:** Ensure the UI looks premium, dynamic, and responsive.
- **Clean Architecture:** The backend must separate concerns (Controllers, Services, Repositories).
- **Extensibility:** The backend must be designed to easily add new data sources in the future.
- **Frontend Types:** `verbatimModuleSyntax` is enabled. You MUST use type-only imports for TypeScript types (e.g., `import type { AnalyzeResponse } from './types'`).
- **Tailwind Config:** The project uses standard Tailwind CSS v3 structure (`tailwind.config.js`, `postcss.config.js`). Do not upgrade to v4 without restructuring the configuration.

## MUST NOT DO
- **DO NOT push directly to the `main` branch.** All changes must be pushed to a feature or fix branch.
- **DO NOT commit or push any changes** without explicit instruction from the user.
