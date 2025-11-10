import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface Location {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  lat: number;
  lng: number;
  hours?: string;
  phone?: string;
  website?: string;
}

interface LocationCardProps {
  location: Location;
  onClose?: () => void;
}

const LocationCard = ({ location, onClose }: LocationCardProps) => {
  const navigate = useNavigate();

  const handleGetDirections = () => {
    navigate("/rotas", { state: { selectedDestination: location } });
    onClose?.();
  };

  return (
    <Card className="overflow-hidden border-0 shadow-elevated animate-scale-in">
      <div className="relative h-56 overflow-hidden group">
        <img 
          src={location.image} 
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {location.name}
              </h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 gradient-tropical text-white text-xs font-medium rounded-full shadow-lg">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                {location.category}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-5 bg-gradient-to-b from-card to-muted/20">
        <p className="text-sm leading-relaxed text-foreground/90">
          {location.description}
        </p>
        
        <div className="space-y-3">
          {location.hours && (
            <div className="flex items-center gap-3 text-sm p-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className="w-8 h-8 rounded-lg gradient-tropical flex items-center justify-center shadow-sm">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">{location.hours}</span>
            </div>
          )}
          
          {location.phone && (
            <div className="flex items-center gap-3 text-sm p-3 rounded-xl bg-secondary/5 border border-secondary/10">
              <div className="w-8 h-8 rounded-lg gradient-ocean flex items-center justify-center shadow-sm">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">{location.phone}</span>
            </div>
          )}
          
          <div className="flex items-center gap-3 text-sm p-3 rounded-xl bg-muted border border-border">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-accent" />
            </div>
            <span className="text-muted-foreground font-mono text-xs">
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </span>
          </div>
        </div>
        
        <div className="flex gap-3 pt-3">
          <Button 
            size="lg" 
            className="flex-1 h-12 gradient-tropical hover:shadow-glow transition-all duration-300 font-semibold" 
            onClick={handleGetDirections}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Como chegar
          </Button>
          {location.website && (
            <Button 
              size="lg" 
              variant="outline" 
              className="h-12 w-12 border-2 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
