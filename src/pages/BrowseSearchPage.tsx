import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchSearchData } from "@/api/search";
import { MovieChange, PersonChange, searchChange, TVShowChange } from "@/types/types";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import DynamicCard from "@/components/DynamicCard";
import Spinner from "@/components/Spinner";
import { useSearchParams } from "react-router-dom";

const BrowseSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState<string>(initialQuery);
  const [searchCategory, setSearchCategory] = useState<string>("all");
  const [searchResults, setSearchResults] = useState<searchChange[] | MovieChange[] | TVShowChange[] | PersonChange[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

  useEffect(() => {
    const urlQuery = searchParams.get("query") || "";
    setQuery(urlQuery);
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        if (query.trim() && searchCategory === "all") {
          const response = await fetchSearchData(query.trim(), currentPage, "multi");
          setSearchResults(response.results);
          setTotalResults(response.total_results);
        } else if (searchCategory === "movie") {
          const response = await fetchSearchData(query.trim(), currentPage, "movie");
          setSearchResults(response.results);
          setTotalResults(response.total_results);
        } else if (searchCategory === "tv") {
          const response = await fetchSearchData(query.trim(), currentPage, "tv");
          setSearchResults(response.results);
          setTotalResults(response.total_results);
        } else if (searchCategory === "person") {
          const response = await fetchSearchData(query.trim(), currentPage, "person");
          setSearchResults(response.results);
          setTotalResults(response.total_results);
        }
      } catch (err) {
        console.error("Error fetching results from tmdb:", err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchCategory, currentPage, triggerSearch, query]);

  const handleSearch = () => {
    setCurrentPage(1);
    setTriggerSearch((prev) => !prev);
    setSearchParams({ query });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-top items-center pt-[68px] py-4 md:py-6 lg:py-8">
      <div className="flex justify-center items-center w-3/4 pt-10 p-4">
        <div className="flex h-[32px] justify-center items-center">
          <Select onValueChange={(value) => setSearchCategory(value)}>
            <SelectTrigger className="rounded-none border-r-none bg-secondary">
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

        <div className="flex flex-wrap justify-center items-center">
          <Input
            type="text"
            placeholder={`Search ${searchCategory}...`}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            value={query}
            className="h-[36px] w-[200px] md:w-[300px] lg:w-[500px] rounded-none"
          />
          <Button onClick={handleSearch} disabled={loading} className="rounded-l-none">
            {loading ? "Searching..." : "Search"}
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
            <div className="grid justify-center items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-4 gap-2">
              {searchResults.map((result) => {
                const cardMediaType = result.media_type || searchCategory;
                return (
                  <DynamicCard
                    key={result.id}
                    mediaType={cardMediaType as "movie" | "tv" | "person"}
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
        {!loading && searchResults.length === 0 && (
          <div className="flex justify-center items-center h-[30vw]">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default BrowseSearchPage;
