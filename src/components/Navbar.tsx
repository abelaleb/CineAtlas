import { Moon, Sun } from 'lucide-react';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import { useSidebar } from './ui/sidebar';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { useTheme } from './Theme-provider';
import logo from '../../public/logo.svg';
import { MovieChange, TVShowChange, PersonChange } from '@/types/types';
import { useState, useEffect } from 'react';
import { searchInput } from '@/api/search';

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const { setTheme, theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    MovieChange[] | TVShowChange[] | PersonChange[]
  >([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const fetchSearchResults = async () => {
        const results = await searchInput(searchQuery);
        setSearchResults(results.results); // Assuming the API returns results in a `results` field
      };
      fetchSearchResults();
    } else {
      setSearchResults([]); // Clear results if the search query is empty
    }
  }, [searchQuery]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className="grid grid-cols-4 items-center justify-between p-4 bg-secondary border-b">
      <div className="flex justify-start items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
        <Link to="/">
          <div className="flex items-center justify-center col-span-1 gap-1 pl-8 text-center group transition-transform duration-200 hover:scale-105 active:scale-95">
            <img
              src={logo}
              alt="logo"
              className="h-6 w-6 transition-transform duration-200 group-hover:rotate-12"
            />
            <div className="text-lg font-bold transition-colors duration-200 group-hover:text-primary">
              CineAtlas
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between col-span-3 px-4">
        <div className="w-3/4 relative">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)} // Delay to allow clicking on results
            className="w-full border border-primary rounded-lg focus:border-secondary focus:outline-none font-normal capitalize"
            style={{ fontSize: '14px' }}
          />
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-background border border-primary rounded-lg shadow-lg z-50">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  to={`/${result.media_type}/${result.id}`}
                  className="block p-2 hover:bg-accent transition-colors duration-200 hover:cursor-pointer"
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                  onClick={() => console.log(result.media_type)}
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-normal">
                      {result.title || result.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {result.media_type === 'movie'
                        ? 'Movie'
                        : result.media_type === 'tv'
                        ? 'TV Show'
                        : 'Person'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="flex">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun
              className={`h-[1.2rem] w-[1.2rem] ${
                theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
              } transition-all`}
            />
            <Moon
              className={`absolute h-[1.2rem] w-[1.2rem] ${
                theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
              } transition-all`}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;