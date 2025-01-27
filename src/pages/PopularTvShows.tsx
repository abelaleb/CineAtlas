import { fetchPopularTvShows } from '@/api/tvShows';
import { TVShowChange } from '@/types/types';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import MoviesSection
import { TVShowCards } from '@/components/Cards';
import Pagination from '@/components/Pagination';

const PopularMovies = () => {
  const [popularTvShows, setPopularTvShows] = useState<TVShowChange[]>([]);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); // Fixed syntax for useState
  const [postPerPage] = useState<number>(5);
  const { page } = useParams<{ page: string }>();
  const [currentPage, setCurrentPage] = useState<number>(
    page ? parseInt(page, 10) : 1
  );

  useEffect(() => {
    const fetchPopularTvShowData = async () => {
      try {
        setLoading(true);
        const response = await fetchPopularTvShows( currentPage); // Pass currentPage
        setPopularTvShows(response.results || []);
        setTotalPosts(response.total_results);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularTvShowData();
  }, [currentPage]);

  return (
    <div className="flex flex-col pt-[68px] ">
      <div className="flex py-8">
        <div className="flex-1 text-2xl font-black">Popular Tv Shows</div>
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
        {loading ? <p>Loading...</p> : <TVShowCards tvShows={popularTvShows} />}
      </div>
    </div>
  );
};

export default PopularMovies;
