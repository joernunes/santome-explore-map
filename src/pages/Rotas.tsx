import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigation2, Sparkles, MapPin } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import RouteCalculator from "@/components/RouteCalculator";
import MapView from "@/components/MapView";
import { locations } from "@/data/locations";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Location } from "@/components/LocationCard";

const Rotas = () => {
  const location = useLocation();
  const [routeData, setRouteData] = useState<{
    coordinates: [number, number][];
    distance: number;
    duration: number;
  } | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [initialDestination, setInitialDestination] = useState<Location | null>(null);

  useEffect(() => {
    if (location.state?.selectedDestination) {
      setInitialDestination(location.state.selectedDestination);
    }
  }, [location.state]);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Hero Header with Gradient */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-ocean opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6TTI0IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6TTQ4IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative z-10 p-6">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-12 h-12 rounded-2xl gradient-ocean shadow-glow flex items-center justify-center animate-float">
              <Navigation2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">Calcular Rotas</h1>
              <p className="text-white/90 text-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Encontre o melhor caminho
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Route Calculator Form */}
        <div className="h-[42%] border-b border-border/50 bg-muted/20">
          <ScrollArea className="h-full">
            <div className="p-5">
              <RouteCalculator
                locations={locations}
                onRouteCalculated={setRouteData}
                onCurrentLocationChange={setUserLocation}
                initialDestination={initialDestination}
              />
            </div>
          </ScrollArea>
        </div>

        {/* Map */}
        <div className="h-[58%] relative">
          {!routeData && (
            <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
              <div className="glass-effect rounded-2xl p-6 shadow-elevated max-w-sm mx-4 text-center animate-fade-in">
                <div className="w-14 h-14 rounded-full gradient-ocean mx-auto mb-3 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm text-foreground/80 font-medium">
                  Configure origem e destino para calcular sua rota
                </p>
              </div>
            </div>
          )}
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
