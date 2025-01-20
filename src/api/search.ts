import tmdb from './axiosInstance';
import { PaginatedResponse, searchChange } from '@/types/types';
import { handleResponse } from './responseHandler';
export const search = async (
  query: string,
  page = 1,
  type?: 'movie' | 'tv' | 'person'
): Promise<PaginatedResponse<searchChange>> => {
  const endpoint = type ? `search/${type}` : `search/multi`;
  const response = await tmdb.get(endpoint, {
    params: { query, page, include_adult: false },
  });
  return handleResponse(response.data);
};
