// src/components/Navbar.tsx
import SidebarToggle from "./Navbar/SidebarToggle";
import Logo from "./Navbar/Logo";
import SearchBar from "./Navbar/SearchBar";
import ThemeToggle from "./Navbar/ThemeToggle";

const Navbar = () => {
  return (
    <div className="flex py-3 bg-secondary gap-4 md:gap-24">
      <div className="flex items-center justify-start gap-4 ">
       <SidebarToggle />
        <Logo />
      </div>
      <div className="flex justify-end flex-1 items-center  gap-4 md:flex-1 md:justify-between ">
        <div className="flex p-1 md:flex-1 md:max-w-[600px] lg:max-w-[800px]">
          <SearchBar />
        </div>
        <div className="flex p-1 pr-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
