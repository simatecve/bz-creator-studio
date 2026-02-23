import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react";

const badges = [
  { icon: Sparkles, label: "IA Generativa" },
  { icon: Zap, label: "Entrega Rápida" },
  { icon: Shield, label: "Precio Fijo" },
  { icon: Clock, label: "Modelos Custom" },
];

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden pt-24">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative mx-auto flex flex-col items-center px-4 pt-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground"
        >
          <Sparkles size={14} className="text-primary" />
          Agencia de IA · Software a Medida
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl"
        >
          Convierte tu idea en un{" "}
          <span className="text-gradient-orange">producto real</span>, en semanas.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Desarrollo de software impulsado por inteligencia artificial.
          No somos una agencia convencional, somos tu socio tecnológico.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-3.5 font-medium text-primary-foreground transition-all hover:shadow-glow-primary"
          >
            Agenda tu consulta gratis
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 font-medium text-foreground transition-colors hover:bg-muted"
          >
            Ver servicios
          </a>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {badges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card/50 px-6 py-5 backdrop-blur-sm"
            >
              <badge.icon size={18} className="text-primary animate-pulse-glow" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
