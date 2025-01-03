import { MovieChange, MovieDetails } from '@/api/tmdb';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { image200, imageOriginal } from '@/Constants/Constants';
import { ImageIcon, Star } from 'lucide-react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieCards } from '@/components/Cards';

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<MovieChange[]>([]);
  const { movieId } = useParams();

  const fetchMovieDetails = async (movie_id: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=191783ac620b958fd36edd0301a0ecd6`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const details = await response.json();
      setMovieDetails(details);
      console.log('MovieDetail:', details);
    } catch (err) {
      console.error('Error fetching movie details:', err);
    }
  };
  const fetchSimilarMovies = async (movie_id: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=191783ac620b958fd36edd0301a0ecd6`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const details = await response.json();
      setSimilarMovies(details.results);
      console.log('Similar Movies: ', details);
    } catch (err) {
      console.error('Error fetching similar movies:', err);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(Number(movieId));
      fetchSimilarMovies(Number(movieId));
    }
    console.log('movieDetails', movieDetails);
  }, [movieId]);

  return (
    <div className="flex flex-col w-full h-full pt-[68px]">
      {movieDetails ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex h-[70vh] w-screen items-center justify-center relative">
            <img
              src={imageOriginal + movieDetails.backdrop_path}
              alt={movieDetails.original_title}
              className="h-full w-auto object-cover overflow-hidden relative z-10"
            />
            <div
              className="absolute inset-0 bg-cover bg-center blur-sm"
              style={{
                backgroundImage: `url(${imageOriginal + movieDetails.backdrop_path})`,
              }}
            ></div>
          </div>
          <div className="text-4xl font-bold">{movieDetails.title}</div>
          
          <div className="text-lg">{movieDetails.tagline}</div>
          <div className="text-xl font-semibold">Overview</div>
          <div>{movieDetails.overview}</div>
          <div>
            <Card className="hover:shadow-lg p-0 h-[390px] w-[210px]">
              <CardHeader className="p-0">
                <CardTitle className="p-0 relative group">
                  <img
                    src={
                      movieDetails.poster_path
                        ? image200 + movieDetails.poster_path
                        : ''
                    }
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                    className="w-[100%] h-[100%] max-h-[350px] overflow-hidden relative rounded-t-xl p-1"
                  />
                  {!movieDetails.poster_path && (
                    <div className="flex items-center justify-center h-[307px] bg-gray-200 rounded-t-xl">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 hover:text-gray-500 hover:cursor-pointer transition-opacity duration-300 rounded-t-lg">
                    <div className="text-white text-lg font-bold self-center flex flex-col items-center">
                      <div>
                        <Star />
                      </div>
                      {Number.isInteger(movieDetails.vote_average)
                        ? movieDetails.vote_average
                        : movieDetails.vote_average.toFixed(1)}
                      /10
                    </div>
                    <div className="text-black text-sm bg-white bg-opacity-50 p-4 rounded-lg">
                      {movieDetails.original_language}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap hover:text-gray-500 hover:cursor-pointer ">
                  {movieDetails.original_title}
                </div>
                <div>
                  {movieDetails.release_date && (
                    <div>
                      {format(new Date(movieDetails.release_date), ' yyyy')}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex flex-col items-center justify-center">
        <MovieCards movies={similarMovies} />
      </div>
    </div>
  );
};
export default MovieDetailsPage;
{
  /*backdrop_path: "/uWOJbarUXfVf6B4o0368dh138eR.jpg"
budget: 50000000
genres: (2) [{…}, {…}]
homepage: "https://www.focusfeatures.com/nosferatu"
id: 426063
imdb_id: "tt5040012"
origin_country: ['US']
original_language: "en"
original_title: "Nosferatu"
overview: "A gothic tale of obsession between a haunted young woman and the terrifying vampire infatuated with her, causing untold horror in its wake."
popularity: 755.116
poster_path: "/5qGIxdEO841C0tdY8vOdLoRVrr0.jpg"
production_companies: (4) [{…}, {…}, {…}, {…}]
production_countries: [{…}]
release_date: "2024-12-25"
revenue: 51234020
runtime: 132
spoken_languages: (5) [{…}, {…}, {…}, {…}, {…}]
status: "Released"
tagline: "Succumb to the darkness."
title: "Nosferatu"
video: false
vote_average: 6.608
vote_count: 208 */
}
