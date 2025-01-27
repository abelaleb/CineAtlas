// // pages/SpinPage.tsx
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Wheel } from 'react-wheel-of-prizes';
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { Skeleton } from '@/components/ui/skeleton';
// import { 
//   fetchPopularMovies,
//   fetchPopularTvShows,
//   fetchPopularPeople
// } from '@/services/api';
// import { image500 } from '@/Constants/Constants';

// type MediaType = 'movie' | 'tv' | 'person';

// const SpinPage = () => {
//   const [mediaType, setMediaType] = useState<MediaType>('movie');
//   const [items, setItems] = useState<any[]>([]);
//   const [selectedItem, setSelectedItem] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchMedia = async () => {
//       setIsLoading(true);
//       try {
//         let response;
//         switch(mediaType) {
//           case 'movie':
//             response = await fetchPopularMovies();
//             break;
//           case 'tv':
//             response = await fetchPopularTvShows();
//             break;
//           case 'person':
//             response = await fetchPopularPeople();
//             break;
//         }
//         setItems(response.results);
//       } catch (error) {
//         console.error('Error fetching media:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMedia();
//   }, [mediaType]);

//   const handleSpinEnd = (winner: string) => {
//     const selected = items.find(item => 
//       mediaType === 'person' ? item.name === winner : item.title === winner
//     );
//     setSelectedItem(selected);
//   };

//   const handleViewDetails = () => {
//     if (!selectedItem) return;
    
//     const routeMap = {
//       movie: `/movie/${selectedItem.id}`,
//       tv: `/tv/${selectedItem.id}`,
//       person: `/person/${selectedItem.id}`
//     };

//     navigate(routeMap[mediaType]);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Tabs value={mediaType} onValueChange={(value) => setMediaType(value as MediaType)}>
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="movie">Movies</TabsTrigger>
//           <TabsTrigger value="tv">TV Shows</TabsTrigger>
//           <TabsTrigger value="person">People</TabsTrigger>
//         </TabsList>
//       </Tabs>

//       <div className="flex flex-col items-center justify-center min-h-[60vh]">
//         {isLoading ? (
//           <Skeleton className="w-[300px] h-[300px] rounded-full" />
//         ) : (
//           <div className="relative my-8">
//             <Wheel
//               key={mediaType}
//               segments={items.map(item => 
//                 mediaType === 'person' ? item.name : item.title
//               )}
//               segColors={['#FF6B6B', '#4ECDC4', '#C7F464', '#FFD166']}
//               onFinished={handleSpinEnd}
//               primaryColor="#1e293b"
//               contrastColor="#ffffff"
//               buttonText="Spin"
//               size={300}
//               upDuration={100}
//               downDuration={1000}
//             />
//           </div>
//         )}

//         {selectedItem && (
//           <div className="text-center space-y-4">
//             <div className="flex flex-col items-center gap-2">
//               {selectedItem.poster_path && (
//                 <img 
//                   src={`${image500}${selectedItem.poster_path}`} 
//                   alt={mediaType === 'person' ? selectedItem.name : selectedItem.title}
//                   className="w-32 rounded-lg shadow-lg"
//                 />
//               )}
//               <h2 className="text-xl font-semibold">
//                 {mediaType === 'person' ? selectedItem.name : selectedItem.title}
//               </h2>
//             </div>
//             <Button onClick={handleViewDetails}>
//               View {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} Details
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


const SpinPage = () => {
  return (
    <div>SpinPage</div>
  )
}

export default SpinPage
// export default SpinPage;