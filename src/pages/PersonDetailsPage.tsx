import { MovieChange, PersonalDetails, TVShowChange } from '@/types/types';
import { imageOriginal } from '@/Constants/Constants';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPersonCredits, fetchPersonDetails } from '@/api/people';
import DynamicCard from '@/components/DynamicCard';

const PersonDetailsPage = () => {
  const [personDetails, setPersonDetails] = useState<PersonalDetails | null>(
    null
  );
  const [creditsResponse, setCreditsResponse] = useState<
    MovieChange[] | TVShowChange[]
  >([]);

  const { personId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (personId) {
        try {
          const details = await fetchPersonDetails(Number(personId));
          const credits = await fetchPersonCredits(Number(personId));

          setPersonDetails(details);
          setCreditsResponse(credits.cast); // Assuming `cast` is an array of movies
        } catch (err) {
          console.error('Error fetching person details:', err);
        }
      }
    };

    fetchData();
  }, [personId]);

  return (
    <div className="w-full h-full pt-[68px]">
      {personDetails ? (
        <div>
          <div className="flex justify-center items-start">
            <div
              style={{
                backgroundImage: `url(${
                  imageOriginal + personDetails.profile_path
                })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="min-h-[400px] min-w-[300px] w-[30vw] h-[70vh] flex flex-col justify-center items-center m-4 rounded-lg"
            ></div>
            <div className="flex flex-col justify-start items-start p-4 gap-4">
              <div className="font-black text-2xl flex py-4">
                {personDetails.name}
              </div>
              <div className="font-semibold flex justify-start">
                {personDetails.birthday &&
                  format(new Date(personDetails.birthday), 'MMMM dd, yyyy')}
              </div>
              <div className="w-1/2">{personDetails.biography}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {creditsResponse.length > 0 ? (
        <div className="flex flex-wrap gap-8 p-4 justify-center">
          {creditsResponse.map((credit) => (
            <DynamicCard key={credit.id} mediaType="movie" data={credit} />
          ))}
        </div>
      ) : (
        <div>Loading person credits...</div>
      )}
    </div>
  );
};

export default PersonDetailsPage;
