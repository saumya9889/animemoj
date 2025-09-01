"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getWatchlist, removeFromWatchlist } from "@/lib/watchlist";
import AnimeGrid from "@/components/AnimeGrid";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWatchlist = () => {
      const savedWatchlist = getWatchlist();
      setWatchlist(savedWatchlist);
      setIsLoading(false);
    };

    loadWatchlist();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadWatchlist();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleRemoveFromWatchlist = animeId => {
    removeFromWatchlist(animeId);
    setWatchlist(getWatchlist());

    // Trigger storage event for navbar update
    window.dispatchEvent(new Event("storage"));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading watchlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            My Watchlist
          </h1>
          <p className="text-gray-300 text-lg">
            Keep track of your favorite anime series and movies
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {watchlist.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Saved Anime ({watchlist.length})
              </h2>
              <button
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to clear your entire watchlist?"
                    )
                  ) {
                    localStorage.removeItem("animeflix_watchlist");
                    setWatchlist([]);
                    window.dispatchEvent(new Event("storage"));
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {watchlist.map(anime => (
                <div
                  key={anime.id}
                  className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg"
                >
                  <Link href={`/anime/${anime.id}`}>
                    {/* Image Container */}
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <Image
                        src={anime.image || "/placeholder-anime.jpg"}
                        alt={anime.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 transition-colors duration-200">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                        {anime.title}
                      </h3>

                      {anime.releaseDate && (
                        <p className="text-gray-400 text-xs">
                          {new Date(anime.releaseDate).getFullYear()}
                        </p>
                      )}

                      {anime.type && (
                        <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded mt-2">
                          {anime.type}
                        </span>
                      )}

                      {/* Watchlist Info */}
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-gray-400 text-xs">
                          Added: {new Date(anime.addedAt).toLocaleDateString()}
                        </p>
                        {anime.lastWatched && (
                          <p className="text-gray-400 text-xs">
                            Last watched:{" "}
                            {new Date(anime.lastWatched).toLocaleDateString()}
                          </p>
                        )}
                        {anime.currentEpisode && (
                          <p className="text-gray-400 text-xs">
                            Episode: {anime.currentEpisode}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromWatchlist(anime.id)}
                    className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    title="Remove from watchlist"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📺</div>
            <h2 className="text-white text-2xl font-semibold mb-4">
              Your Watchlist is Empty
            </h2>
            <p className="text-gray-400 mb-8">
              Start adding anime to your watchlist to keep track of what you
              want to watch
            </p>
            <Link
              href="/"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Discover Anime
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
