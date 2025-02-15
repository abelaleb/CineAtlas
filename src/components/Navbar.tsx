// src/components/Navbar.tsx
import SidebarToggle from './Navbar/SidebarToggle';
import Logo from './Navbar/Logo';
import SearchBar from './Navbar/SearchBar';
import ThemeToggle from './Navbar/ThemeToggle';

const Navbar = () => {
  return (
    <div className="grid grid-cols-4 items-center justify-between p-4 bg-secondary">
      <div className="flex items-center gap-4">
        <SidebarToggle />
        <Logo />
      </div>
      <div className="flex items-center justify-between col-span-3 px-4">
        <div className="w-8/12">
          <SearchBar />
        </div>
        <div className="flex">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
