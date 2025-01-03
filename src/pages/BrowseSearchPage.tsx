import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { search, searchChange, getTrendingAll } from '@/api/tmdb';
import { useEffect, useState } from 'react';
import { image200 } from '@/Constants/Constants';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { ImageIcon, Star } from 'lucide-react';

const BrowseSearchPage = () => {
  const [query, setQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('movies');
  const [searchResults, setSearchResults] = useState<searchChange[]>([]);
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
          response = await getTrendingAll(currentPage);
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

        setSearchResults(response.results);
        setTotalResults(response.total_results);
      } catch (err) {
        console.error('Error fetching results:', err);
      } finally {
        setLoading(false);
      }
    };
    if (triggerSearch || currentPage !== 1) {
      fetchResults();
      setTriggerSearch(false);
    }
  }, [searchCategory, query, currentPage, triggerSearch]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on new search
    setTriggerSearch(true);
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
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  ">
              {searchResults.map((item) => (
                <Card key={item.id} className="hover:shadow-lg p-0 h-full">
                  <CardHeader className="p-0">
                    <CardTitle className="p-0 relative group">
                      {item.poster_path || item.backdrop_path ? (
                        <img
                          src={
                            item.poster_path
                              ? image200 + item.poster_path
                              : image200 + item.backdrop_path
                          }
                          className="w-[100%] h-[100%] max-h-[350px] overflow-hidden relative rounded-t-xl p-1"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-[307px] bg-gray-200 rounded-t-xl">
                          <ImageIcon className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 hover:text-gray-500 hover:cursor-pointer transition-opacity duration-300 rounded-t-lg">
                        <div className="text-white text-lg font-bold self-center flex flex-col items-center">
                          <div>
                            <Star />
                          </div>
                          {Number.isInteger(item.vote_average)
                            ? item.vote_average
                            : item.vote_average.toFixed(1)}
                          /10
                        </div>
                        <div className="text-black text-sm bg-white bg-opacity-50 p-4 rounded-lg">
                          {item.original_language}
                        </div>
                      </div>
                    </CardTitle>
                    <CardDescription>{item.original_name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:text-gray-500 hover:cursor-pointer">
                      {item.original_title || item.original_name}
                    </div>
                    <div>
                      {item.release_date && (
                        <div>{format(new Date(item.release_date), ' yyyy')}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Pagination
              totalPosts={totalResults}
              postsPerPage={20}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              fetchPopularMovies={() => {}}
            />
          </>
        )}

        {!loading && searchResults.length === 0 && <div>No results found.</div>}
      </div>
    </div>
  );
};

export default BrowseSearchPage;
