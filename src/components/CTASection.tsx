import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "549222761666";

const CTASection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hola! Quiero agendar una llamada.\n\nNombre: ${name.trim()}\nEmail: ${email.trim()}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

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

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 rounded-full border border-border bg-muted/50 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <input
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-full border border-border bg-muted/50 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-orange px-6 py-3 text-sm font-semibold text-secondary-foreground transition-all hover:shadow-glow-orange"
              >
                Enviar
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              Sin spam. Respondemos en menos de 24h.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
