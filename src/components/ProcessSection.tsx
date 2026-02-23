import { motion } from "framer-motion";
import { FileSearch, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: FileSearch,
    phase: "Fase 1",
    title: "Planificación",
    description: "Analizamos tu idea, definimos alcance, y creamos un roadmap claro con entregables semanales.",
  },
  {
    icon: Code,
    phase: "Fase 2",
    title: "Desarrollo",
    description: "Construimos tu producto con sprints semanales, demos frecuentes y comunicación constante.",
  },
  {
    icon: Rocket,
    phase: "Fase 3",
    title: "Lanzamiento & Soporte",
    description: "Lanzamos tu producto al mercado con soporte continuo, iteraciones y mejoras basadas en datos.",
  },
];

const ProcessSection = () => {
  return (
    <section id="proceso" className="relative py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Plan claro, <span className="text-gradient-primary">semana a semana</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Un proceso transparente donde siempre sabes qué está pasando y cuándo se entrega.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-2xl border border-border card-gradient p-8 text-center"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-border md:block" />
              )}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary">
                <step.icon size={24} className="text-primary-foreground" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-secondary">
                {step.phase}
              </span>
              <h3 className="mt-2 text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
