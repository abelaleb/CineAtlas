import { image200 } from '@/Constants/Constants';
import { MovieChange, TVShowChange, PersonChange } from '@/api/tmdb';

interface MovieCardProps {
  movies: MovieChange[];
}
interface TVShowCardProps {
  tvShows: TVShowChange[];
}
interface PeopleCardProps {
  people: PersonChange[];
}

const MovieCards = ({ movies }: MovieCardProps) => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {movies?.map((movie) => (
        <div
          // onClick={() => {
          //   // navigate(`/${type}/` + movie.id);
          // }}
          key={movie.id}
          className="w-[calc(20%-1rem)] rounded-lg border cursor-pointer"
        >
          <img
            src={image200 + movie.poster_path}
            className="w-full rounded-t-lg"
          />
          {
            <div className="p-2">
              <h1 className="font-medium truncate text-sm line-clamp-2">
                {movie.original_title || movie.original_name}
              </h1>
            </div>
          }
        </div>
      ))}
    </div>
  );
};

const TVShowCards = ({ tvShows }: TVShowCardProps) => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {tvShows?.map((tvShow) => (
        <div
          key={tvShow.id}
          className="w-[calc(20%-1rem)] rounded-lg border cursor-pointer"
        >
          <img
            src={image200 + tvShow.poster_path}
            className="w-full rounded-t-lg"
          />
          {
            <div className="p-2">
              <h1 className="font-medium truncate text-sm line-clamp-2">
                {tvShow.original_name}
              </h1>
            </div>
          }
        </div>
      ))}
    </div>
  );
};
const PeopleCards = ({ people }: PeopleCardProps) => {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {people?.map((person) => (
        <div
          key={person.id}
          className="w-[calc(20%-1rem)] rounded-lg border cursor-pointer"
        >
          <img
            src={image200 + person.profile_path}
            className="w-full rounded-t-lg"
          />
          <div className="p-2">
            <h1 className="font-medium truncate text-sm line-clamp-2">
              {person.name}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};
export { MovieCards, TVShowCards, PeopleCards };
