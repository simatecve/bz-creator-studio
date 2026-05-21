import { motion } from "framer-motion";
import ceoImg from "@/assets/ceo.png";
import ctoImg from "@/assets/cto.jpeg";
import { Linkedin, Twitter, Mail } from "lucide-react";

const team = [
  {
    name: "Fundador & CEO",
    role: "Estrategia & Visión de Producto",
    image: ceoImg,
    bio: "Experto en transformar ideas de negocio en productos digitales escalables. Lidera la visión estratégica de BZ Creators, asegurando que cada solución de IA aporte valor real y medible.",
  },
  {
    name: "Co-Fundador & CTO",
    role: "Arquitectura & Desarrollo de IA",
    image: ctoImg,
    bio: "Arquitecto de software especializado en integración de modelos de lenguaje y automatización. Responsable de la infraestructura tecnológica que permite nuestras entregas semanales de alta precisión.",
  },
];

const TeamSection = () => {
  return (
    <section id="equipo" className="relative py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Detrás de la <span className="text-gradient-primary">Innovación</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            El núcleo estratégico dedicado a redefinir los límites del desarrollo de software mediante Inteligencia Artificial.
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative rounded-3xl border border-border bg-card overflow-hidden transition-all hover:border-primary/30"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 pt-0">
                <div className="mb-4 flex gap-3">
                  <div className="rounded-full bg-white/10 p-2 backdrop-blur-md hover:bg-primary/20 transition-colors">
                    <Linkedin size={18} className="text-white" />
                  </div>
                  <div className="rounded-full bg-white/10 p-2 backdrop-blur-md hover:bg-primary/20 transition-colors">
                    <Twitter size={18} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
