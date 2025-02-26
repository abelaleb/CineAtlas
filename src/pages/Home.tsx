import { useState, useEffect } from "react";
import { getTrendingMovies } from "@/api/movies";
import { getTrendingPeople } from "@/api/people";
import { getTrendingTvShows } from "@/api/tvShows";
import TVShowsSection from "../components/TVShowsSection";
import PeopleSection from "../components/PeopleSection";
import usePaginatedData from "@/hooks/usePaginatedData";
import { MovieChange, PersonChange, TVShowChange } from "@/types/types";
import Spinner from "../components/Spinner";
import MovieSection from "@/components/MovieSection";
import TrendingCarousel from "@/components/ui/TrendingCarousel";

const MainContent = () => {
  const [movies, setMovies] = useState<MovieChange[]>([]);
  const [tvShows, setTvShows] = useState<TVShowChange[]>([]);
  const [people, setPeople] = useState<PersonChange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const [currentMoviePage, setCurrentMoviePage] = useState<number>(1);
  const [currentTvPage, setCurrentTvPage] = useState<number>(1);
  const [currentPeoplePage, setCurrentPeoplePage] = useState<number>(1);

  const postPerPage = 6;

  // const currentMovies = usePaginatedData(movies, postPerPage, currentMoviePage);
  const currentTvShows = usePaginatedData(tvShows, postPerPage, currentTvPage);
  const currentPeople = usePaginatedData(
    people,
    postPerPage,
    currentPeoplePage
  );

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
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChanges();
  }, []);
  if (loading) return <Spinner />;
  return (
    <div className="pt-[56px] flex flex-col h-full">
      <div className="">
        <TrendingCarousel />
      </div>
      <div className="flex flex-col justify-center ">
        <MovieSection movies={movies} />
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
