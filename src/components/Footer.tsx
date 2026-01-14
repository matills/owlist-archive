import * as React from "react";
import { Twitter, Github, Instagram, Heart } from "lucide-react";
import logo from "@/assets/logo.png";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const footerLinks = {
  Producto: ["Características", "Precios", "Changelog", "Roadmap"],
  Recursos: ["Blog", "Documentación", "API", "Guías"],
  Legal: ["Privacidad", "Términos", "Cookies"],
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Owlist" className="w-10 h-10 invert" />
              <span className="font-display text-2xl font-bold">Owlist</span>
            </a>
            <p className="text-background/70 mb-6 max-w-xs">
              Tu compañero perfecto para rastrear películas, series y anime. 
              Nunca pierdas la pista de lo que quieres ver.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary-dark transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-lg mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-background/70 hover:text-secondary-light transition-colors"
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
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-background/60 text-sm">
          <p>© 2024 Owlist. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart size={14} className="text-primary fill-primary" /> para los amantes del cine
          </p>
        </div>
      </div>
    </footer>
  );
};
