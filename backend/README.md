# Location Intelligence - Backend

This is the backend component of the Location Intelligence application. It provides a robust API to search for locations, fetch nearby facilities from OpenStreetMap (OSM), and dynamically calculate location scores.

## Architecture

The application is structured following Clean Architecture principles:
- **Controllers:** FastAPI route definitions that handle HTTP requests and responses.
- **Services:** Core business logic for fetching external data and calculating location scores.
- **Repositories/Clients:** Integration with external data providers like Nominatim (for geocoding) and Overpass API (for OSM data).

## Tech Stack

- **Framework:** FastAPI
- **Language:** Python 3.12
- **Data Validation:** Pydantic
- **HTTP Client:** HTTPX
- **Dependency Management:** [uv](https://github.com/astral-sh/uv)

## Setup & Execution

### Prerequisites
- Python 3.12+
- `uv` package manager installed (`curl -LsSf https://astral.sh/uv/install.sh | sh`)

### Installation

```bash
# Install dependencies and create a virtual environment
uv sync
```

### Running the Server

```bash
# Activate the virtual environment
source .venv/bin/activate

# Run the FastAPI development server
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The API will be available at `http://localhost:8000`. You can access the auto-generated Swagger documentation at `http://localhost:8000/docs`.

### Docker
Alternatively, the backend can be run alongside the frontend using Docker Compose from the root directory:
```bash
docker compose up --build
```
