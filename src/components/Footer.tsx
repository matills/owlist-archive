import * as React from "react";
import { Twitter, Github, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
];

const footerLinks = {
  Producto: ["Características", "Catálogo", "Logros", "Precios"],
  Recursos: ["Documentación", "Blog", "Ayuda", "API"],
  Legal: ["Privacidad", "Términos", "Cookies"],
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-foreground/10 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Owlist" className="w-10 h-10" />
              <span className="font-display text-2xl font-bold text-foreground">Owlist</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-xs text-sm">
              Tu compañero para películas, series y anime.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground text-sm hover:text-secondary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-foreground/10 text-center text-muted-foreground text-sm">
          <p>© 2026 Owlist. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
