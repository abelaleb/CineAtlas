import highestImg from '@/assets/images/Highest in the room.jpg';
import { Input } from './ui/input';

const Header = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${highestImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="h-[300px] w-full flex flex-col justify-center items-center"
    >
      <div>
        <p className="text-white text-3xl font-extrabold text-start">
          Welcome.
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
  );
};

export default Header;
