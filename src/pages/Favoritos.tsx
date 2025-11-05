import { Heart } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";

const Favoritos = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border p-6">
        <h1 className="text-2xl font-bold text-foreground">Favoritos</h1>
        <p className="text-sm text-muted-foreground mt-1">Seus locais salvos</p>
      </header>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] p-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Nenhum favorito ainda</h2>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Comece a explorar São Tomé e Príncipe e salve seus locais favoritos para acessá-los rapidamente aqui!
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Favoritos;
