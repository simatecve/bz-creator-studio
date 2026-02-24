import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={`https://wa.me/549222761666?text=${encodeURIComponent("Hola! Quiero agendar una llamada con BZ Creators.")}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-orange px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-glow-orange md:hidden"
        >
          <Phone size={16} />
          Agendar llamada
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
