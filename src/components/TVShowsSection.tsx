import { TVShowChange } from '@/types/types';
import { TVShowCards } from './Cards';
import Pagination from './Pagination';

interface TVShowsSectionProps {
  tvShows: TVShowChange[];
  currentTvShows: TVShowChange[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  postPerPage: number;
}

const TVShowsSection: React.FC<TVShowsSectionProps> = ({
  tvShows,
  currentTvShows,
  currentPage,
  setCurrentPage,
  postPerPage,
}: TVShowsSectionProps) => {
  return (
    <div className="flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center">Trending TV Shows</h1>
      </div>
      <TVShowCards tvShows={currentTvShows} />
      <Pagination
        totalPosts={tvShows.length}
        postsPerPage={postPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TVShowsSection;
