import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from './App';
import MovieDetailsPage from './pages/MovieDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import BrowseSearchPage from './pages/BrowseSearchPage';
import PopularMovies from './pages/PopularMovies';
import TvDetailsPage from './pages/TvDetailsPage';
import PersonDetailsPage from './pages/PersonDetailsPage';
import PopularTvShows from './pages/PopularTvShows';
import Home from './pages/Home';
import RandomTitlesPage from './pages/RandomTitlePage';
const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'search', element: <BrowseSearchPage /> },
      {
        path: 'movies',
        element: <PopularMovies />,
        children: [{ path: ':pageId', element: <PopularMovies /> }],
      },
      { path: 'tvshows', element: <PopularTvShows /> },
      { path: 'movie/:movieId', element: <MovieDetailsPage /> },
      { path: 'tv/:series_id', element: <TvDetailsPage /> },
      { path: 'random', element: <RandomTitlesPage /> },
      { path: 'person/:personId', element: <PersonDetailsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
const Router = createBrowserRouter(routes);
export default Router;
