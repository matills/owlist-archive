import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Eye, Star } from "lucide-react";
import { useModalStore } from "@/stores/modalStore";
import { useAuthStore } from "@/stores/authStore";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Media {
  id: string;
  title: string;
  year: number;
  poster: string;
  rating: number;
  type: 'movie' | 'series' | 'anime';
}

interface MediaCardProps {
  media: Media;
  onAddToList?: () => void;
  onMarkWatched?: () => void;
  index?: number;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  media,
  onAddToList,
  onMarkWatched,
  index = 0,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { openModal } = useModalStore();
  const { user } = useAuthStore();

  const handleAction = (action: () => void | undefined) => {
    if (!user) {
      openModal("login");
      return;
    }
    action?.();
  };

  const renderStars = (rating: number) => {
    const stars = Math.round(rating / 2);
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={star <= stars ? "fill-warning text-warning" : "text-muted-foreground/50"}
          />
        ))}
        <span className="text-xs text-primary-foreground ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative aspect-[2/3] rounded-lg overflow-hidden bg-muted cursor-pointer"
    >
      {/* Skeleton while loading */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-foreground/10 animate-shimmer bg-gradient-to-r from-transparent via-foreground/5 to-transparent bg-[length:200%_100%]" />
      )}

      {/* Poster Image */}
      {!imageError ? (
        <img
          src={media.poster}
          alt={media.title}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } group-hover:scale-105`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-card flex items-center justify-center">
          <div className="text-center p-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🎬</span>
            </div>
            <p className="text-sm text-muted-foreground">{media.title}</p>
          </div>
        </div>
      )}

      {/* Type Badge */}
      <div className="absolute top-2 left-2 z-10">
        <span className={`
          px-2 py-0.5 rounded-full text-xs font-medium text-primary-foreground
          ${media.type === 'movie' ? 'bg-primary' : ''}
          ${media.type === 'series' ? 'bg-secondary' : ''}
          ${media.type === 'anime' ? 'bg-warning text-foreground' : ''}
        `}>
          {media.type === 'movie' && 'Película'}
          {media.type === 'series' && 'Serie'}
          {media.type === 'anime' && 'Anime'}
        </span>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
        <h3 className="font-sans font-semibold text-primary-foreground text-sm md:text-base leading-tight mb-1 line-clamp-2">
          {media.title}
        </h3>
        <p className="text-background/70 text-xs mb-2">{media.year}</p>
        
        {renderStars(media.rating)}

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(() => onAddToList?.());
                }}
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:scale-110 transition-transform"
              >
                <Plus size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-card text-card-foreground border-border">
              <p>Añadir a lista</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(() => onMarkWatched?.());
                }}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
              >
                <Eye size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-card text-card-foreground border-border">
              <p>Marcar como visto</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </motion.div>
  );
};
