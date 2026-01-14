import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterSidebar, Filters } from "./FilterSidebar";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
  resultCount: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onClear,
  resultCount,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/80 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl z-50 max-h-[85vh] overflow-hidden lg:hidden"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-border">
              <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <Filter size={18} />
                Filtros
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6">
              <div className="space-y-6">
                <FilterSidebar
                  filters={filters}
                  onChange={onChange}
                  onClear={onClear}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-background">
              <Button
                variant="coral"
                size="full"
                onClick={onClose}
              >
                Ver {resultCount} resultados
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
