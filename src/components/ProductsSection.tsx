import { motion } from "framer-motion";
import { ExternalLink, BarChart3, MessageSquare, ShoppingCart, CalendarDays, FileText, Dumbbell, Users } from "lucide-react";

const products = [
  {
    icon: Dumbbell,
    name: "GymFlow",
    description: "CRM completo con IA para gimnasios. Gestión de miembros, pagos, rutinas y retención automatizada.",
    tags: ["CRM", "Gimnasios", "IA"],
    status: "Activo",
    link: "https://gymflow.one/",
  },
  {
    icon: Users,
    name: "CRM",
    description: "CRM para WhatsApp y gestión de clientes. Centraliza conversaciones, seguimiento y ventas en un solo lugar.",
    tags: ["CRM", "WhatsApp", "Ventas"],
    status: "Activo",
    link: "#",
  },
  {
    icon: BarChart3,
    name: "Analytics AI",
    description: "Dashboard inteligente con insights automáticos para tu negocio. Reportes en tiempo real con IA.",
    tags: ["SaaS", "Analytics", "IA"],
    status: "Activo",
    link: "#",
  },
  {
    icon: MessageSquare,
    name: "ChatBot Pro",
    description: "Chatbot con IA conversacional entrenado con tus datos. Atención 24/7 para tus clientes.",
    tags: ["Chatbot", "NLP", "Soporte"],
    status: "Activo",
    link: "#",
  },
  {
    icon: ShoppingCart,
    name: "QuickShop",
    description: "Plataforma e-commerce optimizada con recomendaciones personalizadas por IA.",
    tags: ["E-commerce", "IA", "Pagos"],
    status: "Beta",
    link: "#",
  },
  {
    icon: CalendarDays,
    name: "Agenda Smart",
    description: "Sistema de reservas inteligente con optimización automática de horarios y recordatorios.",
    tags: ["Booking", "Automatización"],
    status: "Activo",
    link: "#",
  },
  {
    icon: FileText,
    name: "DocuSign AI",
    description: "Gestión documental con extracción automática de datos, firma digital y workflows.",
    tags: ["Documentos", "OCR", "IA"],
    status: "Próximamente",
    link: "#",
  },
];

const ProductsSection = () => {
  return (
    <section id="productos" className="relative py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Nuestros <span className="text-gradient-primary">Mini SaaS</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Software que hemos creado y que puedes usar hoy. Productos listos con la calidad de BZ Creator.
          </p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-orange" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col rounded-2xl border border-border card-gradient p-6 transition-all hover:border-secondary/30 hover:shadow-glow-orange"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                  <product.icon size={22} className="text-secondary" />
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    product.status === "Activo"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : product.status === "Beta"
                      ? "bg-primary/10 text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {product.status}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{product.name}</h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-secondary/80"
              >
                SABER MÁS <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
