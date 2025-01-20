import tmdb from './axiosInstance';
import { PaginatedResponse, TVShowChange } from '@/types/types';
import { handleResponse } from './responseHandler';

export const getTrendingTvShows = async (page = 1): Promise<PaginatedResponse<TVShowChange>> => {
  const response = await tmdb.get(`trending/tv/day`, {
    params: { page, include_adult: false },
  });
  return handleResponse(response);
};

export const fetchTvShowDetails = async (series_id: number) => {
  const response = await tmdb.get(`/tv/${series_id}`);
  return handleResponse(response);
};

export const fetchTvShowCredits = async (series_id: number) => {
  const response = await tmdb.get(`/tv/${series_id}/credits`);
  return handleResponse(response);
};

export const fetchSimilarTvShows = async (series_id: number) => {
  const response = await tmdb.get(`/tv/${series_id}/similar`);
  return handleResponse(response);
};

export const fetchPopularTvShows = async (
  query: string = '',
  page = 1
): Promise<PaginatedResponse<TVShowChange>> => {
  const response = await tmdb.get(`tv/popular`, {
    params: { query, page, include_adult: false },
  });
  return handleResponse(response);
};
