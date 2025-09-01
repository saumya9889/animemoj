"use client";

import { useState, useEffect } from "react";
import HeroBanner from "@/components/HeroBanner";
import AnimeGrid from "@/components/AnimeGrid";
import {
  getTrendingAnime,
  getPopularAnime,
  getRecentEpisodesGogo,
  getTopAiringGogo,
  getFreeAnimeStreaming,
} from "@/lib/api";

export default function HomePage() {
  const [trendingData, setTrendingData] = useState({ data: [] });
  const [popularData, setPopularData] = useState({ data: [] });
  const [recentData, setRecentData] = useState({ data: [] });
  const [topAiringData, setTopAiringData] = useState({ data: [] });
  const [freeAnimeData, setFreeAnimeData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get free anime streaming data first
        const freeAnime = getFreeAnimeStreaming();
        setFreeAnimeData({ data: freeAnime });

        const [trending, popular, recent, topAiring] = await Promise.all([
          getTrendingAnime(),
          getPopularAnime(),
          getRecentEpisodesGogo(),
          getTopAiringGogo(),
        ]);

        setTrendingData(trending);
        setPopularData(popular);
        setRecentData(recent);
        setTopAiringData(topAiring);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load some anime data. Please refresh the page.");

        // Set default empty data structures to prevent crashes
        setTrendingData({ data: [] });
        setPopularData({ data: [] });
        setRecentData({ data: [] });
        setTopAiringData({ data: [] });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading AnimeFlix...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-white text-2xl font-bold mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // Safely extract data arrays with fallbacks
  const trendingAnime = trendingData?.data || [];
  const popularAnime = popularData?.data || [];
  const recentAnime = recentData?.data || [];
  const topAiringAnime = topAiringData?.data || [];
  const freeAnime = freeAnimeData?.data || [];

  // Combine all anime data, prioritizing free streaming content
  const allAnime = [
    ...freeAnime,
    ...trendingAnime,
    ...popularAnime,
    ...recentAnime,
    ...topAiringAnime,
  ];
  const uniqueAnime = allAnime.filter(
    (anime, index, self) => index === self.findIndex(a => a.id === anime.id)
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Banner */}
      {uniqueAnime.length > 0 && <HeroBanner anime={uniqueAnime[0]} />}

      {/* Free Anime Streaming Section */}
      {freeAnime.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              🎬 Free Anime Streaming
            </h2>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {freeAnime.length} Series Available
            </span>
          </div>
          <p className="text-gray-400 mb-6">
            Watch these popular anime series completely free! Click &quot;Play
            Now&quot; to start streaming immediately.
          </p>
          <AnimeGrid
            animeList={freeAnime.slice(0, 12)}
            showWatchlistButton={true}
          />
        </section>
      )}

      {/* Trending Anime */}
      {trendingAnime.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-white mb-6">Trending Now</h2>
          <AnimeGrid
            animeList={trendingAnime.slice(1, 13)}
            showWatchlistButton={true}
          />
        </section>
      )}

      {/* Popular Anime */}
      {popularAnime.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Anime</h2>
          <AnimeGrid
            animeList={popularAnime.slice(0, 12)}
            showWatchlistButton={true}
          />
        </section>
      )}

      {/* Recent Episodes */}
      {recentAnime.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Currently Airing
          </h2>
          <AnimeGrid
            animeList={recentAnime.slice(0, 12)}
            showWatchlistButton={true}
          />
        </section>
      )}

      {/* Top Airing */}
      {topAiringAnime.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-white mb-6">Top Airing</h2>
          <AnimeGrid
            animeList={topAiringAnime.slice(0, 12)}
            showWatchlistButton={true}
          />
        </section>
      )}

      {/* No Data Message */}
      {uniqueAnime.length === 0 && (
        <div className="px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-gray-400 text-6xl mb-4">📺</div>
          <h2 className="text-white text-2xl font-bold mb-4">
            No Anime Available
          </h2>
          <p className="text-gray-400 mb-6">
            We&apos;re experiencing some issues loading anime data. This might
            be due to API rate limiting.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Free Streaming Info */}
      {freeAnime.length > 0 && (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="text-green-400 text-2xl">🎬</div>
              <div>
                <h3 className="text-green-300 text-lg font-semibold mb-2">
                  Free Anime Streaming Available!
                </h3>
                <p className="text-green-200 mb-3">
                  You can now watch these anime series completely free:
                </p>
                <ul className="text-green-200 space-y-1">
                  {freeAnime.slice(0, 5).map(anime => (
                    <li key={anime.id} className="flex items-center space-x-2">
                      <span className="text-green-400">▶️</span>
                      <span>{anime.title}</span>
                      <span className="text-green-300 text-sm">
                        ({anime.episodes} episodes)
                      </span>
                    </li>
                  ))}
                  {freeAnime.length > 5 && (
                    <li className="text-green-300 text-sm">
                      ... and {freeAnime.length - 5} more!
                    </li>
                  )}
                </ul>
                <p className="text-green-200 mt-3 text-sm">
                  Click any &quot;Play Now&quot; button to start streaming
                  immediately!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
