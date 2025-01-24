import tmdb from './axiosInstance';
import { PaginatedResponse, searchChange } from '@/types/types';
import { handleResponse } from './responseHandler';
export const getTrendingAll = async (
  page = 1
): Promise<PaginatedResponse<searchChange>> => {
  const response = await tmdb.get(`trending/all/day`, {
    params: { page, include_adult: false },
  });
  return handleResponse(response);
};
