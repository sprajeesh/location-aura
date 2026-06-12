import { useEffect } from "react";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { AnalyzeResponse } from "../types";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapContainer({
  data,
}: {
  data: AnalyzeResponse | null;
}) {
  // Default to New Zealand
  const center: [number, number] = data
    ? [data.location.lat, data.location.lon]
    : [-40.9006, 174.886];

  return (
    <LeafletMap
      center={center}
      zoom={data ? 12 : 5}
      zoomControl={false}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} zoom={data ? 14 : 5} />
      {data && (
        <Marker position={[data.location.lat, data.location.lon]}>
          <Popup>Searched Location</Popup>
        </Marker>
      )}
      {data?.features.map((f, i) => (
        <Marker key={i} position={[f.latitude, f.longitude]}>
          <Popup>
            <strong>{f.name}</strong>
            <br />
            {f.category}
            <br />
            {f.distanceKm.toFixed(2)} km
          </Popup>
        </Marker>
      ))}
    </LeafletMap>
  );
}
