import React from "react";
import { MovieChange } from "@/types/types";
import { MovieCards } from "./Cards";
import Pagination from "./Pagination";

interface MoviesSectionProps {
  movies: MovieChange[];
  currentMovies: MovieChange[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postPerPage: number;
}

const MoviesSection: React.FC<MoviesSectionProps> = ({
  movies,
  currentMovies,
  currentPage,
  setCurrentPage,
  postPerPage,
}) => {
  return (
    <div className="flex flex-col items-center w-full ">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">Trending Movies</h1>
      </div>
      <div className="w-full overflow-hidden" >
        <div className="flex">
          <MovieCards movies={currentMovies} />
        </div>
      </div>
      <Pagination
        totalPosts={movies.length}
        postsPerPage={postPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MoviesSection;
