

## Mejoras Persuasivas para BZ Creator

Tras analizar el sitio completo, estas son las mejoras que pueden aumentar significativamente la confianza y conversion del visitante:

---

### 1. Contador de Estadisticas Animado (Social Proof con Numeros)
Agregar una seccion de metricas clave entre el Hero y Servicios con numeros animados que cuentan desde 0:
- "+50 Proyectos entregados"
- "+30 Clientes satisfechos"  
- "4.9 Rating promedio"
- "3 Semanas tiempo promedio"

Los numeros se animan al entrar en viewport, creando un efecto visual impactante que genera confianza inmediata.

---

### 2. Logos de Tecnologias / Trust Bar
Una barra horizontal debajo de las estadisticas con logos de tecnologias que usan (React, Python, OpenAI, AWS, etc.) con scroll automatico tipo marquee. Esto comunica competencia tecnica sin necesidad de explicar.

---

### 3. Seccion FAQ (Preguntas Frecuentes)
Agregar un acordeon antes del CTA final con preguntas como:
- "Que pasa si no me gusta el resultado?"
- "Cuanto tiempo toma un proyecto?"
- "El codigo es mio?"
- "Que tecnologias usan?"
- "Puedo cancelar la suscripcion?"

Esto elimina objeciones comunes y reduce friccion antes de la decision de contacto.

---

### 4. Banner de Urgencia / Disponibilidad Limitada
Agregar un banner sutil en la parte superior del sitio (encima del navbar) indicando disponibilidad limitada:
"Solo aceptamos 3 proyectos nuevos por mes -- 1 lugar disponible"

Esto crea escasez y motiva accion rapida.

---

### 5. Testimonios Mejorados con Fotos y Empresas
Agregar avatares generados (iniciales con colores) a los testimonios existentes para humanizarlos. Tambien agregar un "rating global" visible tipo: "4.9/5 basado en 30+ proyectos".

---

### 6. CTA Flotante en Mobile
Un boton flotante "Agendar Llamada" que aparece en mobile cuando el usuario hace scroll mas alla del hero, manteniendose siempre visible en la parte inferior de la pantalla.

---

### 7. Mejora del CTA Final con Formulario Inline
Transformar la seccion CTA de un simple boton a un mini formulario con campos de nombre y email + boton, reduciendo los pasos para contactar. Incluir texto de confianza: "Sin spam. Respondemos en menos de 24h."

---

### Detalles Tecnicos

**Archivos a crear:**
- `src/components/StatsSection.tsx` -- Contadores animados
- `src/components/TechBar.tsx` -- Marquee de logos de tecnologias
- `src/components/FAQSection.tsx` -- Acordeon con preguntas frecuentes
- `src/components/FloatingCTA.tsx` -- Boton flotante mobile

**Archivos a modificar:**
- `src/pages/Index.tsx` -- Integrar las nuevas secciones en el orden correcto
- `src/components/CTASection.tsx` -- Agregar mini formulario inline
- `src/components/TestimonialsSection.tsx` -- Agregar avatares y rating global
- `src/components/Navbar.tsx` -- Agregar banner de urgencia encima
- `src/index.css` -- Animacion de marquee para la barra de tecnologias

**Orden de las secciones actualizado:**
```text
Banner de Urgencia (top bar)
Navbar
Hero
Stats (contadores animados)
Tech Bar (logos marquee)
Servicios
Proceso
Precios
Productos (Mini SaaS)
Testimonios (mejorados)
FAQ
CTA (con formulario)
Footer
Floating CTA (mobile only)
```

**Dependencias:** No se requieren nuevas dependencias. Se usara framer-motion (ya instalado) para las animaciones de contadores y el componente Accordion de Radix (ya instalado) para el FAQ.

