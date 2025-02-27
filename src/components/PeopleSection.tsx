import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PersonChange } from "@/types/types";
import { image200 } from "@/Constants/Constants";
import { ImageIcon, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "./ui/card";

interface PeopleSectionProps {
  people: PersonChange[];
}

const PeopleSection: React.FC<PeopleSectionProps> = ({ people }) => {
  const navigate = useNavigate();
  const handleClick = (personId: number) => {
    navigate(`/person/${personId}`);
  };
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold text-start pl-10 m-4">
        Trending People
      </h1>
      <Swiper freeMode={false} spaceBetween={8} slidesPerView="auto">
        {people.map((person) => (
          <SwiperSlide key={person.id} style={{ width: "210px" }}>
            <Card
              className="hover:shadow-lg p-0 h-[290px] w-full  hover:cursor-pointer border-2 border-gray-50"
              onClick={() => handleClick(person.id)}
            >
              <CardHeader className="p-0 ">
                <div className="w-[200px] h-[200px] overflow-hidden relative m-1 flex items-center justify-center bg-gray-200 ">
                  <img
                    src={
                      person.profile_path ? image200 + person.profile_path : ""
                    }
                    onError={(e) => (e.currentTarget.style.display = "none")}
                    className="w-full h-full object-cover "
                  />
                  {!person.profile_path && (
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 hover:text-gray-500 hover:cursor-pointer transition-opacity duration-300 ">
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
              <CardContent className="flex flex-col items-center mt-4">
                <div className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:text-gray-500 hover:cursor-pointer text-center">
                  {person.name}
                </div>
                <div>{person.known_for_department}</div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PeopleSection;
