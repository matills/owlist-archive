import React from 'react';
import { ChevronRight, Check, Eye, Pencil, Star } from 'lucide-react';
import { Season, Episode } from '@/data/mockMediaDetails';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';
import { motion, AnimatePresence } from 'framer-motion';

interface EpisodeListProps {
  seasons: Season[];
  className?: string;
}

export const EpisodeList: React.FC<EpisodeListProps> = ({ seasons, className }) => {
  const [expandedSeason, setExpandedSeason] = React.useState<string | null>(null);
  const [watchedEpisodes, setWatchedEpisodes] = React.useState<Record<string, boolean>>({});
  const { user } = useAuthStore();
  const { openModal } = useModalStore();

  const handleToggleSeason = (seasonId: string) => {
    setExpandedSeason(expandedSeason === seasonId ? null : seasonId);
  };

  const handleToggleWatched = (episodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      openModal('login');
      return;
    }
    setWatchedEpisodes((prev) => ({
      ...prev,
      [episodeId]: !prev[episodeId],
    }));
  };

  const isWatched = (episode: Episode) => {
    return watchedEpisodes[episode.id] ?? episode.watched;
  };

  const getSeasonProgress = (season: Season) => {
    const watched = season.episodes.filter((ep) => isWatched(ep)).length;
    return { watched, total: season.episodes.length };
  };

  return (
    <div className={cn('space-y-2', className)}>
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Temporadas ({seasons.length})
      </h3>

      {seasons.map((season) => {
        const { watched, total } = getSeasonProgress(season);
        const isExpanded = expandedSeason === season.id;

        return (
          <div key={season.id} className="overflow-hidden">
            {/* Season Row */}
            <button
              onClick={() => handleToggleSeason(season.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-lg transition-colors text-left",
                isExpanded ? "bg-secondary/10" : "bg-white hover:bg-muted/50"
              )}
            >
              {/* Season Thumbnail */}
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                {season.episodes[0]?.thumbnail && (
                  <img
                    src={season.episodes[0].thumbnail}
                    alt={`Season ${season.number}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Season Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold text-foreground">
                  Temporada {season.number}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {total} episodios • {watched}/{total} vistos
                </p>
              </div>

              {/* Progress indicator */}
              {watched > 0 && watched < total && (
                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all"
                    style={{ width: `${(watched / total) * 100}%` }}
                  />
                </div>
              )}

              {/* Arrow */}
              <ChevronRight
                size={20}
                className={cn(
                  "text-muted-foreground transition-transform",
                  isExpanded && "rotate-90"
                )}
              />
            </button>

            {/* Episodes List */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pl-4 pr-2 py-2 space-y-2">
                    {season.episodes.map((episode) => (
                      <div
                        key={episode.id}
                        className={cn(
                          "flex items-center gap-4 p-3 rounded-lg transition-colors",
                          isWatched(episode) ? "bg-secondary/5" : "bg-white hover:bg-muted/30"
                        )}
                      >
                        {/* Episode Thumbnail */}
                        <div className="relative w-28 aspect-video rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={episode.thumbnail}
                            alt={episode.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Episode Info */}
                        <div className="flex-1 min-w-0">
                          <h5 className="font-body font-semibold text-foreground text-sm truncate">
                            {episode.title}
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            S{String(season.number).padStart(2, '0')} E{String(episode.number).padStart(2, '0')} • {episode.duration} min
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => handleToggleWatched(episode.id, e)}
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                              isWatched(episode)
                                ? "bg-secondary text-white"
                                : "bg-muted/50 text-muted-foreground hover:bg-secondary/20 hover:text-secondary"
                            )}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="w-8 h-8 rounded-full bg-muted/50 text-muted-foreground hover:bg-muted flex items-center justify-center transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
