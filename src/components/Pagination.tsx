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

  if (totalPages <= 1) return null; // Hide pagination if only one page

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Max number of pages shown at a time

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
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === "number" && handlePageChange(page)}
        className={`w-10 h-10 font-semibold rounded-[6px] transition-colors duration-300 ${
          currentPage === page
            ? "bg-[#1C0326] text-white"
            : "bg-[#8A49A6] text-white hover:bg-[#6B347F]"
        } ${page === "..." ? "cursor-default bg-transparent text-gray-500" : ""}`}
        disabled={page === "..."}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex justify-center mt-4 gap-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 font-semibold rounded-[6px] flex justify-center items-center transition-colors duration-300 cursor-pointer ${
          currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#8A49A6] text-white"
        }`}
      >
        <ArrowLeft />
      </button>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 font-semibold rounded-[6px] flex justify-center items-center transition-colors duration-300 cursor-pointer ${
          currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[#8A49A6] text-white"
        }`}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
