import axios from 'axios';
import { API_KEY, BASE_URL } from '@/Constants/Constants';
import {
  MovieChange,
  PaginatedResponse,
  PersonChange,
  searchChange,
  TVShowChange,
} from '@/types/types';

if (!API_KEY) {
  throw new Error('Missing TMDB API Key. Please set it in the .env file');
}
export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

//Fetch data for All
const getTrending = async <T>(
  type: 'movie' | 'tv' | 'person' | 'all',
  page = 1
): Promise<PaginatedResponse<T>> => {
  try {
    const response = await tmdb.get(`trending/${type}/day`, {
      params: { page, include_adult: false },
    });
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

export const fetchMovieDetails = async (movie_id: number) => {
  const { data } = await tmdb.get(`/movie/${movie_id}`);
  return data;
};
export const fetchMovieCredits = async (movie_id: number) => {
  const { data } = await tmdb.get(`/movie/${movie_id}/credits`);
  return data;
};
export const fetchSimilarMovies = async (movie_id: number) => {
  const { data } = await tmdb.get(`/movie/${movie_id}/similar`);
  return data;
};
export const fetchTvShowDetails = async (series_id: number) => {
  const { data } = await tmdb.get(`/tv/${series_id}`);
  return data;
};
export const fetchTvShowCredits = async (series_id: number) => {
  const { data } = await tmdb.get(`/tv/${series_id}/credits`);
  return data;
};
export const fetchSimilarTvShows = async (series_id: number) => {
  const { data } = await tmdb.get(`/tv/${series_id}/similar`);
  return data;
};
export const fetchPersonDetails = async (person_id: number) => {
  const { data } = await tmdb.get(`/person/${person_id}`);
  return data;
};
export const fetchCredits = async (person_id: number) => {
  const { data } = await tmdb.get(`/person/${person_id}/combined_credits`);
  return data;
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
  return response.data;
};
export const fetchPopularTvShows = async (
  query: string = '',
  page = 1,
): Promise<PaginatedResponse<TVShowChange>> => {
  const response = await tmdb.get(`tv/popular`, {
    params: {
      query,
      page,
      include_adult: false,
    },
  });
  return response.data;
};
export const fetchPopularPeople = async (
  query: string = '',
  page = 1,
): Promise<PaginatedResponse<PersonChange>> => {
  const response = await tmdb.get(`person/popular`, {
    params: {
      query,
      page,
      include_adult: false,
    },
  });
  return response.data;
};


export default tmdb;
