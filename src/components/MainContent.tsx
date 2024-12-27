import { useState, useEffect } from 'react';
import {
  getMovieChanges,
  getTVChanges,
  getPersonChanges,
  MovieChange,
  TVShowChange,
  PersonChange,
} from '../api/tmdb';
import highestImg from '../assets/images/Highest in the room.jpg';
import { Input } from './ui/input';
import { MovieCards, TVShowCards, PeopleCards } from './Cards';
const MainContent = () => {
  const [movies, setMovies] = useState<MovieChange[]>([]);
  const [tvShows, setTvShows] = useState<TVShowChange[]>([]);
  const [people, setPeople] = useState<PersonChange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        setLoading(true);
        const [movieData, tvData, personData] = await Promise.all([
          getMovieChanges(),
          getTVChanges(),
          getPersonChanges(),
        ]);
        console.log('Movies: ', movies);
        // console.log('tvchanges: ', tvChanges);
        // console.log('People: ', people);

        setMovies(movieData.results || []);
        setTvShows(tvData.results || []);
        setPeople(personData.results || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChanges();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex  w-full">
        <div
          style={{
            backgroundImage: `url(${highestImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="h-[300px] w-full flex flex-col justify-center items-center "
        >
          <div className="">
            <p className="text-white text-3xl font-extrabold text-start">
              Welcome.{' '}
            </p>
            <p className="text-white text-xl font-semibold text-start">
              Millions of Movies, TV shows and people to discover.
            </p>
            <p className="text-white text-xl font-semibold text-start">
              Explore now.
            </p>
            <Input type="text" placeholder="Search" color="white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Trending Movies</h1>
        </div>
        <MovieCards movies={movies} />
      </div>
      <div className="flex flex-col">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Trending TV Shows</h1>
        </div>
        <div className="flex gap-4 p-4">
          <TVShowCards tvShows={tvShows} />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Trending People</h1>
        </div>
        <div className="flex gap-4 p-4">
          <PeopleCards people={people} />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
