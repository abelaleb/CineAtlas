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

export default tmdb;
