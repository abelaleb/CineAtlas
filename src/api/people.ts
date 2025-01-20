import tmdb from './axiosInstance';
import { PaginatedResponse, PersonChange } from '@/types/types';
import { handleResponse } from './responseHandler';

export const getTrendingPeople = async (
  page = 1
): Promise<PaginatedResponse<PersonChange>> => {
  const response = await tmdb.get(`trending/person/day`, {
    params: { page, include_adult: false },
  });
  return handleResponse(response.data);
};

export const fetchPersonDetails = async (person_id: number) => {
  const { data } = await tmdb.get(`/person/${person_id}`);
  return handleResponse(data);
};

export const fetchCredits = async (person_id: number) => {
  const { data } = await tmdb.get(`/person/${person_id}/combined_credits`);
  return handleResponse(data);
};

export const fetchPopularPeople = async (
  query: string = '',
  page = 1
): Promise<PaginatedResponse<PersonChange>> => {
  const response = await tmdb.get(`person/popular`, {
    params: { query, page, include_adult: false },
  });
  return handleResponse(response);
};
