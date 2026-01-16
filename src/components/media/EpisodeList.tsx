import React from 'react';
import { Check, Play } from 'lucide-react';
import { Season, Episode } from '@/data/mockMediaDetails';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';

interface EpisodeListProps {
  seasons: Season[];
  className?: string;
}

export const EpisodeList: React.FC<EpisodeListProps> = ({ seasons, className }) => {
  const [selectedSeason, setSelectedSeason] = React.useState(seasons[0]?.id || '');
  const [watchedEpisodes, setWatchedEpisodes] = React.useState<Record<string, boolean>>({});
  const { user } = useAuthStore();
  const { openModal } = useModalStore();

  const currentSeason = seasons.find((s) => s.id === selectedSeason);

  const handleToggleWatched = (episodeId: string) => {
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

  const watchedCount = currentSeason?.episodes.filter((ep) => isWatched(ep)).length || 0;
  const totalCount = currentSeason?.episodes.length || 0;
  const progress = totalCount > 0 ? (watchedCount / totalCount) * 100 : 0;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <Select value={selectedSeason} onValueChange={setSelectedSeason}>
          <SelectTrigger className="w-48 bg-white border-2 border-input">
            <SelectValue placeholder="Select season" />
          </SelectTrigger>
          <SelectContent>
            {seasons.map((season) => (
              <SelectItem key={season.id} value={season.id}>
                Season {season.number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {watchedCount} / {totalCount} watched
          </span>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {currentSeason?.episodes.map((episode) => (
          <div
            key={episode.id}
            className={cn(
              'flex items-center gap-4 p-3 rounded-lg bg-white border-2 transition-all duration-200',
              isWatched(episode) ? 'border-secondary/30 bg-secondary/5' : 'border-transparent'
            )}
          >
            <div className="relative w-32 aspect-video rounded-md overflow-hidden flex-shrink-0">
              <img
                src={episode.thumbnail}
                alt={episode.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-body font-semibold text-foreground truncate">
                {episode.number}. {episode.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {episode.duration} min
              </p>
            </div>

            <button
              onClick={() => handleToggleWatched(episode.id)}
              className={cn(
                'w-8 h-8 rounded-md border-2 flex items-center justify-center transition-all duration-200',
                isWatched(episode)
                  ? 'bg-secondary border-secondary'
                  : 'border-muted-foreground/30 hover:border-secondary'
              )}
            >
              {isWatched(episode) && <Check className="w-5 h-5 text-white" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
