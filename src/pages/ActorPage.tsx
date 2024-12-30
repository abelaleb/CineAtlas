import highestImg from '@/assets/images/Highest in the room.jpg';
const ActorPage = () => {
  return (
    <div className="w-full h-full  pt-[68px]">
      <div className="flex  justify-center items-start ">
        <div
          style={{
            backgroundImage: `url(${highestImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="h-[80vh] w-[70vw] flex flex-col justify-center items-center m-4 rounded-lg"
        ></div>
        <div className="flex flex-col justify-start items-start p-4 gap-4">
          <div className="font-black text-2xl flex py-4 ">Gladiator II</div>
          <div className="font-semibold flex justify-start">
            2024-11-05 . Action, Adventure, Drama .148 minutes .
          </div>
          <div></div>
          <div className="w-1/2">
            Biography Christopher Edward Nolan, CBE (born 30 July 1970) is a
            British-American film director, screenwriter, and producer. He was
            born in Westminster, London, England and holds both British and
            American citizenship due to his American mother. He is known for
            writing and directing critically acclaimed films such as Memento
            (2000), The Prestige (2006), The Dark Knight Trilogy (2005-12),
            Inception (2010), Interstellar (2014) and Dunkirk (2017). Nolan is
            the founder of the production company Syncopy Films.
          </div>
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="font-bold">Movie Credits</div>
            <div className="font-bold">Tv Credits</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start p-4">
        <div className="font-bold text-2xl">Personal Info</div>
        <div className="font-bold text-lg">Known for</div>
        <div>Directing</div>

        <div className="font-bold text-lg"> Place of Birth</div>

        <div>Westminster, London, England, UK </div>
        <div className="font-bold text-lg">Presence</div>
        <div>1970-07-30</div>
        <div> - Present Gender Male</div>
      </div>
    </div>
  );
};

export default ActorPage;
