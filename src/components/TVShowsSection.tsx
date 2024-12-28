import { TVShowChange } from '@/api/tmdb';
import { TVShowCards } from './Cards';
import Pagination from './Pagination';

interface TVShowsSectionProps {
  tvShows: TVShowChange[];
  currentTvShows: TVShowChange[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  tvPostPerPage: number;
}

const TVShowsSection: React.FC<TVShowsSectionProps> = ({
  tvShows,
  currentTvShows,
  currentPage,
  setCurrentPage,
  tvPostPerPage,
}) => {
  return (
    <div className="flex flex-col">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Trending TV Shows</h1>
      </div>
      <div className="flex gap-4 p-4">
        <TVShowCards tvShows={currentTvShows} />
      </div>
      <Pagination
        totalPosts={tvShows.length}
        postsPerPage={tvPostPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TVShowsSection;
