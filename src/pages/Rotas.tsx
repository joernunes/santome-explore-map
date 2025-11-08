import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import RouteCalculator from "@/components/RouteCalculator";
import MapView from "@/components/MapView";
import { locations } from "@/data/locations";
import { ScrollArea } from "@/components/ui/scroll-area";

const Rotas = () => {
  const [routeData, setRouteData] = useState<{
    coordinates: [number, number][];
    distance: number;
    duration: number;
  } | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm z-10">
        <div className="p-4">
          <h1 className="text-lg font-bold text-foreground">Calcular Rotas</h1>
          <p className="text-xs text-muted-foreground">
            Encontre o melhor caminho entre dois pontos
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Route Calculator Form - 40% */}
        <div className="h-[40%] border-b border-border">
          <ScrollArea className="h-full">
            <div className="p-4">
              <RouteCalculator
                locations={locations}
                onRouteCalculated={setRouteData}
                onCurrentLocationChange={setUserLocation}
              />
            </div>
          </ScrollArea>
        </div>

        {/* Map - 60% */}
        <div className="h-[60%] relative">
          <MapView
            locations={locations}
            onLocationClick={() => {}}
            routeData={routeData}
            userLocation={userLocation}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Rotas;
