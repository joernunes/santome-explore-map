import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Location } from "./LocationCard";

interface MapViewProps {
  locations: Location[];
  onLocationClick: (location: Location) => void;
  routeData?: {
    coordinates: [number, number][];
    distance: number;
    duration: number;
  } | null;
  userLocation?: { lat: number; lng: number } | null;
}

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icons by category
const createCustomIcon = (category: string) => {
  const colors: Record<string, string> = {
    Natureza: "#10b981",
    Cultura: "#f59e0b",
    Lazer: "#3b82f6",
    Comércio: "#8b5cf6",
    Gastronomia: "#ef4444",
  };

  const color = colors[category] || "#6b7280";

  return L.divIcon({
    className: "custom-marker-icon",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="3"/>
          <circle cx="16" cy="16" r="6" fill="white"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

// Component to auto-fit bounds when route changes
const FitBounds = ({ routeData }: { routeData?: { coordinates: [number, number][] } | null }) => {
  const map = useMap();

  useEffect(() => {
    if (routeData?.coordinates && routeData.coordinates.length > 0) {
      const bounds = L.latLngBounds(routeData.coordinates.map(coord => [coord[1], coord[0]]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [routeData, map]);

  return null;
};

const MapView = ({ locations, onLocationClick, routeData, userLocation }: MapViewProps) => {
  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[0.3302, 6.7273]}
        zoom={10}
        className="absolute inset-0 z-0"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={L.divIcon({
              className: "user-location-marker",
              html: `
                <div style="
                  width: 24px;
                  height: 24px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                ">
                  <div style="
                    width: 24px;
                    height: 24px;
                    background: #3b82f6;
                    border: 4px solid white;
                    border-radius: 50%;
                    box-shadow: 0 0 0 2px #3b82f6, 0 2px 8px rgba(0,0,0,0.3);
                    animation: pulse 2s infinite;
                  "></div>
                </div>
                <style>
                  @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.8; }
                  }
                </style>
              `,
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            })}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm">Sua Localização</h3>
                <p className="text-xs text-muted-foreground">Localização atual</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Location markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(location.category)}
            eventHandlers={{
              click: () => onLocationClick(location),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-sm mb-1">{location.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{location.category}</p>
                <p className="text-xs line-clamp-2">{location.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route polyline */}
        {routeData?.coordinates && routeData.coordinates.length > 0 && (
          <>
            <Polyline
              positions={routeData.coordinates.map(coord => [coord[1], coord[0]] as [number, number])}
              color="#3b82f6"
              weight={4}
              opacity={0.8}
            />
            {/* Start marker (green) */}
            <Marker
              position={[routeData.coordinates[0][1], routeData.coordinates[0][0]]}
              icon={L.divIcon({
                className: "route-marker",
                html: `
                  <div style="width: 20px; height: 20px; background: #10b981; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
                `,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              })}
            />
            {/* End marker (red) */}
            <Marker
              position={[
                routeData.coordinates[routeData.coordinates.length - 1][1],
                routeData.coordinates[routeData.coordinates.length - 1][0],
              ]}
              icon={L.divIcon({
                className: "route-marker",
                html: `
                  <div style="width: 20px; height: 20px; background: #ef4444; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
                `,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              })}
            />
            <FitBounds routeData={routeData} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
