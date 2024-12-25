import React from 'react';

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-300">
      <div className=" flex gap-4">
        <div>logo</div>
        <h1>CineAtlas</h1>
      </div>
      <div> searchbar</div>
      <div>ringbell logo</div>
      <div>user img</div>
    </div>
  );
};

export default Navbar;
