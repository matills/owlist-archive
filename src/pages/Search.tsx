import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Users, List, Film } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MediaCard } from '@/components/MediaCard';
import { EmptyState } from '@/components/EmptyState';
import { LoginModal } from '@/components/modals/LoginModal';
import { SignupModal } from '@/components/modals/SignupModal';
import { ForgotPasswordModal } from '@/components/modals/ForgotPasswordModal';
import { Button } from '@/components/ui/button';
import { mockMedia } from '@/data/mockMedia';
import { mockUsers, mockUserLists } from '@/data/mockMediaDetails';
import { cn } from '@/lib/utils';

type SearchTab = 'all' | 'content' | 'users' | 'lists';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = React.useState(query);
  const [activeTab, setActiveTab] = React.useState<SearchTab>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchInput });
  };

  const filteredContent = mockMedia.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.username.toLowerCase().includes(query.toLowerCase()) ||
      u.displayName.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLists = mockUserLists.filter((l) =>
    l.name.toLowerCase().includes(query.toLowerCase())
  );

  const hasResults = filteredContent.length > 0 || filteredUsers.length > 0 || filteredLists.length > 0;

  const tabs = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'content', label: 'Content', icon: Film },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'lists', label: 'Lists', icon: List },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-10 w-full">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search content, users, lists..."
              className="w-full pl-16 pr-6 py-4 text-lg font-body bg-white border-3 border-primary rounded-xl focus:ring-4 focus:ring-primary/30 outline-none"
            />
          </div>
        </form>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SearchTab)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full border-2 font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-primary border-primary text-white'
                  : 'border-muted-foreground/20 text-muted-foreground hover:border-secondary'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {!query ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Enter a search term to find content</p>
          </div>
        ) : !hasResults ? (
          <EmptyState />
        ) : (
          <div className="space-y-10">
            {/* Content Results */}
            {(activeTab === 'all' || activeTab === 'content') && filteredContent.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Content ({filteredContent.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredContent.slice(0, activeTab === 'all' ? 5 : undefined).map((media) => (
                    <Link key={media.id} to={`/media/${media.id}`}>
                      <MediaCard media={media} />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* User Results */}
            {(activeTab === 'all' || activeTab === 'users') && filteredUsers.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Users ({filteredUsers.length})
                </h2>
                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-4 bg-card rounded-xl">
                      <img src={user.avatar} alt={user.displayName} className="w-16 h-16 rounded-full object-cover" />
                      <div className="flex-1">
                        <h3 className="font-body font-semibold text-foreground">@{user.username}</h3>
                        <p className="text-sm text-muted-foreground">{user.displayName}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{user.bio}</p>
                      </div>
                      <Button variant="teal-outline" size="sm">View Profile</Button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Lists Results */}
            {(activeTab === 'all' || activeTab === 'lists') && filteredLists.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Lists ({filteredLists.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLists.map((list) => (
                    <div key={list.id} className="bg-card rounded-xl overflow-hidden">
                      <div className="aspect-video relative">
                        <img src={list.cover} alt={list.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-foreground">{list.name}</h3>
                        <p className="text-sm text-muted-foreground">{list.itemCount} items</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <Footer />
      <LoginModal />
      <SignupModal />
      <ForgotPasswordModal />
    </div>
  );
};

export default SearchPage;
