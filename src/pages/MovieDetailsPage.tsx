import highestImg from '@/assets/images/Highest in the room.jpg';
import { FaStar, FaUser } from 'react-icons/fa';
const MovieDetailsPage = () => {
  return (
    <div className="flex flex-col w-full h-full  pt-[68px]">
      <div className="flex  justify-center items-center ">
        <div
          style={{
            backgroundImage: `url(${highestImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="h-[80vh] w-[70vw] flex flex-col justify-center items-center m-4"
        ></div>
        <div className="flex flex-col justify-start items-center p-4">
          <div className="font-black flex justify-start">Gladiator II</div>
          <div className="font-semibold flex justify-start">
            2024-11-05 . Action, Adventure, Drama .148 minutes .
          </div>
          <div className="flex justify-start items-center font-bold">
            <div className="relative w-10 h-10">
              <FaStar className="absolute w-full h-full text-yellow-400 opacity-30" />
            </div>
            <span className="relative text-sm text-white font-bold">
              Rating
            </span>
            66% User <span className="font-bold">Score</span>
          </div>
          <p className="w-1/2">
            Prepare to be entertained. Overview Years after witnessing the death
            of the revered hero Maximus at the hands of his uncle, Lucius is
            forced to enter the Colosseum after his home is conquered by the
            tyrannical Emperors who now lead Rome with an iron fist. With rage
            in his heart and the future of the Empire at stake, Lucius must look
            to his past to find strength and honor to return the glory of Rome
            to its people.
          </p>
          <div className="flex gap-10 justify-start items-end font-bold">
            <p>Status: Released</p>
            <p> Budget: 310,010,000</p>
            <p> Revenue: 405,203,302 </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start p-4">
        <div className="font-bold">Full Cast & Crew</div>
        <div className="flex  justify-between items-center gap-4">
          <div>
            <img src={highestImg} alt="img" />
            John Doe
          </div>
          <div>
            <img src={highestImg} alt="img" />
            John Doe
          </div>
          <div>
            <img src={highestImg} alt="img" />
            John Doe
          </div>
          <div>
            <img src={highestImg} alt="img" />
            John Doe
          </div>
        </div>
        <div>
          <div className="font-bold p-4">Reviews</div>
          <div className="flex justify-center items-center gap-4">
            <div>
              <FaUser />
            </div>
            <div>
              <div>Manuel São Bento</div>
              <div>
                FULL SPOILER-FREE REVIEW @
                https://talkingfilms.net/gladiator-ii-review-a-legacy-sequel-that-triumphs-through-spectacle-and-emotion/
                Gladiator II may not achieve the groundbreaking impact of the
                original film, but it remains an impressive cinematic
                experience, transporting audiences into an epic filled with
                emotional and visual grandeur. Ridley Scott once again showcases
                his mastery in blending narrative, action, and thematic depth,
                delivering a sequel marked by superb technical execution...
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold text-xl">You may also like</div>
          <div className="flex justify-between items-center gap-4">
            <div>
              <img src={highestImg} alt="img" />
              John Doe
            </div>
            <div>
              <img src={highestImg} alt="img" />
              John Doe
            </div>
            <div>
              <img src={highestImg} alt="img" />
              John Doe
            </div>
            <div>
              <img src={highestImg} alt="img" />
              John Doe
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
