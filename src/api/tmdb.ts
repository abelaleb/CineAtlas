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
export interface MovieDetails{
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Array<{id:number,name:string}>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{id:number,name:string,logo_path:string,origin_country:string}>;
  production_countries: Array<{iso_3166_1:string,name:string}>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{english_name:string,iso_639_1:string}>;
  status: string;
  tagline: string;
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
  gender: 0 | 2;
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

//Fetch data for All
const getTrending = async <T>(
  type: 'movie' | 'tv' | 'person' | 'all',
  page = 1
): Promise<PaginatedResponse<T>> => {
  try {
    const response = await tmdb.get(`trending/${type}/day`, {
      params: { page },
    });
    // console.log(`Trending ${type}:`, response.data.results);
    return response.data;
  } catch (error) {
    console.error(`Error fetching trending ${type}:`, error);
    throw error;
  }
};

export const getTrendingMovies = (page = 1) =>
  getTrending<MovieChange>('movie', page);
export const getTrendingTvShows = (page = 1) =>
  getTrending<TVShowChange>('tv', page);
export const getTrendingPeople = (page = 1) =>
  getTrending<PersonChange>('person', page);
export const getTrendingAll = (page = 1) =>
  getTrending<searchChange>('all', page);

export const search = async (
  query: string,
  page = 1,
  type?: 'movie' | 'tv' | 'person'
): Promise<PaginatedResponse<searchChange>> => {
  const endpoint = type ? `search/${type}` : `search/multi`;
  const response = await tmdb.get(endpoint, {
    params: { query, page, include_adult: false },
  });
  // console.log('search response', response.data.results);

  return response.data;
};
export const getPopularMovies = async (
  query: string = '',
  page = 1
): Promise<PaginatedResponse<MovieChange>> => {
  const response = await tmdb.get(`movie/popular`, {
    params: {
      query,
      page,
      include_adult: false,
    },
  });
  // console.log('Popular Movies', response.data.results);
  return response.data;
}; 


export default tmdb;
