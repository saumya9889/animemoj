"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAnimeInfoGogo, getAnimeInfoZoro } from "@/lib/api";
import {
  getAnimeEpisodes,
  getEpisodeStreamingSources,
} from "@/lib/realAnimeStreaming";
import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "@/lib/watchlist";

export default function AnimeDetailPage() {
  const params = useParams();
  const animeId = params.id;
  const [animeInfo, setAnimeInfo] = useState(null);
  const [isInUserWatchlist, setIsInUserWatchlist] = useState(false);
  const [selectedSource, setSelectedSource] = useState("gogo");
  const [isLoading, setIsLoading] = useState(true);
  const [gogoData, setGogoData] = useState(null);
  const [zoroData, setZoroData] = useState(null);
  const [error, setError] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch anime info from MyAnimeList
        const [gogo, zoro] = await Promise.all([
          getAnimeInfoGogo(animeId),
          getAnimeInfoZoro(animeId),
        ]);

        setGogoData(gogo);
        setZoroData(zoro);

        if (gogo) {
          setAnimeInfo(gogo);
        } else if (zoro) {
          setAnimeInfo(zoro);
          setSelectedSource("zoro");
        } else {
          setError("Anime not found");
        }

        // Fetch episodes for this anime
        if (animeId) {
          const episodeList = await getAnimeEpisodes(animeId);
          setEpisodes(episodeList);
          if (episodeList.length > 0) {
            setSelectedEpisode(episodeList[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching anime data:", error);
        if (error.message.includes("429")) {
          setError("Rate limit exceeded. Please wait a moment and try again.");
        } else {
          setError("Failed to load anime information");
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (animeId) {
      fetchAnimeData();
    }
  }, [animeId]);

  useEffect(() => {
    if (animeInfo) {
      const checkWatchlist = async () => {
        const inWatchlist = await isInWatchlist(
          animeInfo.mal_id || animeInfo.id
        );
        setIsInUserWatchlist(inWatchlist);
      };
      checkWatchlist();
    }
  }, [animeInfo]);

  const handleAddToWatchlist = async () => {
    if (animeInfo) {
      await addToWatchlist(animeInfo);
      setIsInUserWatchlist(true);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (animeInfo) {
      await removeFromWatchlist(animeInfo.mal_id || animeInfo.id);
      setIsInUserWatchlist(false);
    }
  };

  const handleEpisodeSelect = episode => {
    setSelectedEpisode(episode);
  };

  // Helper function to extract genres properly
  const getGenres = anime => {
    if (!anime.genres) return [];

    // Handle MyAnimeList genres structure
    if (Array.isArray(anime.genres)) {
      return anime.genres
        .map(genre => {
          // Check if genre is an object with name property
          if (typeof genre === "object" && genre.name) {
            return genre.name;
          }
          // Check if genre is a string
          if (typeof genre === "string") {
            return genre;
          }
          // Fallback
          return "Unknown";
        })
        .filter(genre => genre !== "Unknown");
    }

    return [];
  };

  // Helper function to get image URL
  const getImageUrl = anime => {
    return (
      anime.images?.jpg?.image_url ||
      anime.images?.webp?.image_url ||
      anime.image ||
      "/placeholder-anime.jpg"
    );
  };

  // Helper function to get title
  const getTitle = anime => {
    return (
      anime.title ||
      anime.title_english ||
      anime.title_japanese ||
      "Unknown Title"
    );
  };

  // Helper function to get description
  const getDescription = anime => {
    return (
      anime.synopsis ||
      anime.description ||
      "No description available for this anime."
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading anime information...</p>
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
            Error Loading Anime
          </h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!animeInfo) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">❓</div>
          <h1 className="text-white text-2xl font-bold mb-4">
            Anime Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The anime you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <Image
          src={getImageUrl(animeInfo)}
          alt={getTitle(animeInfo)}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              {getTitle(animeInfo)}
            </h1>

            {/* Genres */}
            {getGenres(animeInfo).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {getGenres(animeInfo).map((genre, index) => (
                  <span
                    key={index}
                    className="bg-red-600/80 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {selectedEpisode && (
                <Link
                  href={`/watch/${selectedEpisode.id}`}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Watch Episode {selectedEpisode.episode}</span>
                </Link>
              )}

              {/* Play Now Button - Immediately plays the anime */}
              <Link
                href={`/watch/${selectedEpisode?.id || animeId}`}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Play Now</span>
              </Link>

              {/* Watchlist Button */}
              {isInUserWatchlist ? (
                <button
                  onClick={handleRemoveFromWatchlist}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Remove from Watchlist
                </button>
              ) : (
                <button
                  onClick={handleAddToWatchlist}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Add to Watchlist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
          <p className="text-gray-300 leading-relaxed">
            {getDescription(animeInfo)}
          </p>
        </div>

        {/* Episodes Section */}
        {episodes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Episodes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {episodes.slice(0, 24).map(episode => (
                <div
                  key={episode.id}
                  className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-gray-700 ${
                    selectedEpisode?.id === episode.id
                      ? "ring-2 ring-red-500"
                      : ""
                  }`}
                  onClick={() => handleEpisodeSelect(episode)}
                >
                  <div className="aspect-video bg-gray-700 rounded mb-2 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      EP {episode.episode}
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium truncate">
                    Episode {episode.episode}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {episode.duration}
                  </p>

                  {/* Play Now Button for each episode */}
                  <Link
                    href={`/watch/${episode.id}`}
                    className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded text-center block transition-colors duration-200"
                    onClick={e => e.stopPropagation()}
                  >
                    Play Now
                  </Link>
                </div>
              ))}
            </div>

            {episodes.length > 24 && (
              <div className="text-center mt-6">
                <p className="text-gray-400">
                  Showing first 24 episodes of {episodes.length} total episodes
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Watch Section */}
        {selectedEpisode && (
          <div className="mt-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-700 rounded-lg p-6">
            <h3 className="text-white text-xl font-semibold mb-4 flex items-center">
              <span className="text-green-400 mr-2">▶️</span>
              Quick Watch - Episode {selectedEpisode.episode}
            </h3>
            <p className="text-gray-300 mb-4">
              Ready to watch? Click the button below to start streaming this
              episode immediately!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/watch/${selectedEpisode.id}`}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 shadow-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Play Now</span>
              </Link>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
