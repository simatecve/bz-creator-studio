import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Qué pasa si no me gusta el resultado?",
    a: "Trabajamos con ciclos de feedback. Cada entrega incluye revisiones hasta que estés 100% conforme. Tu satisfacción es nuestra prioridad.",
  },
  {
    q: "¿Cuánto tiempo toma un proyecto?",
    a: "Depende del alcance, pero un MVP típico se entrega en 2-4 semanas. En la llamada de consulta te damos un timeline exacto.",
  },
  {
    q: "¿El código es mío?",
    a: "Sí, 100%. Todo el código fuente, diseños y assets te pertenecen completamente una vez finalizado el proyecto.",
  },
  {
    q: "¿Qué tecnologías usan?",
    a: "Usamos React, TypeScript, Python, Node.js, y herramientas de IA como OpenAI. Elegimos el stack ideal según tu proyecto.",
  },
  {
    q: "¿Puedo cancelar la suscripción?",
    a: "Sí, puedes cancelar en cualquier momento sin penalidades. Sin contratos largos ni letra chica.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Preguntas <span className="text-gradient-orange">frecuentes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Resolvemos tus dudas antes de dar el primer paso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border border-border card-gradient px-6"
              >
                <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
