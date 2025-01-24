import { TVShowChange, TvShowCredits, TVShowDetails } from '@/types/types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { image200, imageOriginal } from '@/Constants/Constants';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TVShowCards } from '@/components/Cards';
import {
  fetchTvShowDetails,
  fetchSimilarTvShows,
  fetchTvShowCredits,
} from '@/api/tvShows';

const TvShowDetailsPage = () => {
  const [tvShowDetails, setTvShowDetails] = useState<TVShowDetails | null>(
    null
  );
  const [similarTvShows, setSimilarTvShows] = useState<TVShowChange[]>([]);
  const [tvShowCredits, setTvShowCredits] = useState<TvShowCredits[]>([]);
  const { series_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (series_id) {
        const details = await fetchTvShowDetails(Number(series_id));
        const similar = await fetchSimilarTvShows(Number(series_id));
        const credits = await fetchTvShowCredits(Number(series_id));
        setTvShowDetails(details);
        setSimilarTvShows(similar.results);
        setTvShowCredits(credits.cast);
      }
    };

    fetchData().catch((err) =>
      console.error('Error fetching tv show details:', err)
    );
  }, [series_id]);

  return (
    <div className="flex flex-col h-full w-full pt-[68px]">
      {tvShowDetails ? (
        <div className="flex flex-col items-center justify-center ">
          <div className="flex h-[70vh] w-full items-center justify-center relative ">
            <img
              src={imageOriginal + tvShowDetails?.backdrop_path}
              alt={tvShowDetails?.original_name}
              className="h-full w-auto object-cover overflow-hidden relative z-10 "
            />
            <div
              className="absolute inset-0 bg-cover bg-center blur-sm w-full "
              style={{
                backgroundImage: `url(${
                  image200 + tvShowDetails?.backdrop_path
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
                        tvShowDetails?.poster_path
                          ? image200 + tvShowDetails.poster_path
                          : ''
                      }
                      className="w-[207px] h-[307px] relative rounded-xl p-1"
                      alt="TV Show Poster"
                    />
                    <div className="flex flex-col gap-4">
                      <div className="text-4xl font-bold">
                        {tvShowDetails?.name || tvShowDetails?.original_name}
                      </div>
                      <div className="py-4 font-normal">
                        {tvShowDetails?.overview}
                      </div>

                      <div className="grid grid-cols-2 justify-start">
                        <div className="col-span-1 flex flex-col gap-1">
                          <div className="font-normal">
                            <span className="font-bold">Released: </span>
                            {tvShowDetails?.first_air_date &&
                              format(
                                new Date(tvShowDetails.first_air_date),
                                'MMM dd, yyyy'
                              )}
                          </div>
                          <div className="font-normal">
                            <span className="font-bold">Genre: </span>
                            {tvShowDetails?.genres?.map((item, index) => (
                              <span key={item.id}>
                                {`${item.name}${
                                  index !== tvShowDetails.genres.length - 1
                                    ? ', '
                                    : ' .'
                                }`}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <div className="font-normal">
                            <span className="font-bold">Episodes: </span>
                            {tvShowDetails?.number_of_episodes}
                          </div>

                          <div className="font-normal">
                            <span className="font-bold">Productions: </span>
                            {tvShowDetails?.production_companies?.map(
                              (item, index) => (
                                <span key={item.id}>
                                  {`${item.name}${
                                    index !==
                                    tvShowDetails.production_companies.length -
                                      1
                                      ? ', '
                                      : ' .'
                                  }`}
                                </span>
                              )
                            )}
                          </div>
                          <div>
                            <span className="font-bold">Cast: </span>
                            {tvShowCredits.slice(0, 4).map((cast, index) => (
                              <Link
                                to={`/person/${cast.id}`}
                                key={cast.id}
                                className="text-blue-500 hover:text-blue-950"
                              >
                                {cast.name}
                                {index < 3 ? ', ' : '.'}
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
      <div className="w-[calc(100vw-4rem)]">
        <TVShowCards tvShows={similarTvShows} />
      </div>
    </div>
  );
};

export default TvShowDetailsPage;
