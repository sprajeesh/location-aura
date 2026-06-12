from fastapi import APIRouter, HTTPException
from app.models.schemas import LocationAnalyzeRequest, AnalyzeResponse
from app.services.location import LocationService

router = APIRouter()
location_service = LocationService()

@router.post("/location/analyze", response_model=AnalyzeResponse)
async def analyze_location(req: LocationAnalyzeRequest):
    location = await location_service.get_coordinates(req.address)
    if not location:
        raise HTTPException(status_code=404, detail="Address not found")
        
    features = await location_service.get_features(location.lat, location.lon, req.radiusKm)
    
    # Sort features by distance
    features.sort(key=lambda x: x.distanceKm)
    
    score = location_service.calculate_scores(features, req.radiusKm)
    
    return AnalyzeResponse(
        location=location,
        features=features,
        score=score
    )
