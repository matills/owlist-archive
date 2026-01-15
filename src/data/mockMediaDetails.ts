import { Media, mockMedia } from "./mockMedia";

export interface Episode {
  id: string;
  number: number;
  title: string;
  duration: number;
  thumbnail: string;
  watched: boolean;
}

export interface Season {
  id: string;
  number: number;
  episodeCount: number;
  episodes: Episode[];
}

export interface CastMember {
  id: string;
  name: string;
  character: string;
  avatar: string;
}

export interface MediaDetails extends Media {
  backdrop: string;
  synopsis: string;
  director?: string;
  creator?: string;
  cast: CastMember[];
  tags: string[];
  trailerUrl?: string;
  seasons?: Season[];
  runtime?: number;
  totalEpisodes?: number;
  stats: {
    watching: number;
    completed: number;
    planToWatch: number;
  };
}

export interface UserMediaStatus {
  status: 'watching' | 'completed' | 'plan_to_watch' | 'on_hold' | 'dropped' | null;
  userRating: number | null;
  isFavorite: boolean;
  startDate: string | null;
  endDate: string | null;
  rewatches: number;
  currentEpisode?: number;
  notes: string;
}

export interface UserList {
  id: string;
  name: string;
  cover: string;
  itemCount: number;
  isPublic: boolean;
}

export interface MockUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 'u1',
    username: 'moviebuff42',
    displayName: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Film enthusiast and critic. Always looking for the next great movie to watch.',
  },
  {
    id: 'u2',
    username: 'animefan_yuki',
    displayName: 'Yuki Tanaka',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Anime lover since childhood. Currently watching 10+ shows!',
  },
  {
    id: 'u3',
    username: 'series_addict',
    displayName: 'Maria Garcia',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Binge watcher extraordinaire. Ask me about any series!',
  },
];

export const mockUserLists: UserList[] = [
  {
    id: 'list1',
    name: 'Best Sci-Fi Movies',
    cover: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    itemCount: 25,
    isPublic: true,
  },
  {
    id: 'list2',
    name: 'Weekend Binge',
    cover: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    itemCount: 12,
    isPublic: true,
  },
  {
    id: 'list3',
    name: 'Hidden Gems',
    cover: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    itemCount: 8,
    isPublic: false,
  },
];

const generateEpisodes = (count: number): Episode[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `ep-${i + 1}`,
    number: i + 1,
    title: `Episode ${i + 1}`,
    duration: 42 + Math.floor(Math.random() * 20),
    thumbnail: `https://picsum.photos/seed/${i + 100}/320/180`,
    watched: i < 3,
  }));
};

const generateSeasons = (count: number): Season[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `s-${i + 1}`,
    number: i + 1,
    episodeCount: 8 + Math.floor(Math.random() * 5),
    episodes: generateEpisodes(8 + Math.floor(Math.random() * 5)),
  }));
};

