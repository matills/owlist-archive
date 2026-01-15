import React from 'react';
import { Calendar, RotateCw, Eye, Check, Clock, Pause, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserMediaStatus } from '@/data/mockMediaDetails';
import { MediaStatus } from '@/components/media/StatusDropdown';
import { useAuthStore } from '@/stores/authStore';

interface UserStatusSidebarProps {
  status: UserMediaStatus;
  totalEpisodes?: number;
  className?: string;
}

const statusConfig: Record<NonNullable<MediaStatus>, { label: string; icon: React.ReactNode; bgColor: string }> = {
  watching: { label: 'Watching', icon: <Eye className="w-5 h-5" />, bgColor: 'bg-secondary' },
  completed: { label: 'Completed', icon: <Check className="w-5 h-5" />, bgColor: 'bg-warning' },
  plan_to_watch: { label: 'Plan to Watch', icon: <Clock className="w-5 h-5" />, bgColor: 'bg-primary' },
  on_hold: { label: 'On Hold', icon: <Pause className="w-5 h-5" />, bgColor: 'bg-muted-foreground' },
  dropped: { label: 'Dropped', icon: <X className="w-5 h-5" />, bgColor: 'bg-destructive' },
};

export const UserStatusSidebar: React.FC<UserStatusSidebarProps> = ({
  status,
  totalEpisodes,
  className,
}) => {
  const { user } = useAuthStore();

  if (!user || !status.status) {
    return null;
  }

  const config = statusConfig[status.status];
  const progress = totalEpisodes && status.currentEpisode
    ? (status.currentEpisode / totalEpisodes) * 100
    : 0;

  return (
    <div className={cn('bg-card rounded-xl p-6 space-y-5', className)}>
      <h3 className="font-display text-lg font-semibold text-foreground">
        Your Status
      </h3>

      {/* Status Badge */}
      <div
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium',
          config.bgColor
        )}
      >
        {config.icon}
        {config.label}
      </div>

      {/* Progress (for series) */}
      {totalEpisodes && status.currentEpisode !== undefined && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {status.currentEpisode} / {totalEpisodes} episodes
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Dates */}
      <div className="space-y-3">
        {status.startDate && (
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Started:</span>
            <span className="font-medium text-foreground">{status.startDate}</span>
          </div>
        )}
        {status.endDate && (
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Finished:</span>
            <span className="font-medium text-foreground">{status.endDate}</span>
          </div>
        )}
      </div>

      {/* Rewatches */}
      {status.rewatches > 0 && (
        <div className="flex items-center gap-3 text-sm">
          <RotateCw className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Watched</span>
          <span className="font-medium text-primary">{status.rewatches} times</span>
        </div>
      )}
    </div>
  );
};
