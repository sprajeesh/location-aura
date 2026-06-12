import httpx
import math
import os
from typing import List, Optional
from app.models.schemas import AnalyzeResponse, Location, Feature, Score

# Basic Haversine formula for distance
def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0 # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

class LocationService:
    def __init__(self):
        self.user_agent = os.getenv("NOMINATIM_USER_AGENT", "location-intelligence-mvp/1.0")
        
    async def get_coordinates(self, address: str) -> Optional[Location]:
        async with httpx.AsyncClient() as client:
            try:
                res = await client.get(
                    "https://nominatim.openstreetmap.org/search",
                    params={"q": address, "format": "json", "limit": 1},
                    headers={"User-Agent": self.user_agent},
                    timeout=10.0
                )
                data = res.json()
                if data and len(data) > 0:
                    return Location(lat=float(data[0]["lat"]), lon=float(data[0]["lon"]))
            except Exception as e:
                print(f"Geocoding error: {e}")
        return None

    async def get_features(self, lat: float, lon: float, radius_km: float) -> List[Feature]:
        radius_m = radius_km * 1000
        overpass_query = f"""
        [out:json][timeout:25];
        (
          node["amenity"~"school|university|hospital|clinic|pharmacy|police|fire_station|library"](around:{radius_m},{lat},{lon});
          node["public_transport"~"station|stop_position"](around:{radius_m},{lat},{lon});
          node["shop"~"mall|supermarket"](around:{radius_m},{lat},{lon});
          node["leisure"~"park"](around:{radius_m},{lat},{lon});
        );
        out body;
        """
        features = []
        async with httpx.AsyncClient() as client:
            try:
                res = await client.post(
                    "https://overpass-api.de/api/interpreter",
                    data=overpass_query,
                    timeout=30.0
                )
                data = res.json()
                for element in data.get("elements", []):
                    tags = element.get("tags", {})
                    name = tags.get("name", "")
                    
                    category = "unknown"
                    if "amenity" in tags: category = tags["amenity"]
                    elif "public_transport" in tags: category = tags["public_transport"]
                    elif "shop" in tags: category = tags["shop"]
                    elif "leisure" in tags: category = tags["leisure"]
                    
                    dist = haversine(lat, lon, element["lat"], element["lon"])
                    
                    features.append(Feature(
                        name=name,
                        category=category,
                        distanceKm=dist,
                        latitude=element["lat"],
                        longitude=element["lon"]
                    ))
            except Exception as e:
                print(f"Overpass error: {e}")
        return features

    def calculate_scores(self, features: List[Feature], radius_km: float) -> Score:
        # Simple scoring algorithm based on count and proximity
        counts = {"education": 0, "healthcare": 0, "transport": 0, "shopping": 0}
        
        for f in features:
            cat = f.category
            if cat in ["school", "university", "library"]: counts["education"] += 1
            elif cat in ["hospital", "clinic", "pharmacy"]: counts["healthcare"] += 1
            elif cat in ["station", "stop_position"]: counts["transport"] += 1
            elif cat in ["mall", "supermarket"]: counts["shopping"] += 1

        def score_calc(count, max_expected):
            return min(100, int((count / max_expected) * 100))

        edu_score = score_calc(counts["education"], 5)
        health_score = score_calc(counts["healthcare"], 3)
        trans_score = score_calc(counts["transport"], 10)
        shop_score = score_calc(counts["shopping"], 5)
        overall = int((edu_score + health_score + trans_score + shop_score) / 4)

        return Score(
            education=edu_score,
            healthcare=health_score,
            transport=trans_score,
            shopping=shop_score,
            overall=overall
        )

    async def analyze(self, req: AnalyzeResponse) -> AnalyzeResponse: # Overloaded
        pass # Will use below
