import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sparkles, MapPin } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import CategoryFilter, { CategoryType } from "@/components/CategoryFilter";
import LocationCard, { Location } from "@/components/LocationCard";
import MapView from "@/components/MapView";
import { locations as allLocations } from "@/data/locations";
import heroImage from "@/assets/hero-sao-tome.jpg";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("todos");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const filteredLocations = selectedCategory === "todos" 
    ? allLocations 
    : allLocations.filter(loc => 
        loc.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Hero Header with Gradient */}
      <header className="relative overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6TTI0IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6TTQ4IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative z-10">
          {/* Logo and Title */}
          <div className="p-6 pb-4">
            <div className="flex items-center gap-4 mb-4 animate-fade-in">
              <div className="w-14 h-14 rounded-2xl gradient-tropical shadow-glow flex items-center justify-center animate-float">
                <span className="text-white font-bold text-xl">🏝️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                  São Tomé e Príncipe
                </h1>
                <p className="text-white/90 text-sm flex items-center gap-1.5 mt-1">
                  <Sparkles className="w-4 h-4" />
                  Descubra o paraíso tropical
                </p>
              </div>
            </div>
            
            {/* Stats Banner */}
            <div className="glass-effect rounded-2xl p-4 border border-white/20 shadow-elevated animate-slide-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {filteredLocations.length}
                    </p>
                    <p className="text-white/80 text-xs">
                      {filteredLocations.length === 1 ? 'Local' : 'Locais'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-xs">Categoria</p>
                  <p className="text-white font-medium text-sm capitalize">
                    {selectedCategory}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="px-6 pb-4">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapView 
          locations={filteredLocations}
          onLocationClick={setSelectedLocation}
        />
      </div>

      {/* Location Details Sheet */}
      <Sheet open={!!selectedLocation} onOpenChange={(open) => !open && setSelectedLocation(null)}>
        <SheetContent side="bottom" className="h-auto max-h-[80vh] overflow-y-auto rounded-t-3xl border-t-0">
          {selectedLocation && (
            <LocationCard 
              location={selectedLocation}
              onClose={() => setSelectedLocation(null)}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;
