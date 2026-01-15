import React from 'react';
import { ChevronDown, Check, Eye, Clock, Pause, X, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';

export type MediaStatus = 'watching' | 'completed' | 'plan_to_watch' | 'on_hold' | 'dropped' | null;

interface StatusOption {
  value: MediaStatus;
  label: string;
  icon: React.ReactNode;
}

const statusOptions: StatusOption[] = [
  { value: 'watching', label: 'Watching', icon: <Eye className="w-4 h-4" /> },
  { value: 'completed', label: 'Completed', icon: <Check className="w-4 h-4" /> },
  { value: 'plan_to_watch', label: 'Plan to Watch', icon: <Clock className="w-4 h-4" /> },
  { value: 'on_hold', label: 'On Hold', icon: <Pause className="w-4 h-4" /> },
  { value: 'dropped', label: 'Dropped', icon: <X className="w-4 h-4" /> },
];

interface StatusDropdownProps {
  currentStatus: MediaStatus;
  onStatusChange: (status: MediaStatus) => void;
  className?: string;
}

export const StatusDropdown: React.FC<StatusDropdownProps> = ({
  currentStatus,
  onStatusChange,
  className,
}) => {
  const { user } = useAuthStore();
  const { openModal } = useModalStore();

  const currentOption = statusOptions.find((opt) => opt.value === currentStatus);

  const handleClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      openModal('login');
    }
  };

  const handleStatusSelect = (status: MediaStatus) => {
    if (!user) {
      openModal('login');
      return;
    }
    onStatusChange(status);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={handleClick}>
        <Button
          variant="coral"
          size="default"
          className={cn('gap-2', !user && 'opacity-80', className)}
        >
          {currentOption ? (
            <>
              {currentOption.icon}
              {currentOption.label}
            </>
          ) : (
            <>
              <BookmarkPlus className="w-4 h-4" />
              Add to Status
            </>
          )}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent align="start" className="w-48 bg-white">
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleStatusSelect(option.value)}
              className={cn(
                'flex items-center gap-2 cursor-pointer',
                currentStatus === option.value && 'bg-secondary/20'
              )}
            >
              {option.icon}
              <span>{option.label}</span>
              {currentStatus === option.value && (
                <Check className="w-4 h-4 ml-auto text-secondary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
