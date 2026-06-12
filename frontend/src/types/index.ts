export interface Location {
  lat: number;
  lon: number;
}

export interface Feature {
  name: string;
  category: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
}

export interface Score {
  education: number;
  healthcare: number;
  transport: number;
  shopping: number;
  overall: number;
}

export interface AnalyzeResponse {
  location: Location;
  features: Feature[];
  score: Score;
}
