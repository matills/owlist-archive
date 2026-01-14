import * as React from "react";
import { motion } from "framer-motion";
import mascot from "@/assets/mascot.png";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "¡Ups! No encontramos nada",
  message = "Intenta ajustar los filtros o buscar algo diferente.",
  actionLabel,
  onAction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.img
        src={mascot}
        alt="Owlist Mascot"
        className="w-32 h-32 mb-6 opacity-70 grayscale"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">{message}</p>
      {actionLabel && onAction && (
        <Button variant="coral" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};
