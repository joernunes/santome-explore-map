import { Heart, Sparkles, Star, TrendingUp } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Favoritos = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header with Gradient */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-sunset opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6TTI0IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6TTQ4IDE4YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative z-10 p-6">
          <div className="flex items-center gap-3 mb-4 animate-fade-in">
            <div className="w-12 h-12 rounded-2xl gradient-sunset shadow-glow flex items-center justify-center animate-float">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">Favoritos</h1>
              <p className="text-white/90 text-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Seus locais especiais
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 mt-4 animate-slide-up">
            <div className="glass-effect rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-white" />
                <span className="text-white/80 text-xs">Salvos</span>
              </div>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
            <div className="glass-effect rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-white/80 text-xs">Visitados</span>
              </div>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
          </div>
        </div>
      </header>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-350px)] p-6 animate-fade-in">
        <div className="relative mb-6">
          <div className="absolute inset-0 gradient-sunset opacity-20 blur-2xl rounded-full" />
          <div className="relative w-24 h-24 rounded-3xl gradient-sunset shadow-glow flex items-center justify-center">
            <Heart className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-3 text-center">
          Nenhum favorito ainda
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-sm leading-relaxed mb-6">
          Comece a explorar São Tomé e Príncipe e salve seus locais favoritos para acessá-los rapidamente aqui!
        </p>

        <div className="flex gap-3">
          <Button 
            size="lg"
            className="gradient-tropical shadow-glow"
            onClick={() => navigate('/explorar')}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Explorar Agora
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Ver Mapa
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Favoritos;
