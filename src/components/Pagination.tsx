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
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex flex-wrap justify-center mt-4">
      {pages.map((page, index) => {
        return (
        <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={`w-10 h-10 font-semibold text-base mx-[10px] rounded-[6px] px-4 py-2 m-2 transition-colors duration-300 cursor-pointer ${
                page === currentPage
                    ? 'active bg-blue-500 border-blue-500'
                    : 'bg-gray-200 border-gray-200'
            }`}
        >
            {page}
        </button>
        );
      })}
    </div>
  );
};

export default Pagination;
