import { motion } from "framer-motion";
import { TrendingUp, Users, Brain, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const StorySection = () => {
  return (
    <section id="historia" className="relative py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold md:text-5xl leading-tight">
              Nuestra Evolución: <br />
              <span className="text-gradient-primary">De Freelance a Agencia de IA</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Comenzamos como creadores independientes, entregando proyectos de alta calidad pero con limitaciones de escala. 
              Hoy, somos un equipo multidisciplinario que utiliza la inteligencia artificial no solo como una herramienta, 
              sino como el motor principal de nuestras soluciones.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Esta transición nos ha permitido pasar de "hacer código" a "construir ecosistemas inteligentes" 
              que resuelven problemas complejos en tiempo récord.
            </p>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold text-foreground">100%</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">Enfoque en IA</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold text-foreground">+50</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">Proyectos Escalados</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10"
            >
              <Link
                to="/equipo"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Users size={18} />
                Conoce a los Fundadores
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-10 blur-2xl" />
            <div className="relative grid gap-4 grid-cols-2">
              <div className="space-y-4 pt-12">
                <div className="rounded-2xl border border-border card-gradient p-6">
                  <TrendingUp className="text-primary mb-4" size={28} />
                  <h3 className="font-bold mb-1">Escalabilidad</h3>
                  <p className="text-sm text-muted-foreground">De soluciones aisladas a sistemas integrados.</p>
                </div>
                <div className="rounded-2xl border border-border card-gradient p-6">
                  <Brain className="text-secondary mb-4" size={28} />
                  <h3 className="font-bold mb-1">Cerebro Colectivo</h3>
                  <p className="text-sm text-muted-foreground">IA entrenada con nuestro expertise acumulado.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-border card-gradient p-6">
                  <Users className="text-accent-foreground mb-4" size={28} />
                  <h3 className="font-bold mb-1">Equipo Senior</h3>
                  <p className="text-sm text-muted-foreground">Expertos en cada área del ciclo de vida digital.</p>
                </div>
                <div className="rounded-2xl border border-border card-gradient p-6">
                  <Rocket className="text-primary mb-4" size={28} />
                  <h3 className="font-bold mb-1">Velocidad Agency</h3>
                  <p className="text-sm text-muted-foreground">Entregas semanales con calidad de alto nivel.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
