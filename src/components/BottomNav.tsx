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
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
            activeClassName="text-primary"
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs mt-1 ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}>
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
