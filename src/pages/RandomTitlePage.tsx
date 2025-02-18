import  { useState, useEffect } from 'react';
import tmdb from '@/api/axiosInstance';
import { handleResponse } from '@/api/responseHandler';
import confetti from 'canvas-confetti';
import { MovieChange, TVShowChange } from '@/types/types';

const TOTAL_PAGES = 150;

const RandomPage = () => {
  const [movies, setMovies] = useState<MovieChange[]>([]);
  const [tvShows, setTvShows] = useState<TVShowChange[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomMovies = async () => {
    const randomPages = Array.from({ length: 3 }, () => Math.floor(Math.random() * TOTAL_PAGES) + 1);
    const moviePromises = randomPages.map((page) =>
      tmdb.get('/discover/movie', {
        params: { sort_by: 'popularity.desc', page },
      })
    );
    const responses = await Promise.all(moviePromises);
    const moviesData = responses.map((res) => handleResponse(res).results);
    // Pick one random movie from each page
    const selectedMovies = moviesData.map((movieList: MovieChange[]) =>
      movieList[Math.floor(Math.random() * movieList.length)]
    );
    return selectedMovies;
  };

  // Fetch 3 random TV shows
  const fetchRandomTvShows = async () => {
    const randomPages = Array.from({ length: 3 }, () => Math.floor(Math.random() * TOTAL_PAGES) + 1);
    const tvPromises = randomPages.map((page) =>
      tmdb.get('/discover/tv', {
        params: { sort_by: 'popularity.desc', page },
      })
    );
    const responses = await Promise.all(tvPromises);
    const tvData = responses.map((res) => handleResponse(res).results);
    // Pick one random TV show from each page
    const selectedTvShows = tvData.map((tvList: TVShowChange[]) =>
      tvList[Math.floor(Math.random() * tvList.length)]
    );
    return selectedTvShows;
  };

  // Fetch both movies and TV shows in parallel
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [randomMovies, randomTvShows] = await Promise.all([
        fetchRandomMovies(),
        fetchRandomTvShows(),
      ]);
      setMovies(randomMovies);
      setTvShows(randomTvShows);

      // Trigger confetti when new results are loaded
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch on mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 pt-[68px] flex flex-col w-full h-full">
      <h1 className="text-3xl font-bold text-center mb-8">Random Page</h1>
      <div className="flex justify-center mb-8">
        <button
          onClick={fetchData}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ? 'Loading...' : 'Shuffle'}
        </button>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movies.map((movie, index) => (
            <div key={`movie-${index}`} className="bg-white rounded shadow-md overflow-hidden">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">TV Shows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tvShows.map((tv, index) => (
            <div key={`tv-${index}`} className="bg-white rounded shadow-md overflow-hidden">
              {tv.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                  alt={tv.name}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{tv.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RandomPage;
