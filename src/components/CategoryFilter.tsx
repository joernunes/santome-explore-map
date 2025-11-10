import { Mountain, Landmark, School, ShoppingBag, Waves, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

export type CategoryType = "natureza" | "cultura" | "educacao" | "comercio" | "lazer" | "gastronomia" | "todos";

interface Category {
  id: CategoryType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const categories: Category[] = [
  { id: "todos", label: "Todos", icon: Waves, color: "primary" },
  { id: "natureza", label: "Natureza", icon: Mountain, color: "primary" },
  { id: "cultura", label: "Cultura", icon: Landmark, color: "accent" },
  { id: "educacao", label: "Educação", icon: School, color: "secondary" },
  { id: "comercio", label: "Comércio", icon: ShoppingBag, color: "muted" },
  { id: "lazer", label: "Lazer", icon: Waves, color: "secondary" },
  { id: "gastronomia", label: "Gastronomia", icon: UtensilsCrossed, color: "accent" },
];

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;
        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 whitespace-nowrap shrink-0 transition-all duration-300 ${
              isSelected 
                ? "bg-white text-primary shadow-lg scale-105 border-white" 
                : "bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30"
            }`}
          >
            <category.icon className="w-4 h-4" />
            <span className="font-medium">{category.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
