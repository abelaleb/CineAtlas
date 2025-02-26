import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { image200 } from "@/Constants/Constants";
import { MovieChange } from "@/types/types";
import { Star, Clapperboard, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "./ui/sidebar";
import { Mousewheel, Pagination } from "swiper/modules";

interface ScrollableMoviesSectionProps {
  movies: MovieChange[];
}

const ScrollableMoviesSection: React.FC<ScrollableMoviesSectionProps> = ({
  movies,
}) => {
  // const { state } = useSidebar();
  // const [width, setWidth] = React.useState<string>("calc(100vw-16rem)");
  const navigate = useNavigate();

  // useEffect(() => {
  //   setWidth("calc(100vw - 4rem)");
  // }, [state]);

  const handleClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div
      className="pt-4 w-[calc(100vw-4rem)]"
      style={
        {
          // width: width,
        }
      }
    >
      <h1 className="text-2xl font-bold text-center mb-4">Trending Movies</h1>
      <Swiper
        freeMode={false}
        spaceBetween={0}
        slidesPerView="auto"
        mousewheel={true}
        modules={[Mousewheel, Pagination]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} style={{ width: "210px" }}>
            <Card
              className="hover:shadow-lg p-0 h-[390px] cursor-pointer"
              onClick={() => handleClick(movie.id)}
            >
              <CardHeader className="p-0">
                <CardTitle className="p-0 relative group">
                  {movie.poster_path ? (
                    <img
                      src={image200 + movie.poster_path}
                      alt={movie.title}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                      className="w-full h-full max-h-[350px] object-cover rounded-t-sm"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-[307px] bg-gray-200 rounded-t-xl">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                    <div className="text-white text-lg font-bold flex flex-col items-center">
                      <Star />
                      {Number.isInteger(movie.vote_average)
                        ? movie.vote_average
                        : movie.vote_average?.toFixed(1)}
                      /10
                    </div>
                    <div className="text-black text-sm bg-white bg-opacity-50 p-4 rounded-lg">
                      {movie.original_language?.toUpperCase()}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                  {movie.title}
                </div>
                <div className="flex items-center gap-1">
                  {movie.release_date && (
                    <div>{new Date(movie.release_date).getFullYear()}</div>
                  )}
                  <Clapperboard className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ScrollableMoviesSection;
