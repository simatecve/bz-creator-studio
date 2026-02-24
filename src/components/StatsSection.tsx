import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Proyectos entregados" },
  { value: 30, suffix: "+", label: "Clientes satisfechos" },
  { value: 4.9, suffix: "", label: "Rating promedio", decimals: 1 },
  { value: 3, suffix: "", label: "Semanas tiempo promedio" },
];

const AnimatedNumber = ({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const mv = useMotionValue(0);
    const unsub = mv.on("change", (v) => setDisplay(v.toFixed(decimals)));
    animate(mv, value, { duration: 2, ease: "easeOut" });
    return unsub;
  }, [isInView, value, decimals]);

  return (
    <span ref={ref} className="text-4xl font-bold text-foreground md:text-5xl">
      {display}{suffix}
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
