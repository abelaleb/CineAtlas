import Navbar from '@/components/Navbar';
import React from 'react';

const FavoritesPage: React.FC = () => {
  return (
    <div className="flex flex-col  pt-[68px]">
      <Navbar />
      <div>
        myfavorite things
        <div>Movies</div>
        <div>people</div>
      </div>
    </div>
  );
};

export default FavoritesPage;
