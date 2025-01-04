import {  PersonalDetails, CreditsResponse } from '@/types/types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { image200, imageOriginal } from '@/Constants/Constants';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CombinedCards } from '@/components/Cards';
import { fetchCredits, fetchPersonDetails } from '@/api/tmdb';

const PersonDetailsPage = () => {
  const [personDetails, setPersonDetails] = useState<PersonalDetails | null>(
    null
  );
  const [creditsResponse, setCreditsResponse] = useState<CreditsResponse[]>([]);
  const { personId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (personId) {
        const details = await fetchPersonDetails(Number(personId));
        const credits = await fetchCredits(Number(personId));
        setPersonDetails(details);
        setCreditsResponse(credits.cast);
      }
    };

    fetchData().catch((err) =>
      console.error('Error fetching person details:', err)
    );
  }, [personId]);
  return (
    <div className="w-full h-full  pt-[68px]">
      {personDetails ? (
        <div>
          <div className="flex  justify-center items-start ">
            <div
              style={{
                backgroundImage: `url(${
                  imageOriginal + personDetails.profile_path
                })`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="h-[80vh] w-[80vw]  flex flex-col justify-center items-center m-4 rounded-lg"
            ></div>
            <div className="flex flex-col justify-start items-start p-4 gap-4">
              <div className="font-black text-2xl flex py-4 ">
                {personDetails.name}
              </div>
              <div className="font-semibold flex justify-start">
                {personDetails.birthday &&
                  format(new Date(personDetails.birthday), 'MMMM dd, yyyy')}
              </div>
              <div></div>
              <div className="w-1/2">{personDetails.biography}</div>
              <div className="flex flex-col justify-start items-start gap-4">
                <div className="font-bold">
                  Movie Credits
                  <span></span>
                </div>
              </div>
            </div>
            {/* <div className="flex justify-start items-start p-4">
              <div className="font-bold text-2xl">Personal Info</div>
              <div className="font-bold text-lg">Known for</div>
              <div>{personDetails.known_for_department}</div>

              <div className="font-bold text-lg"> Place of Birth</div>

              <div>Westminster, London, England, UK </div>
              <div className="font-bold text-lg">Presence</div>
              <div>1970-07-30</div>
              <div> - Present Gender Male</div>
            </div> */}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {creditsResponse ? (
        <div className="flex flex-wrap gap-8 p-4 justify-center">
          <CombinedCards movies={creditsResponse} />
        </div>
      ) : (
        <div>loading credits</div>
      )}
    </div>
  );
};

export default PersonDetailsPage;
