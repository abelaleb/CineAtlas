import { image200 } from "@/Constants/Constants";
import { MovieChange, TVShowChange, PersonChange } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clapperboard, Image as ImageIcon, Star, Tv2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface MovieCardProps {
  movies: MovieChange[];
}
interface TVShowCardProps {
  tvShows: TVShowChange[];
}
interface PeopleCardProps {
  people: PersonChange[];
}
const CombinedCards = ({
  items,
}: {
  items: (MovieChange | TVShowChange | PersonChange)[];
}) => {
  const movies = items.filter(
    (item) => item.media_type === "movie"
  ) as MovieChange[];
  const tvShows = items.filter(
    (item) => item.media_type === "tv"
  ) as TVShowChange[];
  const people = items.filter(
    (item) => item.media_type === "person"
  ) as PersonChange[];
  return (
    <>
      {movies.length > 0 && <MovieCards movies={movies} />}
      {tvShows.length > 0 && <TVShowCards tvShows={tvShows} />}
      {people.length > 0 && <PeopleCards people={people} />}
    </>
  );
};

const MovieCards = ({
  movies,
  className,
}: MovieCardProps & { className?: string }) => {
  const navigate = useNavigate();
  const handleClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  return (
    <div className={className}>
      {movies.map((movie) => (
        <motion.div
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          onClick={() => handleClick(movie.id)}
          className="cursor-pointer"
          key={movie.id}
        >
          <Card
            className="group p-0 h-[390px] cursor-pointer bg-transparent border-none shadow-none"
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
            <CardContent className="text-tertiary p-0 pl-1 transition-colors duration-300 group-hover:text-primary ">
              <div className=" ">{movie.title}</div>
              <div className="flex items-center gap-1">
                {movie.release_date && (
                  <div>{new Date(movie.release_date).getFullYear()}</div>
                )}
                <span>•</span>
                <Clapperboard className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
      {(!movies || movies.length === 0) && <p>No movies available.</p>}
    </div>
  );
};

const TVShowCards = ({
  tvShows,
  className,
}: TVShowCardProps & { className?: string }) => {
  const navigate = useNavigate();
  const handleClick = (tvShowId: number) => {
    navigate(`/tv/${tvShowId}`);
  };
  return (
    <div className={className}>
      {tvShows.map((tvShow) => (
        <motion.div
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          onClick={() => handleClick(tvShow.id)}
          className="cursor-pointer"
          key={tvShow.id}
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
      ))}
    </div>
  );
};

const PeopleCards = ({ people }: PeopleCardProps) => {
  const navigate = useNavigate();
  const handleClick = (personId: number) => {
    navigate(`/person/${personId}`);
  };
  return (
    <div className="flex flex-wrap justify-center gap-2 ">
      {people.map((person) => (
        <motion.div
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          onClick={() => handleClick(person.id)}
          key={person.id}
          className="cursor-pointer"
        >
          <Card
            className="group relative p-0 h-[390px] cursor-pointer bg-transparent border-none shadow-none"
            onClick={() => handleClick(person.id)}
          >
            <CardHeader className="p-0">
              {person.profile_path ? (
                <img
                  src={image200 + person.profile_path}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="w-full h-full object-cover rounded-sm"
                />
              ) : (
                <div className="flex items-center justify-center h-[301px] w-[200px] bg-gray-200 rounded-sm">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}

              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 hover:text-gray-500 hover:cursor-pointer transition-opacity duration-300 h-[302px] -top-2 w-full ">
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
      ))}
    </div>
  );
};

export { MovieCards, TVShowCards, PeopleCards, CombinedCards };
