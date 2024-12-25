const Sidebar = () => {
  return (
    <div className="h-screen border-w-2">
      <div className="flex flex-col gap-1 ">
        <div className="p-4 ">Home</div>
        <div className="p-4">Discover</div>
        <div className="p-4">Genres</div>
        <div className="p-4">Trending</div>
        <div className="p-4 ">Watchlist/Favs</div>
        <div className="p-4 ">Search History</div>
      </div>
    </div>
  );
};

export default Sidebar;
