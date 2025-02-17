import { API_KEY } from '@/Constants/Constants';
import tmdb from './axiosInstance';
export const fetchSearchData = async (
  query: string,
  page: number = 1,
  mediaType: string = 'multi',
  includeAdult: boolean = false
) => {
  try {
    const response = await tmdb.get(`/search/${mediaType}`, {
      params: {
        api_key: API_KEY,
        query,
        page,
        include_adult: includeAdult,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching searching data:', err);
    throw err;
  }
};
