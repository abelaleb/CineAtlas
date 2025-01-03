import { image200 } from '@/Constants/Constants';
import { MovieChange, TVShowChange, PersonChange } from '@/api/tmdb';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ImageIcon, Star } from 'lucide-react';
import { format } from 'date-fns/format';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const handleClick = (movieId: number) => {
    console.log('movieId', movieId);
    
    navigate(`/movie/${movieId}`);
  };
  return (
    <div className="flex flex-wrap gap-8 p-4 justify-center">
      {movies?.map((movie) => (
        <Card
          key={movie.id}
          className="hover:shadow-lg p-0 h-[390px] w-[210px]"
        >
          <CardHeader className="p-0">
            <CardTitle className="p-0 relative group">
              <img
                src={movie.poster_path ? image200 + movie.poster_path : ''}
                onError={(e) => (e.currentTarget.style.display = 'none')}
                className="w-[100%] h-[100%] max-h-[350px] overflow-hidden relative rounded-t-xl p-1"
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
                    : movie.vote_average.toFixed(1)}
                  /10
                </div>
                <div className="text-black text-sm bg-white bg-opacity-50 p-4 rounded-lg">
                  {movie.original_language}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onClick={() => handleClick(movie.id)}
              className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:text-gray-500 hover:cursor-pointer "
            >
              {movie.original_title}
            </div>
            <div>
              {movie.release_date && (
                <div>{format(new Date(movie.release_date), ' yyyy')}</div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const TVShowCards = ({ tvShows }: TVShowCardProps) => {
  return (
    <div className="flex flex-wrap gap-8 p-4 justify-center">
      {tvShows?.map((tvShow) => (
        <Card
          key={tvShow.id}
          className="hover:shadow-lg p-0 h-[390px] w-[210px]"
        >
          <CardHeader className="p-0">
            <CardTitle className="p-0 relative group">
              <img
                src={tvShow.poster_path ? image200 + tvShow.poster_path : ''}
                onError={(e) => (e.currentTarget.style.display = 'none')}
                className="w-[100%] h-[100%] max-h-[350px] overflow-hidden relative rounded-t-xl p-1"
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
                    : tvShow.vote_average.toFixed(1)}
                  /10
                </div>
                <div className="text-black text-sm bg-white bg-opacity-50 p-4 rounded-lg">
                  {tvShow.original_language}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:text-gray-500 hover:cursor-pointer">
              {tvShow.original_name}
            </div>
            <div>
              {tvShow.first_air_date && (
                <div>{format(new Date(tvShow.first_air_date), ' yyyy')}</div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const PeopleCards = ({ people }: PeopleCardProps) => {
  return (
    <div className="flex flex-wrap gap-8 p-4 justify-center">
      {people?.map((person) => (
        <Card
          key={person.id}
          className="hover:shadow-lg p-0 h-[390px] w-[210px]"
        >
          <CardHeader className="p-0">
            <CardTitle className="p-0 relative group">
              <img
                src={person.profile_path ? image200 + person.profile_path : ''}
                onError={(e) => (e.currentTarget.style.display = 'none')}
                className="w-[100%] h-[100%] max-h-[350px] overflow-hidden relative rounded-t-xl p-1"
              />
              {!person.profile_path && (
                <div className="flex items-center justify-center h-[307px] bg-gray-200 rounded-t-xl p-1">
                  <ImageIcon className="w-16 h-16 max-h-[350px] text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 hover:text-gray-500 hover:cursor-pointer transition-opacity duration-300 rounded-t-lg">
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
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:text-gray-500 hover:cursor-pointer">
              {person.original_name}
            </div>
            <div>{person.media_type}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export { MovieCards, TVShowCards, PeopleCards };
