import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.svg';

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center justify-center gap-1 text-center group transition-transform duration-300 hover:scale-105 active:scale-95">
        <img
          src={logo}
          alt="logo"
          className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12"
        />
        <div className="text-lg font-bold transition-colors duration-300 group-hover:text-primary">
          CineAtlas
        </div>
      </div>
    </Link>
  );
};

export default Logo;
