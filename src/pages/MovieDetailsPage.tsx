import { useEffect, useState } from "react";
import { MovieChange, MovieCreditDetials, MovieDetails } from "@/types/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { image200, imageOriginal } from "@/Constants/Constants";
import { format } from "date-fns";
import { useParams, Link } from "react-router-dom";
import { MovieCards } from "@/components/Cards";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
} from "@/api/movies";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<MovieChange[]>([]);
  const [movieCredits, setMovieCredits] = useState<MovieCreditDetials[]>([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (movieId) {
        const details = await fetchMovieDetails(Number(movieId));
        const similar = await fetchSimilarMovies(Number(movieId));
        const credits = await fetchMovieCredits(Number(movieId));
        setMovieDetails(details);
        setSimilarMovies(similar.results);
        setMovieCredits(credits.cast);
      }
    };
    fetchData().catch((err) =>
      console.error("Error fetching movie details:", err)
    );
  }, [movieId]);

  return (
    <div className="flex flex-col  w-full h-full py-4 md:py-6 lg:py-8">
      {movieDetails ? (
        <div className="flex flex-col items-center justify-center ">
          <div className="flex h-[70vh] w-full items-center justify-center relative">
            <img
              src={imageOriginal + movieDetails.backdrop_path}
              alt={movieDetails.original_title}
              className="h-full w-auto object-cover overflow-hidden relative z-10 "
            />
            <div
              className="absolute inset-0 bg-cover bg-center blur-sm w-full "
              style={{
                backgroundImage: `url(${
                  image200 + movieDetails.backdrop_path
                })`,
              }}
            ></div>
          </div>
          <div className="flex flex-col m-8 rounded-lg w-3/4 relative -mt-40 z-20">
            <Card className="p-4 hover:shadow-lg">
              <CardContent>
                <CardHeader>
                  <div className="flex justify-center items-top gap-4">
                    <img
                      src={
                        movieDetails.poster_path
                          ? image200 + movieDetails.poster_path
                          : ""
                      }
                      className="w-[207px] h-[307px]  relative rounded-xl p-1"
                    />
                    <div className="flex flex-col gap-4">
                      <div className="text-4xl font-bold">
                        {movieDetails.title}
                      </div>
                      <div className="py-4 font-normal">
                        {movieDetails.overview}
                      </div>

                      <div className="grid grid-cols-2 justify-start">
                        <div className="col-span-1 flex flex-col gap-1">
                          <div className="font-normal">
                            <span className="font-bold">Released: </span>
                            {movieDetails.release_date &&
                              format(
                                new Date(movieDetails.release_date),
                                "MMM dd, yyyy"
                              )}
                          </div>
                          <div className="font-normal">
                            <span className="font-bold">Genre: </span>
                            {movieDetails.genres.map((item, index) => (
                              <span key={item.id}>
                                {`${item.name}${
                                  index != movieDetails.genres.length - 1
                                    ? ", "
                                    : "  ."
                                }`}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <div className="font-normal">
                            <span className="font-bold">Duration: </span>
                            {movieDetails.runtime}
                          </div>

                          <div className="font-normal">
                            <span className="font-bold">Productions: </span>
                            {movieDetails.production_companies.map(
                              (item, index) => (
                                <span key={item.id}>
                                  {`${item.name}${
                                    index !=
                                    movieDetails.production_companies.length - 1
                                      ? ", "
                                      : "  ."
                                  }`}
                                </span>
                              )
                            )}
                          </div>
                          <div>
                            <span className="font-bold">Cast: </span>
                            {movieCredits.slice(0, 4).map((cast, index) => (
                              <Link
                                to={`/person/${cast.id}`}
                                key={cast.id}
                                className="text-blue-700 hover:text-blue-950"
                              >
                                {cast.name}
                                {index < 3 ? ", " : "."}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="w-[calc(100vw-5rem)]">
        <MovieCards
          movies={similarMovies}
          className={`grid justify-center items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 p-4 gap-2`}
        />
      </div>
    </div>
  );
};
export default MovieDetailsPage;
