
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col  pt-[68px] p-4 md:p-6 lg:p-8 dark:bg-gradient-to-br bg-[#e1c1eb] dark:from-[#1a1a2e] dark:via-[#231b32] dark:to-[#1f1f2f]text-primary dark:text-primary">
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
