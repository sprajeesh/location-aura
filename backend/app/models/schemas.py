from pydantic import BaseModel
from typing import List

class LocationAnalyzeRequest(BaseModel):
    address: str
    radiusKm: float = 10.0
    categories: List[str] = []

class Location(BaseModel):
    lat: float
    lon: float

class Feature(BaseModel):
    name: str
    category: str
    distanceKm: float
    latitude: float
    longitude: float

class Score(BaseModel):
    education: int
    healthcare: int
    transport: int
    shopping: int
    overall: int

class AnalyzeResponse(BaseModel):
    location: Location
    features: List[Feature]
    score: Score
