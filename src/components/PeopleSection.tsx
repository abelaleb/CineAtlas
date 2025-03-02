import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PersonChange } from "@/types/types";
import { image200 } from "@/Constants/Constants";
import { ImageIcon, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "./ui/card";
import { motion } from "framer-motion";

interface PeopleSectionProps {
  people: PersonChange[];
}

const PeopleSection: React.FC<PeopleSectionProps> = ({ people }) => {
  const navigate = useNavigate();
  const handleClick = (personId: number) => {
    navigate(`/person/${personId}`);
  };
  return (
    <div className="pt-4 text-text dark:text-primary">
      <h1 className="text-2xl font-bold text-start mb-4">Trending People</h1>
      <Swiper freeMode={false} spaceBetween={8} slidesPerView="auto">
        {people.map((person) => (
          <SwiperSlide key={person.id} style={{ width: "210px" }}>
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              onClick={() => handleClick(person.id)}
              className="cursor-pointer"
            >
              <Card
                className="group relative p-0 h-[390px] cursor-pointer bg-transparent border-none shadow-none"
                onClick={() => handleClick(person.id)}
              >
                <CardHeader className="p-0">
                  {person.profile_path && <img
                    src={
                      person.profile_path ? image200 + person.profile_path : ""
                    }
                    onError={(e) => (e.currentTarget.style.display = "none")}
                    className="w-full h-full object-cover rounded-sm"
                  />}
                  {!person.profile_path && (
                    <div className="flex items-center justify-center h-[315px] bg-gray-200 rounded-sm">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 hover:text-gray-500 hover:cursor-pointer transition-opacity duration-300 h-[310px] -top-1">
                    <div className="text-white text-lg font-bold self-center flex flex-col items-center">
                      <div>
                        <Star />
                      </div>
                      {person.known_for_department}
                    </div>
                    <div className="text-black text-sm bg-white bg-opacity-50 p-4 rounded-lg">
                      {person.gender}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-tertiary p-0 pl-1 transition-colors duration-300 group-hover:text-primary">
                  <div className="text-tertiary p-0 transition-colors duration-300 group-hover:text-primary pt-1">
                    {person.name}
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

export default PeopleSection;
