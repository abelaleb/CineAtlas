
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col  pt-[68px]">
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <div className="flex flex-col text-2xl justify-center items-center ">
          404 not found oops!
        </div>
        <Link
          to={'/'}
          className="bg-gray-800 text-white p-2 rounded-md text-xl "
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
