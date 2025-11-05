import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Location } from "./LocationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface MapViewProps {
  locations: Location[];
  onLocationClick: (location: Location) => void;
}

const MapView = ({ locations, onLocationClick }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");
  const [tokenSubmitted, setTokenSubmitted] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    try {
      // Initialize map
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [6.7273, 0.3302], // São Tomé and Príncipe coordinates
        zoom: 10,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      // Add markers for locations
      locations.forEach((location) => {
        const el = document.createElement("div");
        el.className = "custom-marker";
        el.style.backgroundImage = `url(data:image/svg+xml;base64,${btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#10b981" stroke="white" stroke-width="3"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
          </svg>
        `)})`;
        el.style.width = "32px";
        el.style.height = "32px";
        el.style.cursor = "pointer";

        const marker = new mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .addTo(map.current!);

        el.addEventListener("click", () => {
          onLocationClick(location);
        });

        markersRef.current.push(marker);
      });

      // Cleanup
      return () => {
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];
        map.current?.remove();
      };
    } catch (error) {
      console.error("Erro ao inicializar mapa:", error);
    }
  }, [locations, onLocationClick, tokenSubmitted, mapboxToken]);

  if (!tokenSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-background">
        <div className="max-w-md w-full space-y-4">
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div className="space-y-2 text-sm">
              <p className="font-medium">Token Mapbox necessário</p>
              <p className="text-muted-foreground">
                Para visualizar o mapa interativo, você precisa de um token público do Mapbox.
              </p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Acesse <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a></li>
                <li>Crie uma conta gratuita</li>
                <li>Copie seu token público</li>
                <li>Cole abaixo para continuar</li>
              </ol>
            </div>
          </div>
          
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="font-mono text-sm"
            />
            <Button 
              onClick={() => setTokenSubmitted(true)} 
              disabled={!mapboxToken}
              className="w-full"
            >
              Carregar Mapa
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default MapView;
