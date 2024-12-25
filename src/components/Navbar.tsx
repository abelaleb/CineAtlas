import { FaBeer, FaUser } from 'react-icons/fa';
import { Input } from './ui/input';
const Navbar = () => {
  return (
    <div className="grid grid-cols-4 items-center justify-between p-4 bg-red-300   ">
      <div className="flex  items-center justify-center col-span-1 gap-4 text-center">
        <div className="flex justify-center items-center">
          <FaBeer />
        </div>
        <h1 className="bg-red text-2xl font-bold text-primary">CineAtlas</h1>
      </div>
      <div className="flex items-center justify-between col-span-3 px-4">
        <div className="w-3/4">
          <Input
            type="text"
            placeholder="Search..."
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className="flex ">
          <FaUser />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
