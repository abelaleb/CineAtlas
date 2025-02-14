// api/discover.ts
import { API_KEY } from '@/Constants/Constants';
import tmdb from './axiosInstance';

interface DiscoverFilters {
  genre?: string;
  year?: string;
  rating?: string;
  language?: string;
  order?: string;
}

export const fetchDiscoverData = async (
  mediaType: 'movie' | 'tv',
  page: number = 1,
  filters: DiscoverFilters = {}
) => {
  const endpoint = `/discover/${mediaType}`;
  const params: any = {
    api_key: API_KEY,
    page,
    language: 'en-US',
  };

  if (filters.genre) {
    params.with_genres = filters.genre;
  }
  if (filters.year) {
    params[mediaType === 'movie' ? 'primary_release_year' : 'first_air_date_year'] = filters.year;
  }
  if (filters.rating) {
    params['vote_average.gte'] = filters.rating;
  }
  if (filters.language) {
    params.with_original_language = filters.language;
  }
  if (filters.order) {
    params.sort_by = filters.order;
  }

  try {
    const response = await tmdb.get(endpoint, { params });
    return response.data;
  } catch (err) {
    console.error('Error fetching discover data:', err);
    throw err;
  }
};
