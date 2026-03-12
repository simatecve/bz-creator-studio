

## Plan: Optimización de código

Optimizaciones sin alterar diseño ni funcionalidad:

### 1. Extraer constante WhatsApp compartida
Crear `src/lib/constants.ts` con `WHATSAPP_NUMBER` y `getWhatsAppUrl()` centralizados. Actualmente están duplicados en `PricingSection`, `CTASection`, `FloatingCTA`, `HeroSection` y `Navbar`.

### 2. Eliminar componente no utilizado
`src/components/NavLink.tsx` no se usa en ningún componente. Se elimina.

### 3. Memoizar partículas en HeroSection
`ParticleField` recalcula el array de partículas en cada render. Mover a constante fuera del componente o usar `useMemo`.

### 4. Eliminar estado innecesario en HeroSection
`mousePos` se usa para el glow radial pero también se setean CSS custom properties. Se puede eliminar el estado React y usar solo CSS custom properties, evitando re-renders en cada movimiento del mouse.

### 5. Limpiar imports no usados
- `TechBar.tsx`: importa `motion` pero no lo usa
- `HeroSection.tsx`: `useState` se puede eliminar si se quita `mousePos` state

### 6. Eliminar archivo no usado
`src/App.css` — verificar si está importado/usado; si no, eliminar.

---

### Archivos a crear
- `src/lib/constants.ts`

### Archivos a modificar
- `src/components/HeroSection.tsx` — memoizar partículas, eliminar estado mousePos innecesario
- `src/components/Navbar.tsx` — usar constante compartida
- `src/components/FloatingCTA.tsx` — usar constante compartida
- `src/components/CTASection.tsx` — usar constante compartida
- `src/components/PricingSection.tsx` — usar constante compartida
- `src/components/TechBar.tsx` — quitar import de motion no usado

### Archivos a eliminar
- `src/components/NavLink.tsx`
- `src/App.css` (si no se usa)

