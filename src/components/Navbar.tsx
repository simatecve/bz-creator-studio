import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import bzLogo from "@/assets/bz-logo.png";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Precios", href: "#precios" },
  { label: "Productos", href: "#productos" },
  { label: "Testimonios", href: "#testimonios" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30" style={{ background: "linear-gradient(135deg, hsl(0 0% 12%) 0%, hsl(0 0% 6%) 100%)" }}>
      <div className="container mx-auto flex items-center justify-between py-3">
        <a href="#inicio">
          <img src={bzLogo} alt="BZ Creators" className="h-14 w-14 rounded-full object-cover" />
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contacto"
          className="hidden rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-glow-primary md:inline-block"
        >
          Comenzar
        </a>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                className="inline-block rounded-full bg-gradient-primary px-6 py-2.5 text-center text-sm font-medium text-primary-foreground"
              >
                Comenzar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
