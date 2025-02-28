import { image200 } from "@/Constants/Constants";
import { MovieChange, TVShowChange, PersonChange } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clapperboard, Image as ImageIcon, Star, Tv } from "lucide-react";
import { format } from "date-fns/format";
import { useNavigate } from "react-router-dom";

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
    <div className={`${className}`}>
        {movies?.map((movie) => (
          <Card
            key={movie.id}
            className="flex-shrink-0 w-[210px] hover:shadow-lg p-0 h-[390px] hover:cursor-pointer"
            onClick={() => handleClick(movie.id)}
          >
            <CardHeader className="p-0">
              <CardTitle className="p-0 relative group">
                <img
                  src={movie.poster_path ? image200 + movie.poster_path : ""}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  className="w-[100%] h-[100%] max-h-[350px] overflow-hidden relative rounded-t-sm "
                />
                {!movie.poster_path && (
                  <div className="flex items-center justify-center h-[307px] bg-gray-200 rounded-t-xl">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 hover:text-gray-500 hover:cursor-pointer transition-opacity duration-300 rounded-t-lg">
                  <div className="text-white text-lg font-bold self-center flex flex-col items-center">
                    <div>
                      <Star />
                    </div>
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
              <div className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:text-gray-500 hover:cursor-pointer ">
                {movie.title}
              </div>
              <div className="flex items-center gap-1">
                {movie.release_date && (
                  <div>{format(new Date(movie.release_date), " yyyy")}</div>
                )}
                .
                <Clapperboard className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}
        {(!movies || movies.length === 0) && <p>No movies available.</p>}
      </div>
  );
};

const TVShowCards = ({ tvShows,className}: TVShowCardProps & {className?: string}) => {
  const navigate = useNavigate();
  const handleClick = (tvShowId: number) => {
    navigate(`/tv/${tvShowId}`);
  };
  return (
    <div className={className}>
      {tvShows?.map((tvShow) => (
        <Card
          key={tvShow.id}
          className="hover:shadow-lg p-0 h-[390px] w-[210px] hover:cursor-pointer"
          onClick={() => handleClick(tvShow.id)}
        >
          <CardHeader className="p-0">
            <CardTitle className="p-0 relative group">
              <img
                src={tvShow.poster_path ? image200 + tvShow.poster_path : ""}
                onError={(e) => (e.currentTarget.style.display = "none")}
                className="w-[100%] h-[100%] max-h-[350px] overflow-hidden relative rounded-t-xl "
              />
              {!tvShow.poster_path && (
                <div className="flex items-center justify-center h-[307px] bg-gray-200 rounded-t-xl">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 hover:text-gray-500 hover:cursor-pointer transition-opacity duration-300 rounded-t-lg">
                <div className="text-white text-lg font-bold self-center flex flex-col items-center">
                  <div>
                    <Star />
                  </div>
                  {Number.isInteger(tvShow.vote_average)
                    ? tvShow.vote_average
                    : tvShow.vote_average?.toFixed(1)}
                  /10
                </div>
                <div className="text-black text-sm bg-white bg-opacity-50 p-4 rounded-lg">
                  {tvShow.original_language}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className=" text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:text-gray-500 hover:cursor-pointer">
              {tvShow.name}
            </div>
            <div className="flex items-center gap-1">
              {tvShow.first_air_date && (
                <div>{format(new Date(tvShow.first_air_date), " yyyy")}</div>
              )}
              .
              <Tv className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
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
      {people?.map((person) => (
        <Card
          key={person.id}
          // className="shadow-xl items-center p-4 hover:cursor-pointer hover:shadow-lg "
          className="hover:shadow-lg p-0 h-[290px] w-[210px] hover:cursor-pointer border-2 border-gray-50"
          onClick={() => handleClick(person.id)}
        >
          <CardHeader className="p-0 group rounded-full relative">
            <div className="w-[200px] h-[200px] overflow-hidden relative m-1 flex items-center justify-center bg-gray-200 ">
              <img
                src={person.profile_path ? image200 + person.profile_path : ""}
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
      ))}
    </div>
  );
};

export { MovieCards, TVShowCards, PeopleCards, CombinedCards };
