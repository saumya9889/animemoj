"use client";

import { useState, useEffect } from "react";
import AnimeGrid from "@/components/AnimeGrid";
import { getAnimeByGenre } from "@/lib/api";

// Common anime genres
const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

export default function GenresPage() {
  const [selectedGenre, setSelectedGenre] = useState("Action");
  const [searchQuery, setSearchQuery] = useState("");
  const [genreData, setGenreData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch anime by genre
  useEffect(() => {
    const fetchGenreData = async () => {
      if (!selectedGenre) return;

      try {
        setIsLoading(true);
        const data = await getAnimeByGenre(selectedGenre);
        setGenreData({ results: data });
      } catch (error) {
        console.error("Error fetching genre data:", error);
        setGenreData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenreData();
  }, [selectedGenre]);

  // Filter genres based on search
  const filteredGenres = GENRES.filter(genre =>
    genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Browse by Genre
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Discover anime by your favorite genres
          </p>

          {/* Genre Search */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search genres..."
              className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-lg"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Genre Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Select Genre</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredGenres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`p-4 rounded-lg font-medium transition-all duration-200 ${
                  selectedGenre === genre
                    ? "bg-red-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Genre Content */}
        {selectedGenre && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedGenre} Anime
              </h2>
              {genreData && genreData.results && (
                <span className="text-gray-400">
                  {genreData.results.length} results
                </span>
              )}
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-white text-lg">
                  Loading {selectedGenre} anime...
                </p>
              </div>
            ) : genreData && genreData.results ? (
              <AnimeGrid
                animes={genreData.results.slice(0, 24)} // Limit to 24 for performance
                title=""
                showWatchlistButton={true}
              />
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📺</div>
                <h3 className="text-white text-xl font-semibold mb-2">
                  No Anime Found
                </h3>
                <p className="text-gray-400">
                  No anime found for the {selectedGenre} genre
                </p>
              </div>
            )}
          </div>
        )}

        {/* Popular Genres Info */}
        <div className="mt-16 bg-gray-900 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Popular Genres</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-red-400 font-semibold text-lg mb-3">
                Action & Adventure
              </h4>
              <p className="text-gray-300 text-sm">
                High-energy anime with thrilling battles, epic quests, and
                heroic journeys.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-red-400 font-semibold text-lg mb-3">
                Romance & Drama
              </h4>
              <p className="text-gray-300 text-sm">
                Emotional stories about love, relationships, and personal
                growth.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-red-400 font-semibold text-lg mb-3">
                Fantasy & Supernatural
              </h4>
              <p className="text-gray-300 text-sm">
                Magical worlds with supernatural powers, mythical creatures, and
                extraordinary abilities.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-red-400 font-semibold text-lg mb-3">
                Comedy & Slice of Life
              </h4>
              <p className="text-gray-300 text-sm">
                Lighthearted stories about everyday life, humor, and relatable
                situations.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-red-400 font-semibold text-lg mb-3">
                Mystery & Thriller
              </h4>
              <p className="text-gray-300 text-sm">
                Suspenseful stories with puzzles, investigations, and unexpected
                twists.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h4 className="text-red-400 font-semibold text-lg mb-3">
                Sci-Fi & Horror
              </h4>
              <p className="text-gray-300 text-sm">
                Futuristic technology, space exploration, and spine-chilling
                horror experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
