import React from 'react';
import { MovieChange } from '@/api/tmdb';
import { MovieCards } from './Cards';
import Pagination from './Pagination';

interface MoviesSectionProps {
  movies: MovieChange[];
  currentMovies: MovieChange[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postPerPage: number;
  fetchPopularMovies: () => void; // Add this prop
}

const MoviesSection: React.FC<MoviesSectionProps> = ({
  movies,
  currentMovies,
  currentPage,
  setCurrentPage,
  postPerPage,
  fetchPopularMovies, // Use this prop
}) => {
  return (
    <div className="flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">Trending Movies</h1>
      </div>
      <MovieCards movies={currentMovies} />
      <Pagination
        totalPosts={movies.length}
        postsPerPage={postPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        fetchPopularMovies={fetchPopularMovies} // Pass this prop
      />
    </div>
  );
};

export default MoviesSection;
