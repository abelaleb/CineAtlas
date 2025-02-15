export interface PersonChange {
  adult: boolean;
  gender: 0 | 2;
  id: number;
  known_for_department: string;
  media_type: 'movie' | 'tv' | 'person'; // Fixed type
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  backdrop_path?: string;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  genre_ids?: Array<number>;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface TVShowChange {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string | number | Date;
  genre_ids: Array<number>;
  id: number;
  media_type: 'movie' | 'tv' | 'person'; // Fixed type
  name: string;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
}

export interface MovieChange {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  media_type: 'movie' | 'tv' | 'person'; 
  //eslint-disable-next-line
  [key: string]: any;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string | number | Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface searchChange {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: 'movie' | 'tv' | 'person'; 
  name: string;
  genre_ids: Array<number>;
  popularity: number;
  profile_path:string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null;
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{ english_name: string; iso_639_1: string }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieCreditDetials {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface TVShowDetails {
  adult: boolean;
  backdrop_path: string | null;
  created_by: Array<{
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }>;
  episode_run_time: number[];
  first_air_date: string | number | Date;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string | number | Date;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string | number | Date;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  } | null;
  name: string;
  next_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string | number | Date;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
  } | null;
  networks: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: Array<{
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  seasons: Array<{
    air_date: string | number | Date;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }>;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface TvShowCredits {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
}

export interface PersonalDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
}

export interface CreditsResponse {
  cast: Array<{
    adult: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    id: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    character?: string;
    credit_id?: string;
    order?: number;
    media_type: 'movie' | 'tv' | 'person'; // Fixed type
  }>;
  crew: Array<{
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credit_id: string;
    department: string;
    job: string;
    media_type: 'movie' | 'tv' | 'person'; // Fixed type
  }>;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
