import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
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
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm z-10">
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-sm">STP</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">São Tomé e Príncipe</h1>
            <p className="text-xs text-muted-foreground">Descubra o paraíso tropical</p>
          </div>
        </div>
        
        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </header>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapView 
          locations={filteredLocations}
          onLocationClick={setSelectedLocation}
        />
        
        {/* Quick Info Overlay */}
        <div className="absolute top-4 left-4 right-4 pointer-events-none">
          <div className="bg-card/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-border">
            <p className="text-sm text-muted-foreground">
              {filteredLocations.length} {filteredLocations.length === 1 ? 'local encontrado' : 'locais encontrados'}
            </p>
          </div>
        </div>
      </div>

      {/* Location Details Sheet */}
      <Sheet open={!!selectedLocation} onOpenChange={(open) => !open && setSelectedLocation(null)}>
        <SheetContent side="bottom" className="h-auto max-h-[80vh] overflow-y-auto">
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
