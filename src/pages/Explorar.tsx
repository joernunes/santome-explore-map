import { useState } from "react";
import { Search, Compass, TrendingUp, Sparkles } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      {/* Hero Header with Gradient */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6TTI0IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6TTQ4IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative z-10 p-6 pb-8">
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="w-12 h-12 rounded-2xl gradient-tropical shadow-glow flex items-center justify-center animate-float">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">Explorar</h1>
              <p className="text-white/90 text-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Descubra tesouros escondidos
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative animate-slide-up">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5 z-10" />
            <Input
              type="text"
              placeholder="Buscar locais, categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 glass-effect border-white/20 text-white placeholder:text-white/60 focus:border-white/40 rounded-2xl shadow-elevated"
            />
          </div>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-3 animate-slide-up">
            <div className="glass-effect rounded-xl px-4 py-2 border border-white/20 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-white font-semibold text-sm">
                {filteredLocations.length} {filteredLocations.length === 1 ? 'local' : 'locais'}
              </span>
            </div>
            {searchTerm && (
              <Badge variant="secondary" className="bg-white/20 text-white border-white/20 hover:bg-white/30">
                Filtrado
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* Results Grid */}
      <div className="p-4 space-y-3 animate-fade-in">
        {filteredLocations.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum resultado</h3>
            <p className="text-sm text-muted-foreground">
              Tente buscar por outro termo ou categoria
            </p>
          </Card>
        ) : (
          filteredLocations.map((location, index) => (
            <Card 
              key={location.id} 
              className="overflow-hidden hover:shadow-elevated transition-all duration-300 group cursor-pointer border-0"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex gap-4 p-1">
                <div className="w-28 h-28 shrink-0 rounded-xl overflow-hidden">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="flex-1 p-3 flex flex-col justify-center">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {location.name}
                    </h3>
                    <Badge variant="secondary" className="gradient-tropical text-white text-xs whitespace-nowrap shrink-0">
                      {location.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {location.description}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Explorar;
