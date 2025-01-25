import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { PersonChange, TVShowChange, MovieChange } from '@/types/types';
import { getTrendingAll } from '@/api/trends';
import { imageOriginal } from '@/Constants/Constants';
import { useNavigate } from 'react-router-dom';

const TrendingCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [trending, setTrending] = useState<
    (MovieChange | TVShowChange | PersonChange)[]
  >([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const trendingData = await getTrendingAll();
        setTrending(trendingData.results);
      } catch (error) {
        console.error('Error fetching trending data:', error);
      }
    };
    fetchTrending();
  }, []);

  const items = trending?.map((item) => ({
    id: item.id,
    title: 'title' in item ? item.title : 'name' in item ? item.name : 'N/A',
    backdropPath: item.backdrop_path || '', // Use empty string as fallback
    mediaType: 'media_type' in item ? item.media_type : 'movie', // Add mediaType
  }));

  useEffect(() => {
    if (!api) return;

    // Update the current slide index and add a listener for changes
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setPrevIndex(current); // Save the previous index
      setCurrent(api.selectedScrollSnap());
    });

    const autoScroll = () => {
      const currentIndex = api.selectedScrollSnap();
      const nextIndex = (currentIndex + 1) % items.length;
      api.scrollTo(nextIndex);
    };

    intervalRef.current = setInterval(autoScroll, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api, current, items.length]);

  const calculateTransitionType = (currentIndex: number, nextIndex: number) => {
    return Math.abs(nextIndex - currentIndex) > 1
      ? 'fast-transition'
      : 'normal-transition';
  };
  const navigate = useNavigate();
  const handleClick = (itemId: number, mediaType: string) => {
    navigate(`/${mediaType}/${itemId}`);
  };
  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        className={`w-full h-[400px] transition-all ${
          calculateTransitionType(prevIndex, current) === 'fast-transition'
            ? 'duration-0'
            : 'duration-700'
        }`}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={item.id}>
              <Card className="border-none relative">
                <CardContent className="p-0">
                  <span
                    className="text-white absolute top-4 left-4 right-0 flex space-x-2 text-2xl font-bold hover:underline hover:cursor-pointer "
                    onClick={() => handleClick(item.id, item.mediaType)}
                  >
                    {item.title}
                  </span>
                  <img
                    src={
                      item.backdropPath
                        ? imageOriginal + item.backdropPath
                        : '/placeholder.svg'
                    }
                    className="w-full h-[400px] object-cover object-[50%_25%]"
                    alt={`Slide ${index + 1}`}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? 'bg-[#8A49A6]' : 'bg-[#1C0326]/90'
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;
