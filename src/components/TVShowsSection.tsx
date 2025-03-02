import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { image200 } from "@/Constants/Constants";
import { TVShowChange } from "@/types/types";
import { Star, Image as ImageIcon, Tv2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface TvShowProps {
  tvShows: TVShowChange[];
}

const TVShowsSection: React.FC<TvShowProps> = ({ tvShows }) => {
  const navigate = useNavigate();
  const handleClick = (tvId: number) => {
    navigate(`/tv/${tvId}`);
  };

  return (
    <div className="pt-4 text-text dark:text-primary">
      <h1 className="text-2xl font-bold text-start mb-4">Trending Tv Shows</h1>
      <Swiper freeMode={false} spaceBetween={8} slidesPerView="auto">
        {tvShows.map((tvShow) => (
          <SwiperSlide key={tvShow.id} style={{ width: "210px" }}>
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              onClick={() => handleClick(tvShow.id)}
              className="cursor-pointer"
            >
              <Card
                className="group p-0 h-[390px] cursor-pointer bg-transparent border-none shadow-none"
                onClick={() => handleClick(tvShow.id)}
              >
                <CardHeader className="p-0">
                  <CardTitle className="p-0 relative group">
                    {tvShow.poster_path ? (
                      <img
                        src={image200 + tvShow.poster_path}
                        alt={tvShow.title}
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                        className="w-full h-full max-h-[350px] object-cover rounded-t-sm"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-[307px] bg-gray-200 rounded-sm">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                      <div className="text-white text-lg font-bold flex flex-col items-center">
                        <Star />
                        {Number.isInteger(tvShow.vote_average)
                          ? tvShow.vote_average
                          : tvShow.vote_average?.toFixed(1)}
                        /10
                      </div>
                      <div className="text-black text-sm bg-white bg-opacity-50 p-4 rounded-lg">
                        {tvShow.original_language?.toUpperCase()}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-tertiary p-0 pl-1 transition-colors duration-300 group-hover:text-primary">
                  <div className="text-tertiary p-0 transition-colors duration-300 group-hover:text-primary">
                    {tvShow.name}
                  </div>
                  <div className="flex items-center gap-1">
                    {tvShow.first_air_date && (
                      <div>{new Date(tvShow.first_air_date).getFullYear()}</div>
                    )}{" "}
                    <span>•</span>
                    <Tv2Icon className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TVShowsSection;
