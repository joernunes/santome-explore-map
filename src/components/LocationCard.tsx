import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  return (
    <Card className="overflow-hidden animate-in slide-in-from-bottom duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={location.image} 
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{location.name}</h3>
          <span className="inline-block mt-1 px-2 py-1 bg-primary/80 text-primary-foreground text-xs rounded-full">
            {location.category}
          </span>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground">{location.description}</p>
        
        <div className="space-y-2">
          {location.hours && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>{location.hours}</span>
            </div>
          )}
          
          {location.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span>{location.phone}</span>
            </div>
          )}
          
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary mt-0.5" />
            <span className="text-muted-foreground">
              {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            <MapPin className="w-4 h-4 mr-2" />
            Como chegar
          </Button>
          {location.website && (
            <Button size="sm" variant="outline">
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationCard;
