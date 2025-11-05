import { useState } from "react";
import { Search } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { locations } from "@/data/locations";
import heroImage from "@/assets/hero-sao-tome.jpg";

const Explorar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={heroImage} 
          alt="São Tomé e Príncipe"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">Explorar</h1>
          <p className="text-white/90 text-sm">Descubra os tesouros escondidos do arquipélago</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 -mt-6 relative z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar locais, categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card shadow-lg border-border"
          />
        </div>
      </div>

      {/* Results */}
      <div className="p-4 space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {filteredLocations.length} {filteredLocations.length === 1 ? 'resultado' : 'resultados'}
        </h2>
        
        {filteredLocations.map((location) => (
          <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex gap-3">
              <div className="w-24 h-24 shrink-0">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="flex-1 p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-foreground line-clamp-1">{location.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full whitespace-nowrap">
                    {location.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{location.description}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Explorar;
