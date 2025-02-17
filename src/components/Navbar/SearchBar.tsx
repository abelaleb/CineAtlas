import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, FilmIcon, Tv2Icon, User } from 'lucide-react';
import { fetchSearchData } from '@/api/search';
import {
  searchChange,
} from '@/types/types';
import { image200 } from '@/Constants/Constants';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
   searchChange[] 
  >([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const fetchSearchResults = async () => {
        const results = await fetchSearchData(searchQuery);
        setSearchResults(results.results);
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full relative">
      <section className="flex">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearchSubmit();
          }}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          className="w-full border border-primary rounded-lg rounded-r-none focus:border-secondary focus:outline-none font-normal capitalize"
          style={{ fontSize: '14px' }}
        />
        <Button className="rounded-l-none" onClick={handleSearchSubmit}>
          <Search />
        </Button>
      </section>

      {isSearchFocused && searchResults.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-background border border-primary rounded-lg shadow-lg z-50">
          {searchResults.map((result) => (
            <a
              key={result.id}
              href={`/${result.media_type}/${result.id}`}
              className="block p-2 hover:bg-accent transition-colors duration-200 cursor-pointer"
              onMouseDown={(e) => e.preventDefault()} // Prevents input blur when clicking
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {result.media_type === 'movie' ? (
                    <FilmIcon />
                  ) : result.media_type === 'tv' ? (
                    <Tv2Icon />
                  ) : (
                    <User />
                  )}{' '}
                </span>
                <span className="font-normal">
                  {result.title || result.name}
                </span>
                <span>{result.release_date}</span>
                <span>
                  {result.backdrop_path ? (
                    <img
                      src={image200 + result.backdrop_path}
                      alt="image"
                      width="100px"
                      height="100%"
                    />
                  ) : result.poster_path ? (
                    <img
                      src={image200 + result.poster_path}
                      alt="image"
                      width="100px"
                      height="100%"
                    />
                  ) : result.profile_path?(<img
                    src={image200 + result.profile_path}
                    alt="image"
                    width="100px"
                    height="100%"
                  />): null}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
