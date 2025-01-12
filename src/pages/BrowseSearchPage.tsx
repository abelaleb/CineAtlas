import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  search,
  getTrendingAll,
  getTrendingMovies,
  getTrendingTvShows,
  getTrendingPeople,
} from '@/api/tmdb';
import {
  MovieChange,
  PersonChange,
  searchChange,
  TVShowChange,
} from '@/types/types';
import { useEffect, useState } from 'react';
// import { image200 } from '@/Constants/Constants';
import SelectScrollable from '@/components/SelectScrollable';
import Pagination from '@/components/Pagination';

import {
  orderOptions,
  genreOptions,
  ratingOptions,
  yearOptions,
  languageOptions,
} from '@/Constants/dropdownOptions';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { format } from 'date-fns';
// import { ImageIcon, Star } from 'lucide-react';
import DynamicCard from '@/components/DynamicCard';

const BrowseSearchPage = () => {
  const [query, setQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<
    searchChange[] | PersonChange[] | MovieChange[] | TVShowChange[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

  // Fetch search results or trending items on page load or when searchCategory, query, currentPage, or triggerSearch changes
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        let response;
        if (!query.trim()) {
          switch (searchCategory) {
            case 'movies':
              response = await getTrendingMovies(currentPage);
              break;
            case 'tvShows':
              response = await getTrendingTvShows(currentPage);
              break;
            case 'people':
              response = await getTrendingPeople(currentPage);
              break;
            default:
              response = await getTrendingAll(currentPage);
              break;
          }
        } else {
          switch (searchCategory) {
            case 'movies':
              response = await search(query, currentPage, 'movie');
              break;
            case 'tvShows':
              response = await search(query, currentPage, 'tv');
              break;
            case 'people':
              response = await search(query, currentPage, 'person');
              break;
            default:
              response = await search(query, currentPage);
              break;
          }
        }
        console.log(response.results);

        setSearchResults(response.results);
        setTotalResults(response.total_results);
      } catch (err) {
        console.error('Error fetching results:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [searchCategory, currentPage, triggerSearch]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
    setTriggerSearch(true);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col w-full h-[100%] gap-4 p-4 justify-top items-center  pt-[68px] ">
      <div className="flex justify-center items-center w-3/4 pt-10 gap-4">
        <div>Search Items :</div>
        <div className="flex h-[32px] justify-center items-center">
          <Select onValueChange={(value) => setSearchCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Search</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="movies">Movies</SelectItem>
                <SelectItem value="tvShows">Tv Shows</SelectItem>
                <SelectItem value="people">People</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 justify-center items-center  ">
          <Input
            type="text"
            placeholder={`Search ${searchCategory}...`}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{ width: '300px', height: '32px' }}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      <div className="flex w-full gap-4 p-4 justify-center items-center ">
        <div className=" p-4 rounded-md">
          <h2 className="font-semibold mb-2">Genre:</h2>
          <SelectScrollable placeholder="Select genre" options={genreOptions} />
        </div>
        <div className=" p-4 rounded-md">
          <h2 className="font-semibold mb-2">Ratings:</h2>
          <SelectScrollable
            placeholder="Select rating"
            options={ratingOptions}
          />
        </div>
        <div className=" p-4 rounded-md">
          <h2 className="font-semibold mb-2">Year:</h2>
          <SelectScrollable placeholder="Select year" options={yearOptions} />
        </div>
        <div className=" p-4 rounded-md">
          <h2 className="font-semibold mb-2">Language:</h2>
          <SelectScrollable
            placeholder="Select language"
            options={languageOptions}
          />
        </div>
        <div className=" p-4 rounded-md">
          <h2 className="font-semibold mb-2">Ordered by:</h2>
          <SelectScrollable placeholder="Select order" options={orderOptions} />
        </div>
      </div>

      <div className="w-full p-4">
        {loading && <div>Loading...</div>}
        {!loading && searchResults.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-0 m-0  ">
              {searchResults.map((item) => (
                <DynamicCard
                  key={item.id}
                  mediaType={item.media_type}
                  data={item}
                />
              ))}
            </div>
            <Pagination
              totalPosts={totalResults}
              postsPerPage={20}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        )}

        {!loading && searchResults.length === 0 && <div>No results found.</div>}
      </div>
    </div>
  );
};

export default BrowseSearchPage;
