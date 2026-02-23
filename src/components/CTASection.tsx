import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contacto" className="relative py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border card-gradient p-12 text-center md:p-16"
        >
          {/* Glow effects */}
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-secondary/10 blur-[100px]" />

          <div className="relative">
            <h2 className="text-3xl font-bold md:text-5xl">
              Agenda una{" "}
              <span className="text-gradient-orange">llamada</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
              En 20 minutos te damos un plan claro: alcance, tiempo y costo. Sin compromiso, sin letra chica.
            </p>
            <a
              href="#"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-orange px-8 py-4 font-semibold text-secondary-foreground transition-all hover:shadow-glow-orange"
            >
              Reservar consulta gratis
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
