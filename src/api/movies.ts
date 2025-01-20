import tmdb from './axiosInstance';
import { PaginatedResponse, MovieChange } from '@/types/types';
import { handleResponse } from './responseHandler';

export const getTrendingMovies = async (page = 1): Promise<PaginatedResponse<MovieChange>> => {
  const response = await tmdb.get(`trending/movie/day`, {
    params: { page, include_adult: false },
  });
  return handleResponse(response);
};

export const fetchMovieDetails = async (movie_id: number) => {
  const response = await tmdb.get(`/movie/${movie_id}`);
  return handleResponse(response);
};

export const fetchMovieCredits = async (movie_id: number) => {
  const response = await tmdb.get(`/movie/${movie_id}/credits`);
  return handleResponse(response);
};

export const fetchSimilarMovies = async (movie_id: number) => {
  const response = await tmdb.get(`/movie/${movie_id}/similar`);
  return handleResponse(response);
};

export const fetchFilteredMovies = async ({
  page = 1,
  sortBy = 'popularity.desc',
  genreId = 28,
}: {
  page: number;
  sortBy: string;
  genreId: number;
}) => {
  const response = await tmdb.get(`/discover/movie`, {
    params: {
      sort_by: sortBy,
      with_genres: genreId,
      page,
    },
  });
  return handleResponse(response);
};

export const getPopularMovies = async (
  query: string = '',
  page = 1
): Promise<PaginatedResponse<MovieChange>> => {
  const response = await tmdb.get(`movie/popular`, {
    params: { query, page, include_adult: false },
  });
  return handleResponse(response);
};
