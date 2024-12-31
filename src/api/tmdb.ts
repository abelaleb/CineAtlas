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
  id: number;
  adult: boolean;
  original_title: string;
  original_name: string;
  original_language: string;
  release_date: string;
  title: string;
  poster_path: string;
}

export interface TVShowChange {
  id: number;
  adult: boolean;
  original_name: string;
  poster_path: string;
}

export interface PersonChange {
  id: number;
  name: string;
  profile_path: string;
  original_name: string;
  original_title: string;
}
export interface searchChange {
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
export const getMovieChanges = async (
  page = 1
): Promise<PaginatedResponse<MovieChange>> => {
  // const response = await tmdb.get(`/movie/changes?page=1`, {
  const response = await tmdb.get(`trending/movie/day?language=en-US// `, {
    params: { page },
  });
  return response.data;
};

//Fetch data for TV Shows
export const getTVChanges = async (
  page = 1
): Promise<PaginatedResponse<TVShowChange>> => {
  const response = await tmdb.get(
    `https://api.themoviedb.org/3/trending/tv/day?language=en-US`,
    { params: { page } }
  );
  return response.data;
};

//Fetch data for People
export const getPersonChanges = async (
  page = 1
): Promise<PaginatedResponse<PersonChange>> => {
  const response = await tmdb.get(
    `https://api.themoviedb.org/3/trending/person/day?language=en-US`,
    { params: { page } }
  );
  return response.data;
};

//Fetch data for Search
export const search = async (
  query: string,
  page = 1
): Promise<PaginatedResponse<searchChange>> => {
  const response = await tmdb.get(
    `https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1`,
    {
      params: { query, page },
    }
  );
  console.log(response.data.results);
  
  return response.data;
};

export default tmdb;
