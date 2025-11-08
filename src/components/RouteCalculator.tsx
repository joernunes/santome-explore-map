import { useState } from "react";
import { Location } from "./LocationCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Car, User, Bike, MapPin, Navigation, Locate } from "lucide-react";
import { calculateRoute, formatDistance, formatDuration, TransportMode } from "@/lib/openrouteservice";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

interface RouteCalculatorProps {
  locations: Location[];
  onRouteCalculated: (routeData: {
    coordinates: [number, number][];
    distance: number;
    duration: number;
  }) => void;
  onCurrentLocationChange?: (location: { lat: number; lng: number } | null) => void;
}

const RouteCalculator = ({ locations, onRouteCalculated, onCurrentLocationChange }: RouteCalculatorProps) => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
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
    <div className="space-y-4">
      {/* Origin and Destination */}
      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-green-500" />
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
              <SelectTrigger className="flex-1">
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
            >
              <Locate className={`w-4 h-4 ${gettingLocation ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
          {useCurrentAsOrigin && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Locate className="w-3 h-3" />
              Usando sua localização atual
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Navigation className="w-4 h-4 text-red-500" />
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
              <SelectTrigger className="flex-1">
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
            >
              <Locate className={`w-4 h-4 ${gettingLocation ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
          {useCurrentAsDestination && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Locate className="w-3 h-3" />
              Usando sua localização atual
            </p>
          )}
        </div>
      </div>

      {/* Transport Mode */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Modo de Transporte</label>
        <div className="grid grid-cols-3 gap-2">
          {transportModes.map((mode) => (
            <Button
              key={mode.value}
              variant={transportMode === mode.value ? "default" : "outline"}
              onClick={() => setTransportMode(mode.value)}
              className="flex flex-col items-center gap-1 h-auto py-3"
            >
              <mode.icon className="w-5 h-5" />
              <span className="text-xs">{mode.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <Button onClick={handleCalculate} disabled={loading} className="w-full">
        {loading ? "Calculando..." : "Calcular Rota"}
      </Button>

      {/* Result */}
      {result && (
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">
                {formatDistance(result.distance)}
              </p>
              <p className="text-xs text-muted-foreground">Distância</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {formatDuration(result.duration)}
              </p>
              <p className="text-xs text-muted-foreground">Tempo estimado</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RouteCalculator;
