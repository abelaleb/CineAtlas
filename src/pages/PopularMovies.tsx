import { getPopularMovies, MovieChange } from '@/api/tmdb';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import MoviesSection
import { MovieCards } from '@/components/Cards';
import Pagination from '@/components/Pagination';

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState<MovieChange[]>([]);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); // Fixed syntax for useState
  const [postPerPage] = useState<number>(5);
  const { page } = useParams<{ page: string }>();
  const [currentPage, setCurrentPage] = useState<number>(
    page ? parseInt(page, 10) : 1
  );

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await getPopularMovies('', currentPage); // Pass currentPage
      setPopularMovies(response.results || []);
      setTotalPosts(response.total_results);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, [currentPage]);

  return (
    <div className="flex flex-col pt-[68px] m-20">
      <div className="flex py-8">
        <div className="flex-1 text-2xl font-black">Popular Movies</div>
        <div>
          <Button>Filter</Button>
        </div>
      </div>
      <Pagination
        totalPosts={totalPosts}
        postsPerPage={postPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div>
        {loading ? <p>Loading...</p> : <MovieCards movies={popularMovies} />}
      </div>
    </div>
  );
};

export default PopularMovies;
