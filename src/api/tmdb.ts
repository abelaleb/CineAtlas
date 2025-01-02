import axios from 'axios';
import { API_KEY, BASE_URL } from '@/Constants/Constants';

if (!API_KEY) {
  throw new Error('Missing TMDB API Key. Please set it in the .env file');
}

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export interface MovieChange {
  adult: false;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string | number | Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TVShowChange {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string | number | Date;
  genre_ids: Array<number>;
  id: number;
  media_type: string;
  name: string;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface PersonChange {
  adult: boolean;
  gender: 0|2;
  id: number;
  known_for_department: string;
  media_type: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null;
}
export interface searchChange {
  original_language: string;
  vote_average: number;
  backdrop_path: string;
  id: number;
  adult: boolean;
  original_title: string;
  original_name: string;
  poster_path: string;
  release_date: number;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

//Fetch data for Movies
export const getTrendingMovies = async (
  page = 1
): Promise<PaginatedResponse<MovieChange>> => {
  const response = await tmdb.get(`trending/movie/day?language=en-US `, {
    params: { page },
  });
  console.log('Trending Movies: ', response.data.results);
  return response.data;
};

//Fetch data for TV Shows
export const getTrendingTvShows = async (
  page = 1
): Promise<PaginatedResponse<TVShowChange>> => {
  const response = await tmdb.get(
    `https://api.themoviedb.org/3/trending/tv/day?language=en-US`,
    { params: { page } }
  );
  console.log('Trending tvShows: ', response.data.results);
  return response.data;
};

//Fetch data for People
export const getTrendingPeople = async (
  page = 1
): Promise<PaginatedResponse<PersonChange>> => {
  const response = await tmdb.get(
    `https://api.themoviedb.org/3/trending/person/day?language=en-US`,
    { params: { page } }
  );
  console.log('Trending people: ', response.data.results);
  return response.data;
};

// Fetch data for all trending items
export const getTrendingAll = async (
  page = 1
): Promise<PaginatedResponse<searchChange>> => {
  const response = await tmdb.get(`trending/all/day?language=en-US`, {
    params: { page },
  });
  console.log('Trending All: ', response.data.results);
  return response.data;
};

export const search = async (
  query: string,
  page = 1,
  type?: 'movie' | 'tv' | 'person'
): Promise<PaginatedResponse<searchChange>> => {
  const endpoint = type ? `search/${type}` : `search/multi`;
  const response = await tmdb.get(endpoint, {
    params: { query, page, include_adult: false },
  });
  console.log("search response",response.data.results);

  return response.data;
};

export default tmdb;
