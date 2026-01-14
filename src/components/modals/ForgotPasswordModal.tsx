import * as React from "react";
import { Modal } from "@/components/Modal";
import { OwlistInput } from "@/components/OwlistInput";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modalStore";
import { useAuthStore } from "@/stores/authStore";
import { Mail, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const ForgotPasswordModal: React.FC = () => {
  const { activeModal, closeModal, openModal } = useModalStore();
  const { resetPassword, isLoading } = useAuthStore();
  const [email, setEmail] = React.useState("");
  const [emailSent, setEmailSent] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el correo. Intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setEmail("");
    setEmailSent(false);
    closeModal();
  };

  return (
    <Modal isOpen={activeModal === "forgot"} onClose={handleClose}>
      <div className="space-y-6">
        {!emailSent ? (
          <>
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                Recuperar Contraseña
              </h2>
              <p className="text-muted-foreground">
                Ingresa tu correo electrónico y te enviaremos un enlace para
                restablecer tu contraseña.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <OwlistInput
                label="Correo electrónico"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail size={18} />}
                required
              />

              <Button type="submit" variant="teal" size="full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Enviando...
                  </>
                ) : (
                  "Enviar enlace"
                )}
              </Button>
            </form>

            <button
              type="button"
              onClick={() => openModal("login")}
              className="flex items-center gap-2 text-sm text-secondary hover:text-secondary-dark transition-colors mx-auto"
            >
              <ArrowLeft size={16} />
              Volver al inicio de sesión
            </button>
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                ¡Correo enviado!
              </h2>
              <p className="text-muted-foreground">
                Hemos enviado un enlace de recuperación a{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Revisa tu bandeja de entrada.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-success/10 border-l-4 border-success">
              <p className="text-sm text-foreground">
                Si no recibes el correo en los próximos minutos, revisa tu
                carpeta de spam.
              </p>
            </div>

            <Button
              variant="teal-outline"
              size="full"
              onClick={handleClose}
            >
              Cerrar
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
