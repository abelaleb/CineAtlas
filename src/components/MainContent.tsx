import { useState, useEffect } from 'react';
import {
  getTrendingMovies,
  getTrendingTvShows,
  getTrendingPeople,
  MovieChange,
  TVShowChange,
  PersonChange,
} from '../api/tmdb';
import Header from './Header';
import MoviesSection from './MoviesSection';
import TVShowsSection from './TVShowsSection';
import PeopleSection from './PeopleSection';

const MainContent = () => {
  const [movies, setMovies] = useState<MovieChange[]>([]);
  const [tvShows, setTvShows] = useState<TVShowChange[]>([]);
  const [people, setPeople] = useState<PersonChange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage] = useState<number>(5);
  const [currentTvPage, setCurrentTvPage] = useState<number>(1);
  const [currentPeoplePage, setCurrentPeoplePage] = useState<number>(1);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentMovies = movies.slice(firstPostIndex, lastPostIndex);

  const lastTvPostIndex = currentTvPage * postPerPage;
  const firstTvPostIndex = lastTvPostIndex - postPerPage;
  const currentTvShows = tvShows.slice(firstTvPostIndex, lastTvPostIndex);

  const lastPeoplePostIndex = currentPeoplePage * postPerPage;
  const firstPeoplePostIndex = lastPeoplePostIndex - postPerPage;
  const currentPeople = people.slice(firstPeoplePostIndex, lastPeoplePostIndex);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        setLoading(true);
        const [movieData, tvData, personData] = await Promise.all([
          getTrendingMovies(),
          getTrendingTvShows(),
          getTrendingPeople(),
        ]);

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
      <div className="flex  w-full ">
        <Header />
      </div>
      <div>
        <MoviesSection
          movies={movies}
          currentMovies={currentMovies}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postPerPage={postPerPage}
          fetchPopularMovies={() => {}}
        />
      
        <TVShowsSection
          tvShows={tvShows}
          currentTvShows={currentTvShows}
          currentPage={currentTvPage}
          setCurrentPage={setCurrentTvPage}
          postPerPage={postPerPage}
        />
      
        <PeopleSection
          people={people}
          currentPeople={currentPeople}
          currentPage={currentPeoplePage}
          setCurrentPage={setCurrentPeoplePage}
          peoplePostPerPage={postPerPage}
        />
      </div>
    </div>
  );
};

export default MainContent;