export const mockMediaDetails: Record<string, MediaDetails> = {
  '1': {
    ...mockMedia[0],
    backdrop: 'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    director: 'Christopher Nolan',
    cast: [
      { id: 'c1', name: 'Leonardo DiCaprio', character: 'Cobb', avatar: 'https://i.pravatar.cc/150?img=11' },
      { id: 'c2', name: 'Joseph Gordon-Levitt', character: 'Arthur', avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: 'c3', name: 'Elliot Page', character: 'Ariadne', avatar: 'https://i.pravatar.cc/150?img=13' },
      { id: 'c4', name: 'Tom Hardy', character: 'Eames', avatar: 'https://i.pravatar.cc/150?img=14' },
    ],
    tags: ['Mind-bending', 'Heist', 'Dreams', 'Thriller', 'Cerebral'],
    trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
    runtime: 148,
    stats: { watching: 1234, completed: 45678, planToWatch: 8901 },
  },
  '2': {
    ...mockMedia[1],
    backdrop: 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
    synopsis: 'A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family\'s future.',
    creator: 'Vince Gilligan',
    cast: [
      { id: 'c5', name: 'Bryan Cranston', character: 'Walter White', avatar: 'https://i.pravatar.cc/150?img=15' },
      { id: 'c6', name: 'Aaron Paul', character: 'Jesse Pinkman', avatar: 'https://i.pravatar.cc/150?img=16' },
      { id: 'c7', name: 'Anna Gunn', character: 'Skyler White', avatar: 'https://i.pravatar.cc/150?img=17' },
      { id: 'c8', name: 'Dean Norris', character: 'Hank Schrader', avatar: 'https://i.pravatar.cc/150?img=18' },
    ],
    tags: ['Crime', 'Transformation', 'Family', 'Drugs', 'Antihero'],
    trailerUrl: 'https://www.youtube.com/embed/HhesaQXLuRY',
    seasons: generateSeasons(5),
    totalEpisodes: 62,
    stats: { watching: 2345, completed: 67890, planToWatch: 12345 },
  },
  '3': {
    ...mockMedia[2],
    backdrop: 'https://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg',
    synopsis: 'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    creator: 'Hajime Isayama',
    cast: [
      { id: 'c9', name: 'Yuki Kaji', character: 'Eren Jaeger', avatar: 'https://i.pravatar.cc/150?img=19' },
      { id: 'c10', name: 'Yui Ishikawa', character: 'Mikasa Ackerman', avatar: 'https://i.pravatar.cc/150?img=20' },
      { id: 'c11', name: 'Marina Inoue', character: 'Armin Arlert', avatar: 'https://i.pravatar.cc/150?img=21' },
      { id: 'c12', name: 'Hiroshi Kamiya', character: 'Levi Ackerman', avatar: 'https://i.pravatar.cc/150?img=22' },
    ],
    tags: ['Titans', 'Survival', 'War', 'Dark Fantasy', 'Shounen'],
    trailerUrl: 'https://www.youtube.com/embed/MGRm4IzK1SQ',
    seasons: generateSeasons(4),
    totalEpisodes: 87,
    stats: { watching: 5678, completed: 89012, planToWatch: 23456 },
  },
};

// Generate details for remaining media items
mockMedia.forEach((media) => {
  if (!mockMediaDetails[media.id]) {
    mockMediaDetails[media.id] = {
      ...media,
      backdrop: media.poster.replace('/w500/', '/original/'),
      synopsis: `${media.title} is a captivating ${media.type} that has earned a rating of ${media.rating}. It explores themes of ${media.genres.join(', ').toLowerCase()} in a unique and engaging way that keeps audiences hooked from start to finish.`,
      director: media.type === 'movie' ? 'Director Name' : undefined,
      creator: media.type !== 'movie' ? 'Creator Name' : undefined,
      cast: [
        { id: `cast-${media.id}-1`, name: 'Actor One', character: 'Main Character', avatar: `https://i.pravatar.cc/150?img=${parseInt(media.id) + 30}` },
        { id: `cast-${media.id}-2`, name: 'Actor Two', character: 'Supporting Role', avatar: `https://i.pravatar.cc/150?img=${parseInt(media.id) + 31}` },
        { id: `cast-${media.id}-3`, name: 'Actor Three', character: 'Another Role', avatar: `https://i.pravatar.cc/150?img=${parseInt(media.id) + 32}` },
      ],
      tags: media.genres,
      trailerUrl: undefined,
      seasons: media.type !== 'movie' ? generateSeasons(Math.floor(Math.random() * 5) + 1) : undefined,
      totalEpisodes: media.type !== 'movie' ? Math.floor(Math.random() * 50) + 12 : undefined,
      runtime: media.type === 'movie' ? 90 + Math.floor(Math.random() * 60) : undefined,
      stats: {
        watching: Math.floor(Math.random() * 5000),
        completed: Math.floor(Math.random() * 50000) + 10000,
        planToWatch: Math.floor(Math.random() * 10000),
      },
    };
  }
});

export const defaultUserStatus: UserMediaStatus = {
  status: null,
  userRating: null,
  isFavorite: false,
  startDate: null,
  endDate: null,
  rewatches: 0,
  notes: '',
};
