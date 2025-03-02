import { ArrowRight, ArrowLeft } from "lucide-react";

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

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const scrollableDiv = document.querySelector(".scrollable-content");
      if (scrollableDiv) {
        scrollableDiv.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };
  

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5; // Maximum visible pages

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === "number" && handlePageChange(page)}
        disabled={page === "..."}
        className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-full transition-colors duration-300 
          ${
            page === "..."
              ? "cursor-default bg-transparent text-gray-500"
              : currentPage === page
              ? "bg-accent text-white shadow-md"
              : "bg-gray-100 text-accent hover:bg-gray-200"
          } focus:outline-none focus:ring-2 focus:ring-blue-300`}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex justify-center mt-4 gap-2 p-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 
          ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 
          ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
