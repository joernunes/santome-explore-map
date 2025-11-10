import { MapPin, Users, Palmtree, Globe, Info, Sparkles, Award, Target, Heart } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-sao-tome.jpg";

const Sobre = () => {
  const facts = [
    {
      icon: MapPin,
      title: "Localização",
      description: "Arquipélago no Golfo da Guiné, África Central",
      gradient: "gradient-tropical",
    },
    {
      icon: Users,
      title: "População",
      description: "Aproximadamente 220.000 habitantes",
      gradient: "gradient-ocean",
    },
    {
      icon: Palmtree,
      title: "Biodiversidade",
      description: "Rica em espécies endêmicas de flora e fauna",
      gradient: "gradient-sunset",
    },
    {
      icon: Globe,
      title: "Idioma",
      description: "Português (oficial) e crioulos locais",
      gradient: "gradient-hero",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Header with Gradient */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="São Tomé e Príncipe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>
        
        <div className="relative z-10 p-6 pt-8 pb-12">
          <div className="flex items-center gap-3 mb-4 animate-fade-in">
            <div className="w-12 h-12 rounded-2xl gradient-tropical shadow-glow flex items-center justify-center animate-float">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                São Tomé e Príncipe
              </h1>
              <p className="text-white/90 text-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Paraíso tropical africano
              </p>
            </div>
          </div>

          <p className="text-white/90 text-sm leading-relaxed max-w-lg">
            O segundo menor país africano, mas um dos mais ricos em belezas naturais e cultura
          </p>
        </div>
      </header>

      <div className="p-5 -mt-6 relative z-10 space-y-5 animate-fade-in">
        {/* Facts Grid */}
        <div className="grid grid-cols-2 gap-3">
          {facts.map((fact, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-4 space-y-3">
                <div className={`w-12 h-12 rounded-xl ${fact.gradient} shadow-soft flex items-center justify-center`}>
                  <fact.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-1">{fact.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {fact.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Card */}
        <Card className="overflow-hidden border-0 shadow-card">
          <div className="absolute top-0 right-0 w-32 h-32 gradient-tropical opacity-10 rounded-full -mr-16 -mt-16" />
          <CardContent className="p-6 space-y-4 relative">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-tropical flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Nossa Missão</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Promover o turismo sustentável e a educação sobre as maravilhas naturais e culturais 
              de São Tomé e Príncipe através de tecnologia interativa e acessível.
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="gradient-tropical text-white">
                <Award className="w-3 h-3 mr-1" />
                Educacional
              </Badge>
              <Badge variant="secondary" className="gradient-ocean text-white">
                <Heart className="w-3 h-3 mr-1" />
                Sustentável
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="border-0 shadow-card">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Sobre o Projeto
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Este site foi criado para unir iniciativas educacionais e turísticas de São Tomé e Príncipe, 
                permitindo que moradores, turistas e estudantes descubram o arquipélago de forma interativa.
              </p>
              <p>
                Explore distritos, zonas, pontos turísticos e estabelecimentos locais através de um mapa 
                dinâmico. Descubra praias paradisíacas, florestas tropicais exuberantes, 
                arquitetura colonial preservada e a rica cultura santomense.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card className="border-0 shadow-card overflow-hidden">
          <div className="absolute inset-0 gradient-sunset opacity-5" />
          <CardContent className="p-6 space-y-4 relative">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Curiosidades
            </h2>
            <ul className="space-y-3">
              {[
                "É o segundo menor país da África, com apenas 1.001 km²",
                "Conhecido como 'Ilhas do Chocolate' pela produção de cacau de alta qualidade",
                "Possui uma das maiores concentrações de espécies endêmicas por km² do mundo",
                "Foi desabitado até o século XV, quando foi colonizado por Portugal"
              ].map((fact, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 rounded-lg gradient-sunset flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="text-muted-foreground leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Sobre;
