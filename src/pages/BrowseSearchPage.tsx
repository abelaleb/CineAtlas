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
import DynamicCard from '@/components/DynamicCard';

const BrowseSearchPage = () => {
  const [query, setQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<
    searchChange[] | MovieChange[] | TVShowChange[] | PersonChange[]
  >([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

  const handleGenreChange = (value: string) => {
    // Handle genre change
    console.log('Selected genre:', value);
  };

  const handleRatingChange = (value: string) => {
    // Handle rating change
    console.log('Selected rating:', value);
  };

  const handleYearChange = (value: string) => {
    // Handle year change
    console.log('Selected year:', value);
  };

  const handleLanguageChange = (value: string) => {
    // Handle language change
    console.log('Selected language:', value);
  };

  const handleOrderChange = (value: string) => {
    // Handle order change
    console.log('Selected order:', value);
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        let mediaType = 'multi';
        if (searchCategory === 'movie') {
          mediaType = 'movie';
        } else if (searchCategory === 'tv') {
          mediaType = 'tv';
        } else if (searchCategory === 'person') {
          mediaType = 'person';
        }
        const searchTerm = query.trim();
        const response = await fetchSearchData(
          searchTerm,
          currentPage,
          mediaType
        );
        setSearchResults(response.results);
        setTotalResults(response.total_results);
      } catch (err) {
        console.error('Error fetching results from tmdb:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [searchCategory, currentPage, triggerSearch]);

  const handleSearch = () => {
    setCurrentPage(1);
    setTriggerSearch((prev) => !prev);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col w-full h-[100%] gap-4 justify-top items-center  pt-[68px]">
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

        <div className="flex gap-2 justify-center items-center  ">
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

      <div className="flex w-full gap-4 justify-center items-center ">
        <div className=" p-4 rounded-md">
          <h2 className="font-semibold mb-2">Genre:</h2>
          <SelectScrollable
            placeholder="Select genre"
            options={genreOptions}
            onValueChange={handleGenreChange}
          />
        </div>
        <div className=" p-4 rounded-md">
          <h2 className="font-semibold mb-2">Ratings:</h2>
          <SelectScrollable
            placeholder="Select rating"
            options={ratingOptions}
            onValueChange={handleRatingChange}
          />
        </div>
        <div className=" p-4 rounded-md">
          <h2 className="font-semibold mb-2">Year:</h2>
          <SelectScrollable
            placeholder="Select year"
            options={yearOptions}
            onValueChange={handleYearChange}
          />
        </div>
        <div className=" p-4 rounded-md">
          <h2 className="font-semibold mb-2">Language:</h2>
          <SelectScrollable
            placeholder="Select language"
            options={languageOptions}
            onValueChange={handleLanguageChange}
          />
        </div>
        <div className=" p-4 rounded-md">
          <h2 className="font-semibold mb-2">Ordered by:</h2>
          <SelectScrollable
            placeholder="Select order"
            options={orderOptions}
            onValueChange={handleOrderChange}
          />
        </div>
      </div>

      <div className="w-full ">
        {loading && <div>Loading...</div>}
        {!loading && searchResults.length > 0 && (
          <>
            <div className="flex flex-wrap gap-2 justify-center">
              {searchResults.map((result) => {
                const cardMediaType = result.media_type || searchCategory;

                return (
                  <DynamicCard
                    key={result.id}
                    mediaType={
                      cardMediaType as  'movie' | 'tv' | 'person'
                    }
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
