"use client";

import { useState, useEffect, useCallback } from "react";
import AnimeGrid from "@/components/AnimeGrid";
import { searchAnimeGogo, searchAnimeZoro } from "@/lib/api";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchSource, setSearchSource] = useState("gogo"); // 'gogo' or 'zoro'

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 3) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, searchSource]);

  const performSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      let results = [];

      if (searchSource === "gogo") {
        results = await searchAnimeGogo(searchQuery);
      } else {
        results = await searchAnimeZoro(searchQuery);
      }

      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, searchSource]);

  const handleSearch = e => {
    e.preventDefault();
    performSearch();
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-red-900/20 to-purple-900/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Search Anime
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Discover your favorite anime series and movies
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search for anime titles..."
                  className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-lg"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={searchSource}
                  onChange={e => setSearchSource(e.target.value)}
                  className="px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="gogo">GogoAnime</option>
                  <option value="zoro">Zoro</option>
                </select>

                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span>Search</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {searchQuery.trim().length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Search Results for &quot;{searchQuery}&quot;
            </h2>
            <p className="text-gray-400">
              Searching in {searchSource === "gogo" ? "GogoAnime" : "Zoro"}{" "}
              database
            </p>
          </div>
        )}

        {isSearching ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-white text-lg">Searching...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <AnimeGrid
            animes={searchResults}
            title=""
            showWatchlistButton={true}
          />
        ) : searchQuery.trim().length >= 3 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-white text-xl font-semibold mb-2">
              No Results Found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search terms or search in a different database
            </p>
          </div>
        ) : searchQuery.trim().length > 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Type at least 3 characters to search
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🎬</div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Start Your Search
            </h3>
            <p className="text-gray-400">
              Search for your favorite anime titles above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
