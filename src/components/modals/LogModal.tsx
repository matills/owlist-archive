import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Star, Heart, ChevronLeft, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { StarRating } from "@/components/media/StarRating";
import { mockMedia, Media } from "@/data/mockMedia";
import { cn } from "@/lib/utils";

interface LogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "search" | "log";

export const LogModal: React.FC<LogModalProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = React.useState<Step>("search");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedMedia, setSelectedMedia] = React.useState<Media | null>(null);
  const [watchedOn, setWatchedOn] = React.useState(new Date().toISOString().split("T")[0]);
  const [hasWatchedBefore, setHasWatchedBefore] = React.useState(false);
  const [review, setReview] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [liked, setLiked] = React.useState(false);

  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open && step === "search") {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [open, step]);

  React.useEffect(() => {
    if (!open) {
      // Reset state when modal closes
      setTimeout(() => {
        setStep("search");
        setSearchQuery("");
        setSelectedMedia(null);
        setWatchedOn(new Date().toISOString().split("T")[0]);
        setHasWatchedBefore(false);
        setReview("");
        setTags("");
        setRating(0);
        setLiked(false);
      }, 200);
    }
  }, [open]);

  const filteredMedia = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return mockMedia
      .filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.genres.some((g) => g.toLowerCase().includes(query))
      )
      .slice(0, 8);
  }, [searchQuery]);

  const handleSelectMedia = (media: Media) => {
    setSelectedMedia(media);
    setStep("log");
  };

  const handleBack = () => {
    setStep("search");
    setSelectedMedia(null);
  };

  const handleSave = () => {
    // In a real app, this would save to the database
    console.log({
      media: selectedMedia,
      watchedOn,
      hasWatchedBefore,
      review,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      rating,
      liked,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-card">
        <AnimatePresence mode="wait">
          {step === "search" ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <DialogHeader className="mb-6">
                <DialogTitle className="font-display text-2xl">
                  Registrar visualización
                </DialogTitle>
              </DialogHeader>

              {/* Search Input */}
              <div className="relative mb-4">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar película, serie o anime..."
                  className="w-full pl-12 pr-4 py-4 bg-background border-2 border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary text-lg"
                />
              </div>

              {/* Search Results */}
              {filteredMedia.length > 0 && (
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredMedia.map((media) => (
                    <button
                      key={media.id}
                      onClick={() => handleSelectMedia(media)}
                      className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/10 transition-colors text-left"
                    >
                      <img
                        src={media.poster}
                        alt={media.title}
                        className="w-12 h-18 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">
                          {media.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {media.year} • {media.type === "movie" ? "Película" : media.type === "series" ? "Serie" : "Anime"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-warning">
                        <Star size={14} className="fill-current" />
                        <span className="text-sm font-medium">{media.rating}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {searchQuery && filteredMedia.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No se encontraron resultados
                </div>
              )}

              {!searchQuery && (
                <div className="text-center py-8 text-muted-foreground">
                  Escribe para buscar contenido
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="log"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-input">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="gap-1"
                >
                  <ChevronLeft size={18} />
                  Atrás
                </Button>
                <span className="font-display font-semibold text-lg">
                  Lo vi...
                </span>
                <button
                  onClick={() => onOpenChange(false)}
                  className="ml-auto p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex gap-6">
                  {/* Poster */}
                  <div className="flex-shrink-0">
                    <img
                      src={selectedMedia?.poster}
                      alt={selectedMedia?.title}
                      className="w-32 aspect-[2/3] object-cover rounded-lg shadow-medium"
                    />
                  </div>

                  {/* Form */}
                  <div className="flex-1 space-y-5">
                    {/* Title */}
                    <div>
                      <h3 className="font-display text-xl font-bold text-foreground">
                        {selectedMedia?.title}{" "}
                        <span className="font-normal text-muted-foreground">
                          {selectedMedia?.year}
                        </span>
                      </h3>
                    </div>

                    {/* Watched On */}
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-3">
                        <Checkbox
                          checked={true}
                          className="border-2"
                        />
                        <span className="text-sm text-foreground">Visto el</span>
                      </label>
                      <div className="relative">
                        <Calendar
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <input
                          type="date"
                          value={watchedOn}
                          onChange={(e) => setWatchedOn(e.target.value)}
                          className="pl-10 pr-4 py-2 bg-background border-2 border-input rounded-lg text-sm focus:outline-none focus:border-secondary"
                        />
                      </div>
                      <label className="flex items-center gap-2">
                        <Checkbox
                          checked={hasWatchedBefore}
                          onCheckedChange={(checked) => setHasWatchedBefore(checked as boolean)}
                          className="border-2"
                        />
                        <span className="text-sm text-muted-foreground">
                          Ya lo había visto
                        </span>
                      </label>
                    </div>

                    {/* Review */}
                    <Textarea
                      placeholder="Añadir una reseña..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="min-h-24 bg-background/50 border-2 border-input focus:border-secondary resize-none"
                    />

                    {/* Tags */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">
                        Tags
                      </label>
                      <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="ej. netflix, maratón"
                        className="w-full px-4 py-2 bg-background border-2 border-input rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:border-secondary"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Presiona Tab para completar, Enter para crear
                      </p>
                    </div>

                    {/* Rating & Like */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground">
                          Rating
                        </span>
                        <StarRating
                          rating={rating}
                          interactive
                          onRate={setRating}
                          size="lg"
                        />
                      </div>
                      <button
                        onClick={() => setLiked(!liked)}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          liked
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        )}
                      >
                        <Heart
                          size={24}
                          className={cn(liked && "fill-current")}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end mt-6">
                  <Button
                    variant="teal"
                    size="lg"
                    onClick={handleSave}
                    className="px-8"
                  >
                    Guardar
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
