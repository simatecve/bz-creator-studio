import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const avatarColors = [
  "bg-primary/80",
  "bg-secondary/80",
  "bg-accent",
  "bg-primary/60",
];

const testimonials = [
  {
    name: "Valentina R.",
    role: "CEO, TechStart",
    text: "En 3 semanas teníamos nuestro MVP funcionando. La velocidad y calidad de BZ Creators es impresionante.",
    rating: 5,
  },
  {
    name: "Carlos M.",
    role: "Fundador, DataFlow",
    text: "Nos ahorraron meses de desarrollo. Su enfoque con IA realmente acelera todo el proceso.",
    rating: 5,
  },
  {
    name: "Andrea T.",
    role: "COO, RetailPro",
    text: "El equipo entiende perfectamente las necesidades del negocio. No solo programan, piensan contigo.",
    rating: 5,
  },
  {
    name: "Roberto S.",
    role: "CTO, FinApp",
    text: "Crearon nuestra app sin pagar una agencia costosa. Más eficientes y con mejor comunicación.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonios" className="relative py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Testimonios <span className="text-gradient-orange">reales</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Empresas que confiaron en nosotros y lograron resultados extraordinarios.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border card-gradient px-4 py-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-secondary text-secondary" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">4.9/5</span>
            <span className="text-xs text-muted-foreground">basado en 30+ proyectos</span>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border card-gradient p-6"
            >
              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="fill-secondary text-secondary" />
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className={`${avatarColors[i]} text-xs font-bold text-primary-foreground`}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
