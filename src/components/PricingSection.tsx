import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Crown, Rocket } from "lucide-react";

const WHATSAPP_NUMBER = "549222761666";

const getWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const plans = [
  {
    icon: Zap,
    name: "Proyecto Custom",
    subtitle: "Pago único por proyecto",
    price: "Desde $2,500",
    period: "USD / proyecto",
    description: "Ideal para lanzar tu idea con un equipo dedicado. Precio fijo, sin sorpresas.",
    features: [
      "Análisis y planificación completa",
      "Diseño UI/UX personalizado",
      "Desarrollo frontend + backend",
      "Integración de IA si aplica",
      "Entrega en 4-8 semanas",
      "30 días de soporte post-lanzamiento",
      "Código fuente 100% tuyo",
    ],
    cta: "Solicitar cotización",
    whatsappMessage: "Hola! Me interesa solicitar una cotización para un Proyecto Custom con BZ Creators.",
    highlighted: false,
  },
  {
    icon: Crown,
    name: "Suscripción Growth",
    subtitle: "Tu equipo tech por una fracción",
    price: "$1,999",
    period: "USD / mes",
    description: "Acceso continuo a desarrollo, mantenimiento y mejoras. Como tener un equipo in-house.",
    features: [
      "Todo lo del plan Custom",
      "Desarrollo continuo cada semana",
      "Prioridad en entregas",
      "Reuniones semanales de avance",
      "Mantenimiento y actualizaciones",
      "Soporte prioritario 24/7",
      "Escalable según necesidad",
      "Sin contratos a largo plazo",
    ],
    cta: "Comenzar ahora",
    whatsappMessage: "Hola! Quiero comenzar con la Suscripción Growth de BZ Creators.",
    highlighted: true,
  },
  {
    icon: Rocket,
    name: "Enterprise",
    subtitle: "Para empresas que escalan",
    price: "Personalizado",
    period: "Contactar ventas",
    description: "Soluciones a gran escala con equipos dedicados, SLAs y arquitectura enterprise.",
    features: [
      "Todo lo del plan Growth",
      "Equipo dedicado exclusivo",
      "Arquitectura escalable",
      "SLA garantizado",
      "Auditorías de seguridad",
      "Integración con sistemas legacy",
      "Consultoría estratégica CTO",
    ],
    cta: "Hablar con ventas",
    whatsappMessage: "Hola! Me interesa el plan Enterprise de BZ Creators. Quisiera hablar con ventas.",
    highlighted: false,
  },
];

const PricingSection = () => {
  return (
    <section id="precios" className="relative py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Ofertas <span className="text-gradient-orange">activas</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Elige por proyecto o suscríbete para desarrollo continuo. Sin letra chica, precios transparentes.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                plan.highlighted
                  ? "border-secondary/50 card-gradient shadow-glow-orange"
                  : "border-border card-gradient hover:border-primary/30"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-orange px-4 py-1 text-xs font-semibold text-secondary-foreground">
                  Más popular
                </div>
              )}

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <plan.icon
                  size={22}
                  className={plan.highlighted ? "text-secondary" : "text-primary"}
                />
              </div>

              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.subtitle}</p>

              <div className="my-6 border-t border-border pt-6">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="ml-2 text-sm text-muted-foreground">{plan.period}</span>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {plan.description}
              </p>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${
                        plan.highlighted ? "text-secondary" : "text-primary"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsAppUrl(plan.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-gradient-orange text-secondary-foreground hover:shadow-glow-orange"
                    : "border border-border bg-muted text-foreground hover:border-primary/40 hover:bg-muted/80"
                }`}
              >
                {plan.cta}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
