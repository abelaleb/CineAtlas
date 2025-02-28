import { useState, useEffect, useCallback } from "react";
import tmdb from "@/api/axiosInstance";
import { handleResponse } from "@/api/responseHandler";
import confetti from "canvas-confetti";
import { MovieChange, TVShowChange } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Star, Calendar, Film, Tv, AlertTriangle } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { imageOriginal } from "@/Constants/Constants";
const TOTAL_PAGES = 150;

const RandomPage = () => {
  const [movies, setMovies] = useState<MovieChange[]>([]);
  const [tvShows, setTvShows] = useState<TVShowChange[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatYear = useCallback((dateString?: string | number | Date) => {
    if (!dateString) return "Unknown";

    if (dateString instanceof Date) {
      return dateString.getFullYear().toString();
    }

    return new Date(dateString).getFullYear().toString();
  }, []);

  const fetchRandomMovies = useCallback(async () => {
    const randomPages = Array.from(
      { length: 3 },
      () => Math.floor(Math.random() * TOTAL_PAGES) + 1
    );
    const moviePromises = randomPages.map((page) =>
      tmdb.get("/discover/movie", {
        params: { sort_by: "popularity.desc", page },
      })
    );
    const responses = await Promise.all(moviePromises);
    const moviesData = responses.map((res) => handleResponse(res).results);
    const selectedMovies = moviesData.map(
      (movieList: MovieChange[]) =>
        movieList[Math.floor(Math.random() * movieList.length)]
    );
    return selectedMovies;
  }, []);

  const fetchRandomTvShows = useCallback(async () => {
    const randomPages = Array.from(
      { length: 3 },
      () => Math.floor(Math.random() * TOTAL_PAGES) + 1
    );
    const tvPromises = randomPages.map((page) =>
      tmdb.get("/discover/tv", {
        params: { sort_by: "popularity.desc", page },
      })
    );
    const responses = await Promise.all(tvPromises);
    const tvData = responses.map((res) => handleResponse(res).results);
    const selectedTvShows = tvData.map(
      (tvList: TVShowChange[]) =>
        tvList[Math.floor(Math.random() * tvList.length)]
    );
    return selectedTvShows;
  }, []);

  const triggerConfetti = useCallback(() => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];
    const count = 3;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6, x: 0.3 + i * 0.2 },
          colors: colors.slice(0, 3),
        });
      }, i * 300);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [randomMovies, randomTvShows] = await Promise.all([
        fetchRandomMovies(),
        fetchRandomTvShows(),
      ]);
      setMovies(randomMovies);
      setTvShows(randomTvShows);
      triggerConfetti();
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchRandomMovies, fetchRandomTvShows, triggerConfetti]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto pt-[68px] px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Discover Something New
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Feeling indecisive? Let us recommend random movies and TV shows for
            your next binge-watching session.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <motion.button
            onClick={fetchData}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-70 group"
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <ClipLoader color="#ffffff" size={20} />
                  <span>Finding gems...</span>
                </>
              ) : (
                <>
                  <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Shuffle Recommendations</span>
                </>
              )}
            </span>
          </motion.button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-yellow-500/20 border border-yellow-500 text-yellow-100 p-4 rounded-lg mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#8B5CF6" size={50} />
          </div>
        ) : (
          <>
            <MediaSection
              title="Movies"
              icon={<Film className="w-6 h-6" />}
              items={movies}
              loading={loading}
              type="movie"
              formatYear={formatYear}
            />

            <MediaSection
              title="TV Shows"
              icon={<Tv className="w-6 h-6" />}
              items={tvShows}
              loading={loading}
              type="tv"
              formatYear={formatYear}
            />
          </>
        )}
      </div>
    </div>
  );
};
interface MediaSectionProps {
  title: string;
  icon: React.ReactNode;
  items: MovieChange[] | TVShowChange[];
  loading: boolean;
  type: "movie" | "tv";
  formatYear: (dateString?: string | number | Date | undefined) => string;
}
const MediaSection = ({
  title,
  icon,
  items,
  loading,
  type,
  formatYear,
}: MediaSectionProps) => (
  <section className="mb-16">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center gap-2 mb-6"
    >
      <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      {icon}
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="wait">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={`skeleton-${type}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SkeletonCard />
              </motion.div>
            ))}
          </>
        ) : (
          // Show actual content when loaded
          items.map((item, index) => {
            const isMovie = "title" in item;
            const title = isMovie
              ? (item as MovieChange).title
              : (item as TVShowChange).name;
            const releaseDate = isMovie
              ? (item as MovieChange).release_date
              : (item as TVShowChange).first_air_date;

            return (
              <motion.div
                key={`${type}-${index}-${title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  {item.poster_path ? (
                    <img
                      src={
                        item.poster_path
                          ? imageOriginal + item.poster_path
                          : item.backdrop_path
                          ? imageOriginal + item.backdrop_path
                          : ""
                      }
                      alt={title}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-80 bg-slate-700 flex items-center justify-center">
                      <span className="text-slate-400">No Image Available</span>
                    </div>
                  )}
                  <div className="absolute top-0 right-0 bg-black/70 p-2 m-2 rounded-full">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {item.vote_average?.toFixed(1) || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">
                    {title}
                  </h3>
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatYear(releaseDate)}</span>
                    </div>
                    {item.original_language && (
                      <span className="text-xs px-2 py-1 bg-slate-700 rounded-full uppercase">
                        {item.original_language}
                      </span>
                    )}
                  </div>
                  {item.overview && (
                    <p className="mt-3 text-slate-300 text-sm line-clamp-2">
                      {item.overview}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
    </div>
  </section>
);
const SkeletonCard = () => (
  <div className="bg-slate-800/50 rounded-xl overflow-hidden shadow-lg animate-pulse">
    <div className="w-full h-80 bg-slate-700"></div>
    <div className="p-5 space-y-3">
      <div className="h-6 bg-slate-700 rounded w-3/4"></div>
      <div className="flex space-x-2">
        <div className="h-4 bg-slate-700 rounded w-1/4"></div>
        <div className="h-4 bg-slate-700 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);
export default RandomPage;
