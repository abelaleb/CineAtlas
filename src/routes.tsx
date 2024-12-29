import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import ActorPage from './pages/ActorPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import FavoritesPage from './pages/FavoritesPage';
import BrowseSearchPage from './pages/BrowseSearchPage';
import HomePage from './pages/HomePage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children:[
      { path: '', element: <HomePage /> }, 
      { path: 'browse', element: <BrowseSearchPage /> },
      { path: 'actor', element: <ActorPage /> },
      { path: 'movies', element: <MovieDetailsPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ]
  },
];
const Router = createBrowserRouter(routes);
export default Router;
