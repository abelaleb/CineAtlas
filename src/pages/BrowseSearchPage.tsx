import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { search, searchChange } from '@/api/tmdb';
import { useState } from 'react';
import { image200 } from '@/Constants/Constants';
import SelectScrollable from '@/components/SelectScrollable';
import {
  orderOptions,
  genreOptions,
  ratingOptions,
  yearOptions,
  languageOptions,
} from '@/Constants/dropdownOptions';
const BrowseSearchPage = () => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<searchChange[]>([]);
  // const [page, setPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!query.trim()) return; //prevent empty search
    setLoading(true);
    try {
      const response = await search(query);
      setSearchResults(response.results);
    } catch (err) {
      console.error('Error during search:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 p-4 justify-top items-center  pt-[68px]">
      <div className=" w-3/4 pt-10">
        <div>Search Items :</div>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Search for Movies,Tv Shows, People"
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: '100%' }}
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
        {loading && <p>Loading...</p>}
        {!loading && searchResults.length > 0 && (
          <div
            className="grid grid-cols-2 gap-4 
        md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
        "
          >
            {searchResults.map((item) => (
              <div key={item.id} className="bg-red-300 p-4 rounded shadow-md">
                <p className="font-bold">
                  {item.original_title || item.original_name}
                </p>
                {item.adult && <span className="text-red-500">18+</span>}
                {item.poster_path && (
                  <img
                    src={image200 + item.poster_path}
                    alt={item.original_title || item.original_name}
                    className="w-full h-48 object-cover rounded hover:shadow-lg"
                  />
                )}
                {item.release_date && <div>{item.release_date}</div>}
              </div>
            ))}
          </div>
        )}

        {!loading && searchResults.length === 0 && <p>No results found.</p>}
      </div>
    </div>
  );
};

export default BrowseSearchPage;
