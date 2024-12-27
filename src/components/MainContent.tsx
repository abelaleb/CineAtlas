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
import Pagination from './Pagination';
const MainContent = () => {
  const [movies, setMovies] = useState<MovieChange[]>([]);
  const [tvShows, setTvShows] = useState<TVShowChange[]>([]);
  const [people, setPeople] = useState<PersonChange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage, setPostPerPage] = useState<number>(5);
  const [currentTvPage, setCurrentTvPage] = useState<number>(1);
  const [currentPeoplePage, setCurrentPeoplePage] = useState<number>(1);
  const [tvPostPerPage, setTvPostPerPage] = useState<number>(5);
  const [peoplePostPerPage, setPeoplePostPerPage] = useState<number>(5);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage; 
  const currentMovies = movies.slice(firstPostIndex, lastPostIndex);

  const lastTvPostIndex = currentTvPage * tvPostPerPage;
  const firstTvPostIndex = lastTvPostIndex - tvPostPerPage;
  const currentTvShows = tvShows.slice(firstTvPostIndex, lastTvPostIndex);

  const lastPeoplePostIndex = currentPeoplePage * peoplePostPerPage;
  const firstPeoplePostIndex = lastPeoplePostIndex - peoplePostPerPage;
  const currentPeople = people.slice(firstPeoplePostIndex, lastPeoplePostIndex);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        setLoading(true);
        const [movieData, tvData, personData] = await Promise.all([
          getMovieChanges(),
          getTVChanges(),
          getPersonChanges(),
        ]);
        console.log('Movies: ', currentMovies);
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
        <MovieCards movies={currentMovies} />
        <Pagination totalPosts={movies.length} postsPerPage={postPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div>
      <div className="flex flex-col">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Trending TV Shows</h1>
        </div>
        <div className="flex gap-4 p-4">
          <TVShowCards tvShows={currentTvShows} />
        </div>
        <Pagination totalPosts={tvShows.length} postsPerPage={tvPostPerPage} currentPage={currentTvPage} setCurrentPage={setCurrentTvPage}/>
      </div>
      <div className="flex flex-col">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Trending People</h1>
        </div>
        <div className="flex gap-4 p-4">
          <PeopleCards people={currentPeople} />
        </div>
        <Pagination totalPosts={people.length} postsPerPage={peoplePostPerPage} currentPage={currentPeoplePage} setCurrentPage={setCurrentPeoplePage}/>
      </div>
    </div>
  );
};

export default MainContent;
