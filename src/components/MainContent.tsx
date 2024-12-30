import { useState, useEffect } from 'react';
import {
  getMovieChanges,
  getTVChanges,
  getPersonChanges,
  MovieChange,
  TVShowChange,
  PersonChange,
} from '../api/tmdb';
import Header from './Header';
import MoviesSection from './MoviesSection';
import TVShowsSection from './TVShowsSection';
import PeopleSection from './PeopleSection';

const MainContent = (className:string) => {
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
    <div className={className}>
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
        />
      </div>
      <TVShowsSection
        tvShows={tvShows}
        currentTvShows={currentTvShows}
        currentPage={currentTvPage}
        setCurrentPage={setCurrentTvPage}
        tvPostPerPage={tvPostPerPage}
      />
      <PeopleSection
        people={people}
        currentPeople={currentPeople}
        currentPage={currentPeoplePage}
        setCurrentPage={setCurrentPeoplePage}
        peoplePostPerPage={peoplePostPerPage}
      />
    </div>
  );
};

export default MainContent;
