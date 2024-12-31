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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const BrowseSearchPage = () => {
  const [query, setQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('movies');
  const [searchResults, setSearchResults] = useState<searchChange[]>([]);

  // const [page, setPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!query.trim()) return; //prevent empty search
    setLoading(true);

    try {
      let response;
      switch (searchCategory) {
        case 'movies':
          response = await search(query, 1, 'movie');
          break;
        case 'tvShows':
          response = await search(query, 1, 'tv');
          break;
        case 'people':
          response = await search(query, 1, 'person');
          break;
        default:
          response = await search(query, 1);
          break;
      }

      setSearchResults(response.results);
    } catch (err) {
      console.error('Error during search:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 p-4 justify-top items-center  pt-[68px]">
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
        {loading && <p>Loading...</p>}
        {!loading && searchResults.length > 0 && (
          <div
            className="grid grid-cols-2 gap-4 
        md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
        "
          >
            {searchResults.map((item) => (
              // <div
              //   key={item.id}
              //   className="border-r border-t p-4 rounded shadow-md"
              // >
              //   <p className="font-bold">
              //     {item.original_title || item.original_name}
              //   </p>
              //   {item.adult && <span className="text-red-500">18+</span>}
              //   {item.poster_path && (
              //     <img
              //       src={image200 + item.poster_path}
              //       alt={item.original_title || item.original_name}
              //       className="w-full h-48 object-cover rounded hover:shadow-lg"
              //     />
              //   )}
                
              //   {item.release_date && <div>{item.release_date}</div>}
              // </div>
              
            ))}
          </div>
        )}

        {!loading && searchResults.length === 0 && <p>No results found.</p>}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BrowseSearchPage;
