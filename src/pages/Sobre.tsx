import { MapPin, Users, Palmtree, Globe } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-sao-tome.jpg";

const Sobre = () => {
  const facts = [
    {
      icon: MapPin,
      title: "Localização",
      description: "Arquipélago no Golfo da Guiné, África Central",
    },
    {
      icon: Users,
      title: "População",
      description: "Aproximadamente 220.000 habitantes",
    },
    {
      icon: Palmtree,
      title: "Biodiversidade",
      description: "Rica em espécies endêmicas de flora e fauna",
    },
    {
      icon: Globe,
      title: "Idioma",
      description: "Português (oficial) e crioulos locais",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroImage} 
          alt="São Tomé e Príncipe"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="p-6 -mt-12 relative z-10 space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            São Tomé e Príncipe
          </h1>
          <p className="text-muted-foreground">
            O segundo menor país africano, mas um dos mais ricos em belezas naturais e cultura
          </p>
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-2 gap-3">
          {facts.map((fact, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="p-4 space-y-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <fact.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">{fact.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {fact.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About Section */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Sobre este projeto</h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Este site foi criado para unir iniciativas educacionais e turísticas de São Tomé e Príncipe, 
                permitindo que moradores, turistas e estudantes descubram o arquipélago de forma interativa.
              </p>
              <p>
                Explore os distritos, zonas, pontos turísticos e estabelecimentos locais através de um mapa 
                dinâmico e informativo. Descubra praias paradisíacas, florestas tropicais exuberantes, 
                arquitetura colonial preservada e a rica cultura santomense.
              </p>
              <p className="font-medium text-primary">
                Missão: Promover o turismo sustentável e a educação sobre as maravilhas naturais e culturais 
                de São Tomé e Príncipe.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="p-5 space-y-3">
            <h2 className="text-lg font-bold text-foreground">Curiosidades</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>É o segundo menor país da África, com apenas 1.001 km²</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Conhecido como "Ilhas do Chocolate" pela produção de cacau de alta qualidade</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Possui uma das maiores concentrações de espécies endêmicas por km² do mundo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>Foi desabitado até o século XV, quando foi colonizado por Portugal</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Sobre;
