import * as React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modalStore";
import { LoginModal } from "@/components/modals/LoginModal";
import { SignupModal } from "@/components/modals/SignupModal";
import { ForgotPasswordModal } from "@/components/modals/ForgotPasswordModal";
import mascot from "@/assets/mascot.png";
import {
  Film,
  Tv,
  Sparkles,
  Trophy,
  ListChecks,
  Heart,
  Star,
  Users,
  BarChart3,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: ListChecks,
    title: "Organiza tu Watchlist",
    description:
      "Crea listas personalizadas para películas, series y anime. Marca lo visto y lo pendiente.",
  },
  {
    icon: Star,
    title: "Califica y Reseña",
    description:
      "Puntúa cada título y comparte tus opiniones con la comunidad.",
  },
  {
    icon: Trophy,
    title: "Logros y Estadísticas",
    description:
      "Desbloquea logros conforme avanzas y visualiza tus hábitos de consumo.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description:
      "Conecta con otros fans, descubre recomendaciones y comparte tus listas.",
  },
  {
    icon: Bell,
    title: "Notificaciones",
    description:
      "Recibe alertas cuando salgan nuevos episodios o películas de tu interés.",
  },
  {
    icon: BarChart3,
    title: "Estadísticas Detalladas",
    description:
      "Visualiza cuánto tiempo has dedicado a ver contenido y tus géneros favoritos.",
  },
];


const Index = () => {
  const { openModal } = useModalStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/10 text-primary font-medium text-sm mb-6">
                <Sparkles size={16} />
                Tu compañero para películas, series y anime
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Nunca pierdas la pista de lo que{" "}
                <span className="text-primary">quieres ver</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Organiza tu watchlist, descubre nuevos títulos, gana logros y
                conecta con una comunidad apasionada por el entretenimiento.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  variant="coral"
                  size="lg"
                  onClick={() => openModal("signup")}
                  className="text-lg px-8"
                >
                  <Heart size={20} />
                  Comenzar gratis
                </Button>
                <Button
                  variant="teal-outline"
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => window.location.href = '/explore'}
                >
                  <Film size={20} />
                  Explorar catálogo
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
            >
              {/* Mascot Image - Central */}
              <div className="relative z-10">
                <img
                  src={mascot}
                  alt="Owlist Mascot"
                  className="w-64 md:w-80 lg:w-96 drop-shadow-2xl"
                />
              </div>
              
              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 lg:-right-4 bg-card rounded-xl p-4 shadow-medium z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Film className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">+120 películas</p>
                    <p className="text-xs text-muted-foreground">este mes</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/3 -left-4 lg:-left-8 bg-card rounded-xl p-4 shadow-medium z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <Tv className="text-secondary" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">8 series</p>
                    <p className="text-xs text-muted-foreground">en progreso</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 right-4 lg:right-0 bg-card rounded-xl p-4 shadow-medium z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                    <Trophy className="text-warning" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">15 logros</p>
                    <p className="text-xs text-muted-foreground">desbloqueados</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
      </section>


      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Todo lo que necesitas para{" "}
              <span className="text-secondary">organizar tu entretenimiento</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Owlist te ofrece las herramientas perfectas para nunca olvidar qué
              ver y disfrutar más de tus películas, series y anime favoritos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="owlist-card group hover:shadow-medium transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <feature.icon className="text-secondary" size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-foreground rounded-2xl p-8 md:p-16 text-center overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-background mb-4">
                ¿Listo para organizar tu watchlist?
              </h2>
              <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
                Únete a miles de usuarios que ya disfrutan de Owlist. Es gratis
                y siempre lo será.
              </p>
              <Button
                variant="coral"
                size="lg"
                onClick={() => openModal("signup")}
                className="text-lg px-10"
              >
                Crear cuenta gratis
              </Button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Auth Modals */}
      <LoginModal />
      <SignupModal />
      <ForgotPasswordModal />
    </div>
  );
};

export default Index;
