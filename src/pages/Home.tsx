import { useState, useEffect } from "react";
import { getTrendingMovies } from "@/api/movies";
import { getTrendingPeople } from "@/api/people";
import { getTrendingTvShows } from "@/api/tvShows";
import TVShowsSection from "@/components/TVShowsSection";
import PeopleSection from "../components/PeopleSection";
import { MovieChange, PersonChange, TVShowChange } from "@/types/types";
import Spinner from "../components/Spinner";
import MovieSection from "@/components/MovieSection";
import TrendingCarousel from "@/components/ui/TrendingCarousel";

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
      <div className="flex flex-col justify-center md:w-[calc(100vw-4rem)] p-4 md:p-6 md:pr-0 lg:p-8 lg:pr-0 ">
        <MovieSection movies={movies} />
        <TVShowsSection tvShows={tvShows} />
        <PeopleSection people={people} />
      </div>
    </div>
  );
};

export default MainContent;
