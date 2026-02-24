import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Proyectos entregados" },
  { value: 30, suffix: "+", label: "Clientes satisfechos" },
  { value: 50, suffix: "k+", label: "USD en proyectos implementados" },
  { value: 3, suffix: "", label: "Semanas tiempo promedio" },
] as const;

const AnimatedNumber = ({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { duration: 2000 });
  const display = useTransform(spring, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  return (
    <span ref={ref} className="text-4xl font-bold text-foreground md:text-5xl">
      <motion.span>{display}</motion.span>{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
