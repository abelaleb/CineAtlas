import { useState, useEffect } from 'react';
import { getTrendingMovies } from '@/api/movies';
import { getTrendingPeople } from '@/api/people';
import { getTrendingTvShows } from '@/api/tvShows';
import MoviesSection from './MoviesSection';
import TVShowsSection from './TVShowsSection';
import PeopleSection from './PeopleSection';
import  usePaginatedData  from '@/hooks/usePaginatedData';
import { MovieChange, PersonChange, TVShowChange } from '@/types/types';
import TrendingCarousel from './Carousel';

const MainContent = () => {
  const [movies, setMovies] = useState<MovieChange[]>([]);
  const [tvShows, setTvShows] = useState<TVShowChange[]>([]);
  const [people, setPeople] = useState<PersonChange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentMoviePage, setCurrentMoviePage] = useState<number>(1);
  const [currentTvPage, setCurrentTvPage] = useState<number>(1);
  const [currentPeoplePage, setCurrentPeoplePage] = useState<number>(1);

  const postPerPage = 6;

  const currentMovies = usePaginatedData(movies, postPerPage, currentMoviePage);
  const currentTvShows = usePaginatedData(tvShows, postPerPage, currentTvPage);
  const currentPeople = usePaginatedData(people, postPerPage, currentPeoplePage);

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
      <div className="flex w-full ">
        <TrendingCarousel />
      </div>
      <div>
        <MoviesSection
          movies={movies}
          currentMovies={currentMovies}
          currentPage={currentMoviePage}
          setCurrentPage={setCurrentMoviePage}
          postPerPage={postPerPage}
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
