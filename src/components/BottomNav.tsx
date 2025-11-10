import { Map, Compass, Heart, Info, Navigation } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const BottomNav = () => {
  const navItems = [
    { icon: Map, label: "Mapa", path: "/" },
    { icon: Compass, label: "Explorar", path: "/explorar" },
    { icon: Navigation, label: "Rotas", path: "/rotas" },
    { icon: Heart, label: "Favoritos", path: "/favoritos" },
    { icon: Info, label: "Sobre", path: "/sobre" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border/50 z-50 safe-bottom shadow-elevated">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative group"
            activeClassName="text-primary"
          >
            {({ isActive }) => (
              <>
                <div className={`relative transition-all duration-300 ${isActive ? "scale-110" : "group-hover:scale-105"}`}>
                  <div className={`absolute inset-0 rounded-xl blur-md transition-all duration-300 ${
                    isActive ? "bg-primary/30" : "bg-transparent group-hover:bg-primary/10"
                  }`} />
                  <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive ? "gradient-tropical shadow-glow" : "group-hover:bg-primary/10"
                  }`}>
                    <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-primary"
                    }`} />
                  </div>
                </div>
                <span className={`text-xs mt-1.5 font-medium transition-all duration-300 ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                }`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
