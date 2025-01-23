import { Moon, Sun } from 'lucide-react';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import { useSidebar } from './ui/sidebar';
import { Button } from './ui/button';
import { Clapperboard, Menu } from 'lucide-react';
import { useTheme } from './Theme-provider';
const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <div className="grid grid-cols-4 items-center justify-between p-4 bg-red-300   ">
      <div className="flex justify-start items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
        <Link to="/">
          <div className="flex  items-center justify-center col-span-1 gap-1 pl-8 text-center">
            <Clapperboard />

            <div className="text-lg font-bold">CineAtlas</div>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between col-span-3 px-4">
        <div className="w-3/4">
          <Input
            type="text"
            placeholder="Search..."
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className="flex ">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun
              className={`h-[1.2rem] w-[1.2rem] ${
                theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
              } transition-all`}
            />
            <Moon
              className={`absolute h-[1.2rem] w-[1.2rem] ${
                theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
              } transition-all`}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
