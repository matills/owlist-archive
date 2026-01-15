import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  Star,
  ListPlus,
  Play,
  ChevronLeft,
  Clock,
  Film,
  Tv,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MediaCard } from '@/components/MediaCard';
import { LoginModal } from '@/components/modals/LoginModal';
import { SignupModal } from '@/components/modals/SignupModal';
import { ForgotPasswordModal } from '@/components/modals/ForgotPasswordModal';
import { AddToListModal } from '@/components/modals/AddToListModal';
import { StarRating } from '@/components/media/StarRating';
import { StatusDropdown, MediaStatus } from '@/components/media/StatusDropdown';
import { CastCarousel } from '@/components/media/CastCarousel';
import { EpisodeList } from '@/components/media/EpisodeList';
import { MediaStats } from '@/components/media/MediaStats';
import { UserStatusSidebar } from '@/components/media/UserStatusSidebar';
import { mockMediaDetails, defaultUserStatus, UserMediaStatus } from '@/data/mockMediaDetails';
import { mockMedia } from '@/data/mockMedia';
import { useAuthStore } from '@/stores/authStore';
import { useModalStore } from '@/stores/modalStore';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const MediaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { openModal } = useModalStore();

  const [isLoading, setIsLoading] = React.useState(true);
  const [showAddToList, setShowAddToList] = React.useState(false);
  const [showFullSynopsis, setShowFullSynopsis] = React.useState(false);
  const [userStatus, setUserStatus] = React.useState<UserMediaStatus>(defaultUserStatus);
  const [notes, setNotes] = React.useState('');

  const media = id ? mockMediaDetails[id] : null;

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!media && !isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl text-foreground mb-4">
              Content not found
            </h1>
            <Button variant="coral" onClick={() => navigate('/explore')}>
              Back to Explore
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleStatusChange = (status: MediaStatus) => {
    setUserStatus((prev) => ({
      ...prev,
      status,
      startDate: status === 'watching' ? new Date().toLocaleDateString() : prev.startDate,
    }));
    toast({
      title: 'Status updated',
      description: `Added to "${status?.replace('_', ' ')}"`,
    });
  };

  const handleRating = (rating: number) => {
    if (!user) {
      openModal('login');
      return;
    }
    setUserStatus((prev) => ({ ...prev, userRating: rating }));
    toast({
      title: 'Rating saved',
      description: `You rated this ${rating} out of 5 stars`,
    });
  };

  const handleFavorite = () => {
    if (!user) {
      openModal('login');
      return;
    }
    setUserStatus((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    toast({
      title: userStatus.isFavorite ? 'Removed from favorites' : 'Added to favorites',
    });
  };

  const handleAddToList = () => {
    if (!user) {
      openModal('login');
      return;
    }
    setShowAddToList(true);
  };

  const handleSaveNotes = () => {
    if (!user) {
      openModal('login');
      return;
    }
    toast({
      title: 'Notes saved',
      description: 'Your notes have been saved successfully',
    });
  };

  const similarMedia = mockMedia
    .filter((m) => m.id !== id && m.genres.some((g) => media?.genres.includes(g)))
    .slice(0, 8);

  const typeIcon = media?.type === 'movie' ? Film : Tv;
  const TypeIcon = typeIcon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Backdrop Header */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        {isLoading ? (
          <Skeleton className="absolute inset-0" />
        ) : (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${media?.backdrop || media?.poster})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-transparent" />
          </>
        )}

        {/* Content over backdrop */}
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex items-end pb-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0 -mb-20 md:-mb-32"
            >
              {isLoading ? (
                <Skeleton className="w-40 md:w-72 aspect-[2/3] rounded-xl" />
              ) : (
                <img
                  src={media?.poster}
                  alt={media?.title}
                  className="w-40 md:w-72 aspect-[2/3] object-cover rounded-xl shadow-large border-4 border-white"
                />
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 pb-4 md:pb-0"
            >
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : (
                <>
                  {/* Back button */}
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-body text-sm">Back</span>
                  </button>

                  <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                    {media?.title}
                  </h1>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-white/90 font-body flex items-center gap-1">
                      <TypeIcon className="w-4 h-4" />
                      {media?.year}
                    </span>
                    {media?.runtime && (
                      <span className="text-white/90 font-body flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {media.runtime} min
                      </span>
                    )}
                    {media?.genres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 rounded-full bg-secondary/80 text-white text-xs font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-6 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={media?.rating ? media.rating / 2 : 0} size="lg" />
                        <span className="font-display text-3xl font-bold text-white">
                          {media?.rating}
                        </span>
                      </div>
                      <p className="text-white/60 text-xs mt-1">Average rating</p>
                    </div>
                    {user && (
                      <div className="border-l border-white/20 pl-6">
                        <p className="text-white/60 text-xs mb-1">Your rating</p>
                        <StarRating
                          rating={userStatus.userRating || 0}
                          interactive
                          onRate={handleRating}
                          size="md"
                        />
                      </div>
                    )}
                  </div>

                  {/* Synopsis */}
                  <div className="mb-6 max-w-2xl">
                    <p
                      className={cn(
                        'text-white/80 font-body text-sm leading-relaxed',
                        !showFullSynopsis && 'line-clamp-3'
                      )}
                    >
                      {media?.synopsis}
                    </p>
                    {media?.synopsis && media.synopsis.length > 200 && (
                      <button
                        onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                        className="text-primary text-sm font-medium mt-1 hover:underline"
                      >
                        {showFullSynopsis ? 'Show less' : 'Read more'}
                      </button>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusDropdown
                      currentStatus={userStatus.status}
                      onStatusChange={handleStatusChange}
                    />
                    <Button
                      variant="teal"
                      onClick={handleAddToList}
                      className={cn(!user && 'opacity-80')}
                    >
                      <ListPlus className="w-4 h-4" />
                      Add to List
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleFavorite}
                      className={cn(
                        'border-white/50 text-white hover:bg-primary hover:border-primary hover:text-white',
                        userStatus.isFavorite && 'bg-primary border-primary'
                      )}
                    >
                      <Heart
                        className={cn(
                          'w-4 h-4',
                          userStatus.isFavorite && 'fill-current'
                        )}
                      />
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 mt-20 md:mt-32">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Seasons/Episodes for series */}
            {media?.seasons && media.seasons.length > 0 && (
              <div className="bg-card rounded-xl p-6 mb-8">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Seasons & Episodes
                </h2>
                <EpisodeList seasons={media.seasons} />
              </div>
            )}

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b border-muted rounded-none h-auto p-0 mb-6">
                {['overview', 'reviews', 'notes', 'similar', 'stats'].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-none border-b-4 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 capitalize"
                  >
                    {tab === 'notes' ? 'Your Notes' : tab}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="space-y-8 mt-0">
                {/* Director/Creator */}
                {(media?.director || media?.creator) && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {media.type === 'movie' ? 'Director' : 'Creator'}
                    </p>
                    <p className="font-display text-lg font-semibold text-foreground">
                      {media.director || media.creator}
                    </p>
                  </div>
                )}

                {/* Cast */}
                {media?.cast && media.cast.length > 0 && (
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Cast
                    </h3>
                    <CastCarousel cast={media.cast} />
                  </div>
                )}

                {/* Trailer */}
                {media?.trailerUrl && (
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Trailer
                    </h3>
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-foreground/10">
                      <iframe
                        src={media.trailerUrl}
                        title={`${media.title} trailer`}
                        className="absolute inset-0 w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    </div>
                  </div>
                )}

                {/* Tags */}
                {media?.tags && media.tags.length > 0 && (
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {media.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 rounded-full bg-secondary/10 text-secondary font-body text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <div className="bg-card rounded-xl p-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    Reviews feature coming soon!
                  </p>
                  <Button variant="teal" disabled>
                    Write a Review
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="notes" className="mt-0">
                {user ? (
                  <div className="bg-card rounded-xl p-6 space-y-4">
                    <Textarea
                      placeholder="Write your personal notes about this content..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-32 bg-white border-2 border-input focus:border-secondary"
                    />
                    <div className="flex justify-end">
                      <Button variant="teal" onClick={handleSaveNotes}>
                        Save Notes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-card rounded-xl p-6 text-center">
                    <p className="text-muted-foreground mb-4">
                      Log in to save personal notes about this content.
                    </p>
                    <Button variant="coral" onClick={() => openModal('login')}>
                      Log In
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="similar" className="mt-0">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  Similar Content
                </h3>
                {similarMedia.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {similarMedia.map((item) => (
                      <Link key={item.id} to={`/media/${item.id}`}>
                        <MediaCard media={item} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No similar content found.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="stats" className="mt-0">
                {media?.stats && <MediaStats stats={media.stats} />}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <UserStatusSidebar
                status={userStatus}
                totalEpisodes={media?.totalEpisodes}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <LoginModal />
      <SignupModal />
      <ForgotPasswordModal />
      <AddToListModal
        isOpen={showAddToList}
        onClose={() => setShowAddToList(false)}
        mediaTitle={media?.title || ''}
      />
    </div>
  );
};

export default MediaDetail;
