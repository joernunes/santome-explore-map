import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigation2, Settings2, MapPin, Clock, Ruler } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import RouteCalculator from "@/components/RouteCalculator";
import MapView from "@/components/MapView";
import { locations } from "@/data/locations";
import { Location } from "@/components/LocationCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDistance, formatDuration } from "@/lib/openrouteservice";

const Rotas = () => {
  const location = useLocation();
  const [routeData, setRouteData] = useState<{
    coordinates: [number, number][];
    distance: number;
    duration: number;
  } | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [initialDestination, setInitialDestination] = useState<Location | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (location.state?.selectedDestination) {
      setInitialDestination(location.state.selectedDestination);
      setSheetOpen(true);
    }
  }, [location.state]);

  return (
    <div className="h-screen flex flex-col bg-background relative">
      {/* Map - Full Screen */}
      <div className="flex-1 relative">
        <MapView
          locations={locations}
          onLocationClick={() => {}}
          routeData={routeData}
          userLocation={userLocation}
        />

        {/* Route Info Overlay - Only shown when route is calculated */}
        {routeData && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-2rem)] max-w-md animate-slide-down">
            <Card className="glass-effect border-0 shadow-elevated backdrop-blur-xl bg-background/95">
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-tropical flex items-center justify-center flex-shrink-0">
                      <Ruler className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {formatDistance(routeData.distance)}
                      </p>
                      <p className="text-xs text-muted-foreground">Distância</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-ocean flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {formatDuration(routeData.duration)}
                      </p>
                      <p className="text-xs text-muted-foreground">Tempo</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Floating Action Button */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="absolute bottom-24 right-4 z-[1000] h-14 w-14 rounded-full gradient-ocean shadow-glow p-0 animate-scale-in"
            >
              <Settings2 className="w-6 h-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="bottom" 
            className="h-[85vh] rounded-t-3xl border-0 p-0"
          >
            <SheetHeader className="sticky top-0 z-10 glass-effect border-b border-border/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-ocean flex items-center justify-center">
                  <Navigation2 className="w-5 h-5 text-white" />
                </div>
                <SheetTitle className="text-xl">Calcular Rota</SheetTitle>
              </div>
            </SheetHeader>
            <div className="overflow-y-auto h-[calc(85vh-80px)] px-6 py-6">
              <RouteCalculator
                locations={locations}
                onRouteCalculated={(data) => {
                  setRouteData(data);
                  setSheetOpen(false);
                }}
                onCurrentLocationChange={setUserLocation}
                initialDestination={initialDestination}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* Empty State */}
        {!routeData && !sheetOpen && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] pointer-events-none">
            <div className="glass-effect rounded-2xl p-6 shadow-elevated max-w-sm mx-4 text-center animate-fade-in">
              <div className="w-14 h-14 rounded-full gradient-ocean mx-auto mb-3 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <p className="text-sm text-foreground/80 font-medium mb-2">
                Toque no botão abaixo para calcular sua rota
              </p>
              <p className="text-xs text-muted-foreground">
                Configure origem e destino
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Rotas;
