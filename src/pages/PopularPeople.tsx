import { fetchPopularPeople } from '@/api/tmdb';
import { PersonChange } from '@/types/types';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import MoviesSection
import { PeopleCards } from '@/components/Cards';
import Pagination from '@/components/Pagination';

const PopularMovies = () => {
  const [popularPeople, setPopularPeople] = useState<PersonChange[]>([]);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); // Fixed syntax for useState
  const [postPerPage] = useState<number>(5);
  const { page } = useParams<{ page: string }>();
  const [currentPage, setCurrentPage] = useState<number>(
    page ? parseInt(page, 10) : 1
  );

  useEffect(() => {
    const fetchPopularPeopleData = async () => {
      try {
        setLoading(true);
        const response = await fetchPopularPeople('', currentPage); // Pass currentPage
        setPopularPeople(response.results || []);
        setTotalPosts(response.total_results);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularPeopleData();
  }, [currentPage]);

  return (
    <div className="flex flex-col pt-[68px] m-20">
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
        {loading ? <p>Loading...</p> : <PeopleCards people={popularPeople} />}
      </div>
    </div>
  );
};

export default PopularMovies;
