import tmdb from './axiosInstance';
import { PaginatedResponse, PersonChange } from '@/types/types';
import { handleResponse } from './responseHandler';

export const getTrendingPeople = async (
  page = 1
): Promise<PaginatedResponse<PersonChange>> => {
  const response = await tmdb.get(`trending/person/week`, {
    params: { page, include_adult: false },
  });
  return handleResponse(response);
};
export const fetchPersonDetails = async (person_id: number) => {
  const response = await tmdb.get(`/person/${person_id}`);
  return handleResponse(response);
};

export const fetchPersonCredits = async (person_id: number)=>{
  const response = await tmdb.get(`/person/${person_id}/combined_credits`);
  return handleResponse(response);
}

export const fetchPopularPeople = async (page = 1) => {
  const response = await tmdb.get(`/person/popular`, { params: { page } });
  return handleResponse(response);
};
