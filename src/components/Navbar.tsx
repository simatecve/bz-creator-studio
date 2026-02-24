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
{ label: "Testimonios", href: "#testimonios" }];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Banner de urgencia */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary to-accent py-2 md:py-1.5 text-center text-xs md:text-sm font-medium text-primary-foreground">
        <span className="px-4 leading-snug block">🔥 Solo aceptamos 3 proyectos nuevos por mes — <strong>1 lugar disponible</strong></span>
      </div>
    <nav className="fixed top-[40px] md:top-[32px] left-0 right-0 z-50 border-b border-border/30" style={{ background: "linear-gradient(135deg, hsl(0 0% 12%) 0%, hsl(0 0% 6%) 100%)" }}>
      <div className="container mx-auto flex items-center justify-between py-[4px]">
        <a href="#inicio">
          <img src={bzLogo} alt="BZ Creators" className="h-14 w-auto object-contain" />
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground">

              {link.label}
            </a>
          )}
        </div>

        <a
          href={`https://wa.me/549222761666?text=${encodeURIComponent("Hola! Quiero comenzar un proyecto con BZ Creators.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-glow-primary md:inline-block">
          Comenzar
        </a>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}>

          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border bg-background md:hidden">

            <div className="container mx-auto flex flex-col gap-4 py-6">
              {navLinks.map((link) =>
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground">

                  {link.label}
                </a>
            )}
              <a
              href="#contacto"
              className="inline-block rounded-full bg-gradient-primary px-6 py-2.5 text-center text-sm font-medium text-primary-foreground">

                Comenzar
              </a>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>
    </>);

};

export default Navbar;