import { useState, useEffect } from "react";
import { Location } from "./LocationCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Car, User, Bike, MapPin, Navigation, Locate } from "lucide-react";
import { calculateRoute, formatDistance, formatDuration, TransportMode } from "@/lib/openrouteservice";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface RouteCalculatorProps {
  locations: Location[];
  onRouteCalculated: (routeData: {
    coordinates: [number, number][];
    distance: number;
    duration: number;
  }) => void;
  onCurrentLocationChange?: (location: { lat: number; lng: number } | null) => void;
  initialDestination?: Location | null;
}

const RouteCalculator = ({ locations, onRouteCalculated, onCurrentLocationChange, initialDestination }: RouteCalculatorProps) => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination.id);
      setUseCurrentAsOrigin(false);
      setUseCurrentAsDestination(false);
    }
  }, [initialDestination]);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [useCurrentAsOrigin, setUseCurrentAsOrigin] = useState(false);
  const [useCurrentAsDestination, setUseCurrentAsDestination] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [transportMode, setTransportMode] = useState<TransportMode>("driving-car");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ distance: number; duration: number } | null>(null);
  const { toast } = useToast();

  const getCurrentLocation = (isOrigin: boolean) => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocalização não disponível",
        description: "Seu navegador não suporta geolocalização",
        variant: "destructive",
      });
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        setCurrentLocation(location);
        onCurrentLocationChange?.(location);
        
        if (isOrigin) {
          setUseCurrentAsOrigin(true);
          setOrigin("");
          toast({
            title: "Localização obtida!",
            description: "Sua localização atual será usada como origem",
          });
        } else {
          setUseCurrentAsDestination(true);
          setDestination("");
          toast({
            title: "Localização obtida!",
            description: "Sua localização atual será usada como destino",
          });
        }
        setGettingLocation(false);
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        toast({
          title: "Erro ao obter localização",
          description: "Verifique as permissões de localização",
          variant: "destructive",
        });
        setGettingLocation(false);
      }
    );
  };

  const handleCalculate = async () => {
    const hasOrigin = origin || useCurrentAsOrigin;
    const hasDestination = destination || useCurrentAsDestination;

    if (!hasOrigin || !hasDestination) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione origem e destino",
        variant: "destructive",
      });
      return;
    }

    let originCoords: { lat: number; lng: number };
    let destinationCoords: { lat: number; lng: number };

    if (useCurrentAsOrigin && currentLocation) {
      originCoords = currentLocation;
    } else {
      const originLocation = locations.find((l) => l.id === origin);
      if (!originLocation) return;
      originCoords = { lat: originLocation.lat, lng: originLocation.lng };
    }

    if (useCurrentAsDestination && currentLocation) {
      destinationCoords = currentLocation;
    } else {
      const destinationLocation = locations.find((l) => l.id === destination);
      if (!destinationLocation) return;
      destinationCoords = { lat: destinationLocation.lat, lng: destinationLocation.lng };
    }

    setLoading(true);
    try {
      const routeData = await calculateRoute(
        [originCoords.lng, originCoords.lat],
        [destinationCoords.lng, destinationCoords.lat],
        transportMode
      );

      setResult({
        distance: routeData.distance,
        duration: routeData.duration,
      });

      onRouteCalculated(routeData);

      toast({
        title: "Rota calculada!",
        description: `${formatDistance(routeData.distance)} • ${formatDuration(routeData.duration)}`,
      });
    } catch (error) {
      console.error("Erro ao calcular rota:", error);
      toast({
        title: "Erro ao calcular rota",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const transportModes = [
    { value: "driving-car" as TransportMode, label: "Carro", icon: Car },
    { value: "foot-walking" as TransportMode, label: "A pé", icon: User },
    { value: "cycling-regular" as TransportMode, label: "Bicicleta", icon: Bike },
  ];

  return (
    <div className="space-y-5">
      {/* Origin and Destination */}
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2.5">
          <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5 text-green-500" />
            </div>
            Origem
          </label>
          <div className="flex gap-2">
            <Select 
              value={origin} 
              onValueChange={(value) => {
                setOrigin(value);
                setUseCurrentAsOrigin(false);
              }}
              disabled={useCurrentAsOrigin}
            >
              <SelectTrigger className="flex-1 h-12 border-2 rounded-xl">
                <SelectValue placeholder={useCurrentAsOrigin ? "Localização atual" : "Selecione o ponto de partida"} />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant={useCurrentAsOrigin ? "default" : "outline"}
              size="icon"
              onClick={() => getCurrentLocation(true)}
              disabled={gettingLocation}
              title="Usar minha localização"
              className="h-12 w-12 border-2"
            >
              <Locate className={`w-5 h-5 ${gettingLocation ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
          {useCurrentAsOrigin && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20">
              <Locate className="w-4 h-4 text-primary" />
              <p className="text-xs text-primary font-medium">Usando sua localização atual</p>
            </div>
          )}
        </div>

        <div className="space-y-2.5">
          <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Navigation className="w-3.5 h-3.5 text-red-500" />
            </div>
            Destino
          </label>
          <div className="flex gap-2">
            <Select 
              value={destination} 
              onValueChange={(value) => {
                setDestination(value);
                setUseCurrentAsDestination(false);
              }}
              disabled={useCurrentAsDestination}
            >
              <SelectTrigger className="flex-1 h-12 border-2 rounded-xl">
                <SelectValue placeholder={useCurrentAsDestination ? "Localização atual" : "Selecione o destino"} />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant={useCurrentAsDestination ? "default" : "outline"}
              size="icon"
              onClick={() => getCurrentLocation(false)}
              disabled={gettingLocation}
              title="Usar minha localização"
              className="h-12 w-12 border-2"
            >
              <Locate className={`w-5 h-5 ${gettingLocation ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
          {useCurrentAsDestination && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary/10 border border-secondary/20">
              <Locate className="w-4 h-4 text-secondary" />
              <p className="text-xs text-secondary font-medium">Usando sua localização atual</p>
            </div>
          )}
        </div>
      </div>

      {/* Transport Mode */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">Modo de Transporte</label>
        <div className="grid grid-cols-3 gap-3">
          {transportModes.map((mode) => (
            <Button
              key={mode.value}
              variant={transportMode === mode.value ? "default" : "outline"}
              onClick={() => setTransportMode(mode.value)}
              className={`flex flex-col items-center gap-2 h-auto py-4 border-2 transition-all duration-300 ${
                transportMode === mode.value 
                  ? "shadow-glow scale-105" 
                  : "hover:scale-105 hover:border-primary/30"
              }`}
            >
              <mode.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{mode.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <Button 
        onClick={handleCalculate} 
        disabled={loading} 
        size="lg"
        className="w-full h-12 gradient-ocean shadow-glow text-base font-semibold"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Calculando...
          </>
        ) : (
          <>
            <Navigation className="w-5 h-5 mr-2" />
            Calcular Rota
          </>
        )}
      </Button>

      {/* Result */}
      {result && (
        <Card className="border-0 shadow-elevated overflow-hidden animate-scale-in">
          <div className="absolute inset-0 gradient-tropical opacity-5" />
          <CardContent className="p-5 relative">
            <div className="grid grid-cols-2 gap-5">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl gradient-tropical mx-auto mb-2 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">
                  {formatDistance(result.distance)}
                </p>
                <p className="text-xs text-muted-foreground font-medium">Distância Total</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl gradient-ocean mx-auto mb-2 flex items-center justify-center">
                  <Navigation className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">
                  {formatDuration(result.duration)}
                </p>
                <p className="text-xs text-muted-foreground font-medium">Tempo Estimado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RouteCalculator;
