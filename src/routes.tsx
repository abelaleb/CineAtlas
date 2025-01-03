import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import ActorPage from './pages/ActorPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import BrowseSearchPage from './pages/BrowseSearchPage';
import HomePage from './pages/HomePage';
import PopularMovies from './pages/PopularMovies';
import TvDetailsPage from './pages/TvDetailsPage';
const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'search', element: <BrowseSearchPage /> },
      { path: 'actor', element: <ActorPage /> },
      {
        path: 'movies',
        element: <PopularMovies />,
        children: [{ path: ':pageId', element: <PopularMovies /> }],
      },
      { path: 'movie/:movieId', element: <MovieDetailsPage /> },
      {path: 'tv/:series_id', element: <TvDetailsPage />},
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
const Router = createBrowserRouter(routes);
export default Router;
