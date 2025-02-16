import tmdb from '@/api/axiosInstance';
import { handleResponse } from '@/api/responseHandler';
import { useEffect, useState } from 'react';

const fetchRandomTitle = async () => {
  const [results, setResults] = useState<Array[T]>([]);
  let trigger = true;
  const [randomMovie, setRandomMovie] = useState<string>('');
  const [randomTvShow, setRandomTvShow] = useState<string>('');
  const [randomPerson, setRandomPerson] = useState<string>('');
  const totalPages = 150; 
  const randomPages = Array.from(
    { length: 3 },
    () => Math.floor(Math.random() * totalPages) + 1
  );

  const moviePromises = randomPages.map((page) =>
    tmdb.get(`/discover/movie`, {
      params: {
        sort_by: 'popularity.desc',
        page,
      },
    })
  );

  try {
    const responses = await Promise.all(moviePromises);
    const movies = responses.map((res) => handleResponse(res).results);

    // Randomly pick one movie per page
    const selectedMovies = movies.map((movieList) => {
      return movieList[Math.floor(Math.random() * movieList.length)];
    });

    return selectedMovies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export default fetchRandomTitle;
