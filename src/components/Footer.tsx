import bzLogo from "@/assets/bz-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center">
            <img src={bzLogo} alt="BZ Creators" className="h-12 w-12 rounded-full object-cover" />
          </div>
          <div className="flex gap-6">
            <a href="#servicios" className="text-sm text-muted-foreground hover:text-foreground">Servicios</a>
            <a href="#productos" className="text-sm text-muted-foreground hover:text-foreground">Productos</a>
            <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground">Contacto</a>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 BZ Creators. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
