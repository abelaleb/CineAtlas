import { ArrowRight, ArrowLeft } from 'lucide-react';

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-wrap justify-center mt-4">
      {currentPage > 1 && (
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="w-10 h-10 font-semibold  mx-[10px] rounded-[6px] p-3 m-2 transition-colors duration-300 cursor-pointer bg-[#8A49A6] border-gray-200 text-white flex justify-center items-center"
        >
          <ArrowLeft />
        </button>
      )}
      {currentPage > 1 && (
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`w-10 h-10 font-semibold text-base mx-[10px] rounded-[6px] px-4 py-2 m-2 transition-colors duration-300 cursor-pointer ${
            currentPage - 1 === currentPage
              ? 'active bg-[#1C0326] border-[#1C0326] text-white'
              : 'bg-[#8A49A6] border-gray-200 text-white'
          }`}
        >
          {currentPage - 1}
        </button>
      )}
      <button
        onClick={() => setCurrentPage(currentPage)}
        className="w-10 h-10 font-semibold text-base mx-[10px] rounded-[6px] px-4 py-2 m-2 transition-colors duration-300 cursor-pointer active bg-[#1C0326] border-[#1C0326] text-white"
      >
        {currentPage}
      </button>
      {currentPage < totalPages && (
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`w-10 h-10 font-semibold text-base mx-[10px] rounded-[6px] px-4 py-2 m-2 transition-colors duration-300 cursor-pointer ${
            currentPage + 1 === currentPage
              ? 'active bg-[#1C0326] border-[#1C0326] text-white'
              : 'bg-[#8A49A6] border-gray-200 text-white'
          }`}
        >
          {currentPage + 1}
        </button>
      )}
      {currentPage < totalPages && (
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="w-10 h-10 font-semibold text-base mx-[10px] rounded-[6px] p-3 m-2 transition-colors duration-300 cursor-pointer bg-[#8A49A6] border-gray-200 text-white flex justify-center items-center"
        >
          <ArrowRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
