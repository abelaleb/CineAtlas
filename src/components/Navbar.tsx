import SidebarToggle from "./Navbar/SidebarToggle";
import Logo from "./Navbar/Logo";
import SearchBar from "./Navbar/SearchBar";
import ThemeToggle from "./Navbar/ThemeToggle";

const Navbar = () => {
  return (
    <div className="flex pt-2 gap-4 md:gap-40  dark:bg-gradient-to-br bg-[#e1c1eb]/90 dark:from-[#1a1a2e] dark:via-[#231b32] dark:to-[#1f1f2f] text-primary dark:text-primary border-b border-primary ">
      <div className="flex items-center justify-start gap-4 lg:gap-8 ">
        <SidebarToggle />
        <Logo />
      </div>
      <div className="flex justify-end flex-1 items-center gap-4 md:flex-1 md:justify-between ">
        <div className="flex  md:flex-1 md:max-w-[600px] lg:max-w-[800px]">
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
