import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CastMember } from '@/data/mockMediaDetails';

interface CastCarouselProps {
  cast: CastMember[];
  className?: string;
}

export const CastCarousel: React.FC<CastCarouselProps> = ({ cast, className }) => {
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <ScrollArea className={cn('w-full', className)}>
      <div className="flex gap-4 pb-4">
        {cast.map((member) => (
          <div
            key={member.id}
            className="flex-shrink-0 text-center group cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mb-3 mx-auto border-2 border-transparent group-hover:border-secondary transition-colors">
              {imageErrors[member.id] ? (
                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-2xl font-display">
                  {member.name.charAt(0)}
                </div>
              ) : (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(member.id)}
                />
              )}
            </div>
            <h4 className="font-body font-semibold text-sm text-foreground truncate max-w-24">
              {member.name}
            </h4>
            <p className="font-body text-xs text-muted-foreground truncate max-w-24">
              {member.character}
            </p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
