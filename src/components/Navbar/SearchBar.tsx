import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FilmIcon, Tv2Icon, User } from "lucide-react";
import { fetchSearchData } from "@/api/search";
import { searchChange } from "@/types/types";
import { image200 } from "@/Constants/Constants";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<searchChange[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const fetchSearchResults = async () => {
        const results = await fetchSearchData(searchQuery);
        setSearchResults(results.results);
      };
      const delayDebounceFn = setTimeout(() => {
        fetchSearchResults();
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsMobileSearchOpen(false);
      setIsSearchFocused(false); 
    }
  };

  const searchInputSection = (
    <section className="flex md:flex-1 md:w-8/12 sm:flex-1 w-[100%] bg-secondary text-text rounded-lg ">
      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearchSubmit();
        }}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
        className="w-full transition-all duration-300 ease-in-out border border-primary rounded-lg rounded-r-none focus:border-secondary focus:outline-none font-normal capitalize"
        style={{ fontSize: "14px" }}
      />
      <Button className="rounded-l-none" onClick={handleSearchSubmit}>
        <Search />
      </Button>
    </section>
  );

  const searchResultsDropdown = isSearchFocused && searchResults.length > 0 && (
    <div
      style={{ scrollbarWidth: "thin", scrollbarColor: "# #f1f1f1" }}
      className="absolute top-full left-0 w-full mt-2 max-h-80 overflow-y-auto border border-primary rounded-lg shadow-lg z-50 dark:bg-gradient-to-br bg-[#e1c1eb] dark:from-[#1a1a2e] dark:via-[#231b32] dark:to-[#1f1f2f] text-text"
    >
      {searchResults.map((result) => (
        <a
          key={result.id}
          href={`/${result.media_type}/${result.id}`}
          className="block p-3 hover:bg-accent transition-colors duration-200 cursor-pointer"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg text-muted-foreground">
              {result.media_type === "movie" ? (
                <FilmIcon />
              ) : result.media_type === "tv" ? (
                <Tv2Icon />
              ) : (
                <User />
              )}
            </span>
            <span className="flex-1 font-normal">
              {result.title || result.name}
            </span>
            <span className="text-sm text-gray-400">{result.release_date}</span>
            <span>
              {result.backdrop_path ||
              result.poster_path ||
              result.profile_path ? (
                <img
                  src={
                    result.backdrop_path
                      ? image200 + result.backdrop_path
                      : result.poster_path
                      ? image200 + result.poster_path
                      : image200 + result.profile_path
                  }
                  alt="thumbnail"
                  className={`object-cover ${
                    result.profile_path
                      ? "w-10 h-10 rounded-full"
                      : "w-16 h-9 rounded-lg"
                  }`}
                />
              ) : null}
            </span>
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <div className="w-full relative">
      <div className="hidden sm:flex">
        {searchInputSection}
        {searchResultsDropdown}
      </div>

      <div className="sm:hidden">
        <Button onClick={() => setIsMobileSearchOpen((prev) => !prev)}>
          <Search />
        </Button>
      </div>

      {isMobileSearchOpen && (
        <div className=" bg-secondary p-2 fixed top-0 left-0  w-full z-10">
          <div className="flex w-full justify-between gap-4">
            {searchInputSection}
            {searchResultsDropdown}
            <Button onClick={() => setIsMobileSearchOpen((prev) => !prev)}>
              X
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
