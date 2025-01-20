// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { search } from '@/api/search';
// import { getTrendingAll } from '@/api/trends';
// import { getTrendingMovies, fetchFilteredMovies } from '@/api/movies';
// import {
//   MovieChange,
//   PersonChange,
//   searchChange,
//   TVShowChange,
// } from '@/types/types';
// import { useState } from 'react';
// // import { image200 } from '@/Constants/Constants';
// import SelectScrollable from '@/components/SelectScrollable';

// import { orderOptions, genreOptions } from '@/Constants/dropdownOptions';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import DynamicCard from '@/components/DynamicCard';

// const BrowseSearchPage = () => {
//   const [query, setQuery] = useState<string>('');
//   const [searchCategory, setSearchCategory] = useState<string>('all');
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [sortBy, setSortBy] = useState<string>('popularity.desc');
//   const [genreId, setGenreId] = useState<number>(28); //defaults to action genre

//   //Using React Query to fetch movies
//   // const { data, isLoading, isError } = useQuery(
//   //   ['filteredMovies', { page: currentPage, sortBy, genreId }],
//   //   () => fetchFilteredMovies({ page: currentPage, sortBy, genreId }),
//   //   { keepPreviousData: true }
//   // );
//   const handleSearch = () => {
//     setCurrentPage(1);
//   };
//   const handleGenreChange = (value: string) => {
//     setGenreId(Number(value));
//     setCurrentPage(1);
//   };
//   const handleSortChange = (value: string) => {
//     setSortBy(value);
//     setCurrentPage(1);
//   };

//   const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//  return(
//   <div className="flex flex-col w-full h-[100%] gap-4 p-4 justify-top items-center pt-[68px]">
//       <div className="flex justify-center items-center w-3/4 pt-10 gap-4">
//         <div>Search Items:</div>
//         <SelectScrollable
//           placeholder="Select category"
//           options={[
//             { value: 'all', label: 'All' },
//             { value: 'movies', label: 'Movies' },
//             { value: 'tvShows', label: 'Tv Shows' },
//             { value: 'people', label: 'People' },
//           ]}
//           onValueChange={setSearchCategory}
//         />
//         <div className="flex gap-4">
//           <Input
//             type="text"
//             placeholder={`Search ${searchCategory}...`}
//             onChange={(e) => setQuery(e.target.value)}
//             onKeyDown={handleKeyPress}
//             style={{ width: '300px', height: '32px' }}
//           />
//           <Button onClick={handleSearch} disabled={isLoading}>
//             {isLoading ? 'Searching...' : 'Search'}
//           </Button>
//         </div>
//       </div>

//       <div className="flex w-full gap-4 p-4 justify-center items-center">
//         <div className="p-4 rounded-md">
//           <h2 className="font-semibold mb-2">Genre:</h2>
//           <SelectScrollable
//             placeholder="Select genre"
//             options={genreOptions}
//             onValueChange={handleGenreChange}
//           />
//         </div>
//         <div className="p-4 rounded-md">
//           <h2 className="font-semibold mb-2">Ordered by:</h2>
//           <SelectScrollable
//             placeholder="Select order"
//             options={orderOptions}
//             onValueChange={handleSortChange}
//           />
//         </div>
//       </div>

//       <div className="w-full p-4">
//         {isLoading && <div>Loading...</div>}
//         {isError && <div>Error fetching data</div>}
//         {/* {data && (
//           <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
//             {data.map((item: unknown) => (
//               <DynamicCard key={item.id} mediaType={item.media_type} data={item} />
//             ))}
//           </div>
//         )} */}
//       </div>
//     </div>
//  )
// };
const BrowseSearchPage = () => {
  return 'nothing here';
};

export default BrowseSearchPage;
