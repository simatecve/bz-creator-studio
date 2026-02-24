import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const badges = [
  { icon: Sparkles, label: "IA Generativa" },
  { icon: Zap, label: "Entrega Rápida" },
  { icon: Shield, label: "Precio Fijo" },
  { icon: Clock, label: "Modelos Custom" },
];

const FloatingOrb = ({ delay, x, y, size, color }: { delay: number; x: string; y: string; size: number; color: string }) => (
  <motion.div
    className="absolute rounded-full blur-[80px] opacity-30"
    style={{ left: x, top: y, width: size, height: size, background: color }}
    animate={{
      x: [0, 30, -20, 10, 0],
      y: [0, -25, 15, -10, 0],
      scale: [1, 1.2, 0.9, 1.1, 1],
      opacity: [0.2, 0.4, 0.15, 0.35, 0.2],
    }}
    transition={{ duration: 12, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
    <motion.div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(circle 400px at var(--mx, 50%) var(--my, 50%), hsl(265 80% 60% / 0.15), transparent)",
      }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
  </div>
);

const ParticleField = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
};

const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
      document.documentElement.style.setProperty("--mx", `${x}%`);
      document.documentElement.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden pt-36">
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <GridBackground />
      <ParticleField />

      {/* Floating orbs */}
      <FloatingOrb delay={0} x="10%" y="20%" size={400} color="hsl(265 80% 60% / 0.12)" />
      <FloatingOrb delay={2} x="70%" y="15%" size={350} color="hsl(280 90% 50% / 0.1)" />
      <FloatingOrb delay={4} x="50%" y="60%" size={300} color="hsl(24 95% 55% / 0.08)" />
      <FloatingOrb delay={6} x="20%" y="70%" size={250} color="hsl(265 60% 40% / 0.1)" />

      {/* Radial glow that follows mouse subtly */}
      <motion.div
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, hsl(265 80% 60% / 0.08), transparent 70%)",
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        transition={{ type: "tween", duration: 0.3 }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative mx-auto flex flex-col items-center px-4 pt-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles size={14} className="text-primary" />
          </motion.span>
          Agencia de IA · Software a Medida
        </motion.div>

        {/* Heading with word-by-word animation */}
        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl" style={{ perspective: "800px" }}>
          <AnimatedText text="Convierte tu idea en un" delay={0.2} />
          <motion.span
            className="text-gradient-orange inline-block"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.9, type: "spring", bounce: 0.4 }}
          >
            <motion.span
              className="inline-block"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundImage: "linear-gradient(135deg, hsl(24 95% 55%), hsl(15 90% 50%), hsl(35 95% 55%), hsl(24 95% 55%))",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              producto real
            </motion.span>
          </motion.span>
          <AnimatedText text=", en semanas." delay={1.1} />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Desarrollo de software impulsado por inteligencia artificial.
          No somos una agencia convencional, somos tu socio tecnológico.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <motion.a
            href="#contacto"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-primary px-8 py-3.5 font-medium text-primary-foreground transition-all hover:shadow-glow-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-white/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            Agenda tu consulta gratis
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href="#servicios"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 font-medium text-foreground transition-colors hover:bg-muted"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver servicios
          </motion.a>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card/50 px-6 py-5 backdrop-blur-sm"
              whileHover={{ y: -4, borderColor: "hsl(265 80% 60% / 0.4)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
              >
                <badge.icon size={18} className="text-primary" />
              </motion.div>
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
