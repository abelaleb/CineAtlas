import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
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
import Spinner from "../Spinner";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const TrendingCarousel = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [trending, setTrending] = useState<
    (MovieChange | TVShowChange | PersonChange | searchChange)[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const trendingData = await getTrendingAll();
        setTrending(trendingData.results);
      } catch (error) {
        console.error("Error fetching trending data:", error);
      } finally {
        setLoading(false);
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

  const handleClick = (itemId: number, mediaType: string) => {
    navigate(`/${mediaType}/${itemId}`);
  };

  if (loading) return <Spinner />;

  return (
    <div className="relative overflow-hidden w-full h-[400px] dark:bg-gradient-to-br bg-[#e1c1eb] dark:from-[#1a1a2e] dark:via-[#231b32] dark:to-[#1f1f2f]">
      <Swiper
        slidesPerView="auto"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id}>
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
                    src={imageOriginal + item.backdropPath}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingCarousel;
