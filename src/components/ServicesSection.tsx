import { motion } from "framer-motion";
import { Code2, Brain, Rocket, Users } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Desarrollo a Medida",
    description: "Aplicaciones web y móviles diseñadas específicamente para tu negocio con tecnología de última generación.",
    color: "text-primary",
  },
  {
    icon: Brain,
    title: "Integración de IA",
    description: "Automatización inteligente y modelos de IA personalizados para optimizar tus procesos empresariales.",
    color: "text-secondary",
  },
  {
    icon: Rocket,
    title: "MVPs & Startups",
    description: "Lanza tu producto al mercado en semanas, no meses. Validación rápida con desarrollo ágil.",
    color: "text-accent-foreground",
  },
  {
    icon: Users,
    title: "Consultoría Tech",
    description: "Asesoría estratégica para implementar tecnología que impulse el crecimiento de tu empresa.",
    color: "text-primary",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="relative py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Primero claridad.{" "}
            <span className="text-gradient-orange">Luego velocidad.</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Te escuchamos, entendemos tu visión y construimos la solución perfecta con tecnología de punta.
          </p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-primary" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border card-gradient p-6 transition-all hover:border-primary/30 hover:shadow-glow-primary"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <service.icon size={22} className={service.color} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
