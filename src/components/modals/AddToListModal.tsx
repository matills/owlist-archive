import React from 'react';
import { X, Plus, Check, Lock, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { mockUserLists, UserList } from '@/data/mockMediaDetails';

interface AddToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaTitle: string;
  onCreateList?: () => void;
}

const predefinedLists = [
  { id: 'favorites', name: 'Favorites', icon: '❤️' },
  { id: 'watching', name: 'Currently Watching', icon: '👁️' },
  { id: 'completed', name: 'Completed', icon: '✅' },
  { id: 'plan_to_watch', name: 'Plan to Watch', icon: '📋' },
];

export const AddToListModal: React.FC<AddToListModalProps> = ({
  isOpen,
  onClose,
  mediaTitle,
  onCreateList,
}) => {
  const [selectedLists, setSelectedLists] = React.useState<string[]>([]);

  const toggleList = (listId: string) => {
    setSelectedLists((prev) =>
      prev.includes(listId)
        ? prev.filter((id) => id !== listId)
        : [...prev, listId]
    );
  };

  const handleSave = () => {
    console.log('Adding to lists:', selectedLists);
    onClose();
  };

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-background rounded-2xl p-8 relative max-w-md w-[90%] max-h-[80vh] overflow-hidden flex flex-col"
            style={{ boxShadow: 'var(--shadow-large)' }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Add to List
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Adding: <span className="font-medium text-foreground">{mediaTitle}</span>
            </p>

            {/* Content */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {/* Predefined Lists */}
              <div>
                <h3 className="font-body font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">
                  Quick Lists
                </h3>
                <div className="space-y-2">
                  {predefinedLists.map((list) => (
                    <button
                      key={list.id}
                      onClick={() => toggleList(list.id)}
                      className={cn(
                        'w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200',
                        selectedLists.includes(list.id)
                          ? 'border-secondary bg-secondary/10'
                          : 'border-transparent bg-white hover:border-secondary/50'
                      )}
                    >
                      <span className="text-xl">{list.icon}</span>
                      <span className="flex-1 text-left font-medium text-foreground">
                        {list.name}
                      </span>
                      <div
                        className={cn(
                          'w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
                          selectedLists.includes(list.id)
                            ? 'bg-secondary border-secondary'
                            : 'border-muted-foreground/30'
                        )}
                      >
                        {selectedLists.includes(list.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Your Lists
                  </span>
                </div>
              </div>

              {/* Custom Lists */}
              <div className="space-y-2">
                {mockUserLists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => toggleList(list.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200',
                      selectedLists.includes(list.id)
                        ? 'border-secondary bg-secondary/10'
                        : 'border-transparent bg-white hover:border-secondary/50'
                    )}
                  >
                    <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={list.cover}
                        alt={list.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-medium text-foreground block">
                        {list.name}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        {list.isPublic ? (
                          <Globe className="w-3 h-3" />
                        ) : (
                          <Lock className="w-3 h-3" />
                        )}
                        {list.itemCount} items
                      </span>
                    </div>
                    <div
                      className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
                        selectedLists.includes(list.id)
                          ? 'bg-secondary border-secondary'
                          : 'border-muted-foreground/30'
                      )}
                    >
                      {selectedLists.includes(list.id) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Create new list */}
              <button
                onClick={onCreateList}
                className="flex items-center gap-2 text-primary hover:underline font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                Create new list
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-muted">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="coral"
                onClick={handleSave}
                disabled={selectedLists.length === 0}
              >
                Add to {selectedLists.length} list{selectedLists.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
