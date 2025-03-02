import { MovieChange, PersonalDetails, TVShowChange } from "@/types/types";
import { imageOriginal } from "@/Constants/Constants";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPersonCredits, fetchPersonDetails } from "@/api/people";
import DynamicCard from "@/components/DynamicCard";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "@/components/Spinner";

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
          setCreditsResponse(credits.cast);
        } catch (err) {
          console.error("Error fetching person details:", err);
        }
      }
    };

    fetchData();
  }, [personId]);

  return (
    <div className="w-full h-full mt-[68px] p-4 md:p-6 lg:p-8 text-primary dark:text-primary">
      {personDetails ? (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="relative w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] h-[450px] rounded-xl overflow-hidden shadow-lg">
            <img
              src={imageOriginal + personDetails.profile_path}
              alt={personDetails.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>

          <div className="flex flex-col gap-4 text-center lg:text-left w-full lg:w-2/3">
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary">
              {personDetails.name}
            </h1>
            <p className="text-lg md:text-xl font-semibold">
              {personDetails.birthday &&
                format(new Date(personDetails.birthday), "MMMM dd, yyyy")}
            </p>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
              {personDetails.biography || "No biography available."}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[50vh]">
          <Skeleton className="w-40 h-40 rounded-full" />
          <div className="ml-6 space-y-4">
            <Skeleton className="w-56 h-8" />
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-64 h-24" />
          </div>
        </div>
      )}

      {creditsResponse.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
            Filmography
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
            {creditsResponse.map((credit) => (
              <DynamicCard key={credit.id} mediaType="movie" data={credit} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-center mt-6">
          <span className="p-4">Loading filmography...</span>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default PersonDetailsPage;
