export interface Media {
  id: string;
  title: string;
  year: number;
  poster: string;
  rating: number;
  type: 'movie' | 'series' | 'anime';
  genres: string[];
  language: string;
}

export const mockMedia: Media[] = [
  {
    id: '1',
    title: 'Inception',
    year: 2010,
    poster: 'https://image.tmdb.org/t/p/w500/ljsZTbVsrQJpxXcJ7jX6B1ZmzLy.jpg',
    rating: 8.8,
    type: 'movie',
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    language: 'en'
  },
  {
    id: '2',
    title: 'Breaking Bad',
    year: 2008,
    poster: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    rating: 9.5,
    type: 'series',
    genres: ['Drama', 'Crime', 'Thriller'],
    language: 'en'
  },
  {
    id: '3',
    title: 'Attack on Titan',
    year: 2013,
    poster: 'https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg',
    rating: 9.0,
    type: 'anime',
    genres: ['Action', 'Drama', 'Fantasy'],
    language: 'ja'
  },
  {
    id: '4',
    title: 'The Dark Knight',
    year: 2008,
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    rating: 9.0,
    type: 'movie',
    genres: ['Action', 'Crime', 'Drama'],
    language: 'en'
  },
  {
    id: '5',
    title: 'Stranger Things',
    year: 2016,
    poster: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
    rating: 8.7,
    type: 'series',
    genres: ['Drama', 'Fantasy', 'Horror'],
    language: 'en'
  },
  {
    id: '6',
    title: 'Demon Slayer',
    year: 2019,
    poster: 'https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6bMmKLB.jpg',
    rating: 8.7,
    type: 'anime',
    genres: ['Action', 'Fantasy', 'Adventure'],
    language: 'ja'
  },
  {
    id: '7',
    title: 'Interstellar',
    year: 2014,
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    rating: 8.6,
    type: 'movie',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    language: 'en'
  },
  {
    id: '8',
    title: 'Game of Thrones',
    year: 2011,
    poster: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    rating: 9.2,
    type: 'series',
    genres: ['Action', 'Adventure', 'Drama'],
    language: 'en'
  },
  {
    id: '9',
    title: 'My Hero Academia',
    year: 2016,
    poster: 'https://image.tmdb.org/t/p/w500/ivOLM47yJt90P19RH1NvJrAJz9F.jpg',
    rating: 8.4,
    type: 'anime',
    genres: ['Action', 'Comedy', 'Fantasy'],
    language: 'ja'
  },
  {
    id: '10',
    title: 'Pulp Fiction',
    year: 1994,
    poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    rating: 8.9,
    type: 'movie',
    genres: ['Crime', 'Drama'],
    language: 'en'
  },
  {
    id: '11',
    title: 'The Office',
    year: 2005,
    poster: 'https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',
    rating: 8.9,
    type: 'series',
    genres: ['Comedy'],
    language: 'en'
  },
  {
    id: '12',
    title: 'Death Note',
    year: 2006,
    poster: 'https://image.tmdb.org/t/p/w500/iigTJJskR1PcjjXqxdyJwVB3BoU.jpg',
    rating: 9.0,
    type: 'anime',
    genres: ['Mystery', 'Thriller', 'Drama'],
    language: 'ja'
  },
  {
    id: '13',
    title: 'The Matrix',
    year: 1999,
    poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    rating: 8.7,
    type: 'movie',
    genres: ['Action', 'Sci-Fi'],
    language: 'en'
  },
  {
    id: '14',
    title: 'The Mandalorian',
    year: 2019,
    poster: 'https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg',
    rating: 8.7,
    type: 'series',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    language: 'en'
  },
  {
    id: '15',
    title: 'Jujutsu Kaisen',
    year: 2020,
    poster: 'https://image.tmdb.org/t/p/w500/hFWP5HkbVEe40hrXgtCeQxoccHE.jpg',
    rating: 8.6,
    type: 'anime',
    genres: ['Action', 'Fantasy', 'Horror'],
    language: 'ja'
  },
  {
    id: '16',
    title: 'Parasite',
    year: 2019,
    poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    rating: 8.5,
    type: 'movie',
    genres: ['Comedy', 'Drama', 'Thriller'],
    language: 'ko'
  },
  {
    id: '17',
    title: 'The Witcher',
    year: 2019,
    poster: 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
    rating: 8.2,
    type: 'series',
    genres: ['Action', 'Adventure', 'Drama'],
    language: 'en'
  },
  {
    id: '18',
    title: 'One Piece',
    year: 1999,
    poster: 'https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg',
    rating: 8.9,
    type: 'anime',
    genres: ['Action', 'Adventure', 'Comedy'],
    language: 'ja'
  },
  {
    id: '19',
    title: 'Fight Club',
    year: 1999,
    poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    rating: 8.8,
    type: 'movie',
    genres: ['Drama'],
    language: 'en'
  },
  {
    id: '20',
    title: 'Chernobyl',
    year: 2019,
    poster: 'https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg',
    rating: 9.4,
    type: 'series',
    genres: ['Drama', 'History', 'Thriller'],
    language: 'en'
  },
  {
    id: '21',
    title: 'Fullmetal Alchemist',
    year: 2009,
    poster: 'https://image.tmdb.org/t/p/w500/lz4xYdF1n09lyiCfZWtWT44AaK1.jpg',
    rating: 9.1,
    type: 'anime',
    genres: ['Action', 'Adventure', 'Drama'],
    language: 'ja'
  },
  {
    id: '22',
    title: 'Spirited Away',
    year: 2001,
    poster: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    rating: 8.6,
    type: 'anime',
    genres: ['Animation', 'Adventure', 'Family'],
    language: 'ja'
  },
  {
    id: '23',
    title: 'The Shawshank Redemption',
    year: 1994,
    poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    rating: 9.3,
    type: 'movie',
    genres: ['Drama'],
    language: 'en'
  },
  {
    id: '24',
    title: 'Dark',
    year: 2017,
    poster: 'https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg',
    rating: 8.8,
    type: 'series',
    genres: ['Crime', 'Drama', 'Mystery'],
    language: 'de'
  }
];

export const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 
  'Drama', 'Family', 'Fantasy', 'History', 'Horror',
  'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
];

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
];
