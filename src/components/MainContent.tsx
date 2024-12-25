import React from 'react';
import highestImg from '../assets/images/Highest in the room.jpg';
import { Input } from './ui/input';
const MainContent = () => {
  return (
    <div>
      <div className="flex  w-full">
        <div
          style={{
            backgroundImage: `url(${highestImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="h-[300px] w-full flex flex-col justify-center items-center "
        >
          <div className="">
            <p className="text-white text-3xl font-extrabold text-start">
              Welcome.{' '}
            </p>
            <p className="text-white text-xl font-semibold text-start">
              Millions of Movies, TV shows and people to discover.
            </p>
            <p className="text-white text-xl font-semibold text-start">
              Explore now.
            </p>
            <Input type="text" placeholder="Search" color="white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Trending Movies</h1>
        </div>
        <div className="flex gap-4 p-4">
          <div>
            <img src={highestImg} alt="Movies" />
          </div>
          <div>
            <img src={highestImg} alt="Movies" />
          </div>
          <div>
            <img src={highestImg} alt="Movies" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Trending TV Shows</h1>
        </div>
        <div className="flex gap-4 p-4">
          <div>
            <img src={highestImg} alt="Movies" />
          </div>
          <div>
            <img src={highestImg} alt="Movies" />
          </div>
          <div>
            <img src={highestImg} alt="Movies" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="px-4">
          <h1 className="text-2xl font-bold">Trending People</h1>
        </div>
        <div className="flex gap-4 p-4">
          <div>
            <img src={highestImg} alt="Movies" />
          </div>
          <div>
            <img src={highestImg} alt="Movies" />
          </div>
          <div>
            <img src={highestImg} alt="Movies" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
