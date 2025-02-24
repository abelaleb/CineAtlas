import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { getTrendingAll } from "@/api/trends";
import { imageOriginal } from "@/Constants/Constants";
import { useNavigate } from "react-router-dom";
import {
  MovieChange,
  PersonChange,
  searchChange,
  TVShowChange,
} from "@/types/types";
import { ImageOff } from "lucide-react";

const TrendingCarousel = () => {
  const [trending, setTrending] = useState<
    (MovieChange | TVShowChange | PersonChange | searchChange)[]
  >([]);
  const [current, setCurrent] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const trendingData = await getTrendingAll();
        setTrending(trendingData.results);
        console.log(trending);
      } catch (error) {
        console.error("Error fetching trending data:", error);
      }
    };
    fetchTrending();
  }, []);

  const items = trending.map((item) => ({
    id: item.id,
    title: "title" in item ? item.title : "name" in item ? item.name : "N/A",
    backdropPath: item.backdrop_path || "",
    mediaType: "media_type" in item ? item.media_type : "tv",
  }));

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const handleClick = (itemId: number, mediaType: string) => {
    navigate(`/${mediaType}/${itemId}`);
  };

  return (
    <div className="relative w-full overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {items.map((item, index) => (
          <div className="flex-shrink-0 w-full" key={item.id}>
            <Card className="border-none relative">
              <CardContent className="p-0">
                <span
                  className="text-white absolute top-4 left-4 text-2xl font-bold hover:underline cursor-pointer"
                  onClick={() => handleClick(item.id, item.mediaType)}
                >
                  {item.title}
                </span>
                {item.backdropPath ? (
                  <img
                    src={
                      item.backdropPath
                        ? imageOriginal + item.backdropPath
                        : "/placeholder.svg"
                    }
                    className="w-full h-[400px] object-cover object-center"
                    alt={`Slide ${index + 1}`}
                  />
                ) : (
                  <div className="w-full h-[400px] flex items-center justify-center bg-gray-900">
                    <ImageOff className="text-gray-500 w-16 h-16" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-[#8A49A6]" : "bg-[#1C0326]/90"
            }`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;
