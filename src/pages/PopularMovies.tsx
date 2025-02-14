import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieChange } from '@/types/types';
import { MovieCards } from '@/components/Cards';
import Pagination from '@/components/Pagination';
import SelectScrollable from '@/components/SelectScrollable';
import { fetchDiscoverData, DiscoverFilters } from '@/api/discover';
import {
  genreOptions,
  ratingOptions,
  yearOptions,
  languageOptions,
  sortOptions,
} from '@/Constants/dropdownOptions';

const PopularMovies = () => {
  const { page } = useParams<{ page: string }>();
  const [currentPage, setCurrentPage] = useState<number>(page ? parseInt(page, 10) : 1);
  const [movieResults, setMovieResults] = useState<MovieChange[]>([]);
  const [totalMovieResults, setTotalMovieResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [filters, setFilters] = useState<DiscoverFilters>({
    genre: '',
    rating: '',
    year: '',
    language: '',
    sort_by: '',
  });

  const handleFilterChange = (key: keyof DiscoverFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchMovieResults = async () => {
      setLoading(true);
      try {
        const response = await fetchDiscoverData('movie', currentPage, filters);
        setMovieResults(response.results);
        setTotalMovieResults(response.total_results);
      } catch (err) {
        console.error('Error fetching movie results:', err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchMovieResults();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, filters]);

  return (
    <main className="flex flex-col pt-[68px] max-w-screen-xl">
      <section className="flex flex-col p-8">
        <h1 className="text-2xl font-black mb-4 text-center">Find Your Movies</h1>
    
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {[
            { label: 'Genre', key: 'genre', options: genreOptions },
            { label: 'Ratings', key: 'rating', options: ratingOptions },
            { label: 'Year', key: 'year', options: yearOptions },
            { label: 'Language', key: 'language', options: languageOptions },
            { label: 'Sort by', key: 'sort_by', options: sortOptions },
          ].map(({ label, key, options }) => (
            <div key={key} className="p-4 rounded-md max-w-screen-sm">
              <h2 className="font-semibold mb-2">{label}:</h2>
              <SelectScrollable
                placeholder={`Select ${label.toLowerCase()}`}
                options={options}
                onValueChange={(value) => handleFilterChange(key as keyof DiscoverFilters, value)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="p-8">
        {loading ? <p className="text-center text-lg">Loading...</p> : <MovieCards movies={movieResults} />}
      </section>

      <Pagination
        totalPosts={totalMovieResults}
        postsPerPage={20}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
};

export default PopularMovies;
