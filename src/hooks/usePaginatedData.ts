const usePaginatedData = <T,>(data: T[], postPerPage: number, currentPage: number) => {
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentData = data.slice(firstPostIndex, lastPostIndex);
  return currentData;
};

export default usePaginatedData;