import * as React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { OwlistInput } from "@/components/OwlistInput";
import { PasswordStrength } from "@/components/PasswordStrength";
import { Button } from "@/components/ui/button";
import { Lock, Loader2, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [countdown, setCountdown] = React.useState(3);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        description: "Por favor, verifica que ambas contraseñas sean iguales.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement with Supabase
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo restablecer la contraseña. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isSuccess && countdown === 0) {
      navigate("/");
    }
  }, [isSuccess, countdown, navigate]);

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="owlist-card text-center max-w-md w-full">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">
            Enlace inválido
          </h1>
          <p className="text-muted-foreground mb-6">
            Este enlace de recuperación no es válido o ha expirado.
          </p>
          <Button variant="coral" onClick={() => navigate("/")}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="owlist-card max-w-[480px] w-full p-10">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Owlist" className="w-16 h-16" />
        </div>

        {!isSuccess ? (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Nueva Contraseña
              </h1>
              <p className="text-muted-foreground">
                Ingresa tu nueva contraseña
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <OwlistInput
                  label="Nueva contraseña"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock size={18} />}
                  showPasswordToggle
                  required
                />
                <PasswordStrength password={password} />
              </div>

              <OwlistInput
                label="Confirmar contraseña"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                leftIcon={<Lock size={18} />}
                showPasswordToggle
                error={
                  confirmPassword && password !== confirmPassword
                    ? "Las contraseñas no coinciden"
                    : undefined
                }
                required
              />

              <Button
                type="submit"
                variant="coral"
                size="full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Restableciendo...
                  </>
                ) : (
                  "Restablecer contraseña"
                )}
              </Button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                ¡Contraseña actualizada!
              </h2>
              <p className="text-muted-foreground">
                Tu contraseña ha sido restablecida correctamente.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-success/10 border-l-4 border-success">
              <p className="text-sm text-foreground">
                Redirigiendo en {countdown}...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
