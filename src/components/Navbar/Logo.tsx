import { Link } from 'react-router-dom';
import logo from '../../../public/logo.svg';

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center justify-center gap-1 pl-8 text-center group transition-transform duration-200 hover:scale-105 active:scale-95">
        <img
          src={logo}
          alt="logo"
          className="h-6 w-6 transition-transform duration-200 group-hover:rotate-12"
        />
        <div className="text-lg font-bold transition-colors duration-200 group-hover:text-primary">
          CineAtlas
        </div>
      </div>
    </Link>
  );
};

export default Logo;
