import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchSearchData } from '@/api/search';
import {
  MovieChange,
  PersonChange,
  searchChange,
  TVShowChange,
} from '@/types/types';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DynamicCard from '@/components/DynamicCard';
import Spinner from '@/components/Spinner';
import { useSearchParams } from 'react-router-dom';

const BrowseSearchPage = () => {
  // Use useSearchParams to get the current query from the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';

  // State variables
  const [query, setQuery] = useState<string>(initialQuery);
  const [searchCategory, setSearchCategory] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<
    searchChange[] | MovieChange[] | TVShowChange[] | PersonChange[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

  useEffect(() => {
    const urlQuery = searchParams.get('query') || '';
    setQuery(urlQuery);
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        if (query.trim() && searchCategory === 'all') {
          const response = await fetchSearchData(
            query.trim(),
            currentPage,
            'multi'
          );
          setSearchResults(response.results);
          setTotalResults(response.total_results);
        } else if (searchCategory === 'movie') {
          const response = await fetchSearchData(
            query.trim(),
            currentPage,
            'movie'
          );
          setSearchResults(response.results);
          setTotalResults(response.total_results);
        } else if (searchCategory === 'tv') {
          const response = await fetchSearchData(
            query.trim(),
            currentPage,
            'tv'
          );
          setSearchResults(response.results);
          setTotalResults(response.total_results);
        } else if (searchCategory === 'person') {
          const response = await fetchSearchData(
            query.trim(),
            currentPage,
            'person'
          );
          setSearchResults(response.results);
          setTotalResults(response.total_results);
        }
      } catch (err) {
        console.error('Error fetching results from tmdb:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [
    searchCategory,
    currentPage,
    triggerSearch,
    query,
  ]);

  // Update URL and trigger search when a new search is performed
  const handleSearch = () => {
    setCurrentPage(1);
    setTriggerSearch((prev) => !prev);
    setSearchParams({ query });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col w-full h-[100%] gap-4 justify-top items-center pt-[68px]">
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
                <SelectItem value="movie">Movies</SelectItem>
                <SelectItem value="tv">Tv Shows</SelectItem>
                <SelectItem value="person">People</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 justify-center items-center">
          <Input
            type="text"
            placeholder={`Search ${searchCategory}...`}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            value={query}
            style={{ width: '300px', height: '32px' }}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      <div className="w-full">
        {loading && (
          <section className="p-8 h-screen">
            <Spinner />
          </section>
        )}
        {!loading && searchResults.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2 justify-center">
              {searchResults.map((result) => {
                const cardMediaType = result.media_type || searchCategory;
                return (
                  <DynamicCard
                    key={result.id}
                    mediaType={cardMediaType as 'movie' | 'tv' | 'person'}
                    data={result}
                  />
                );
              })}
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
