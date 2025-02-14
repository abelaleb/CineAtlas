// src/api/discover.ts

import { API_KEY } from '@/Constants/Constants';
import tmdb from './axiosInstance';

export interface DiscoverFilters {
  genre?: string;
  year?: string;
  rating?: string;
  language?: string;
  sort_by?: string;
}

export const fetchDiscoverData = async (
  mediaType: 'movie' | 'tv',
  page: number = 1,
  filters: DiscoverFilters = {}
) => {
  const endpoint = `/discover/${mediaType}`;
  //eslint-disable-next-line
  const params: Record<string, any> = {
    api_key: API_KEY,
    include_adult: false,
    page,
  };

  if (filters.genre && filters.genre !== 'all') {
    params.with_genres = filters.genre;
  }

  if (filters.year) {
    if (filters.year.includes('-')) {
      const [startYear, endYear] = filters.year.split('-');
      if (mediaType === 'movie') {
        params['primary_release_date.gte'] = `${startYear}-01-01`;
        params['primary_release_date.lte'] = `${endYear}-12-31`;
      } else {
        params['first_air_date.gte'] = `${startYear}-01-01`;
        params['first_air_date.lte'] = `${endYear}-12-31`;
      }
    } else {
      params[
        mediaType === 'movie' ? 'primary_release_year' : 'first_air_date_year'
      ] = filters.year;
    }
  }

  if (filters.rating) {
    params['vote_average.gte'] = filters.rating;
  }
  if (filters.language) {
    params.with_original_language = filters.language;
  }
  if (filters.sort_by) {
    params.sort_by = filters.sort_by;
  }

  try {
    const response = await tmdb.get(endpoint, { params });
    return response.data;
  } catch (err) {
    console.error('Error fetching discover data:', err);
    throw err;
  }
};
