"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "@/lib/watchlist";

export default function HeroBanner({ anime }) {
  const [inWatchlist, setInWatchlist] = useState(false);

  // Check if anime is in watchlist on mount
  useState(() => {
    if (typeof window !== "undefined" && anime) {
      setInWatchlist(isInWatchlist(anime.mal_id || anime.id));
    }
  });

  const handleWatchlistToggle = () => {
    if (!anime) return;

    if (inWatchlist) {
      removeFromWatchlist(anime.mal_id || anime.id);
      setInWatchlist(false);
    } else {
      addToWatchlist({
        id: anime.mal_id || anime.id,
        title: anime.title || anime.title_english || anime.title_japanese,
        image:
          anime.images?.jpg?.image_url ||
          anime.images?.webp?.image_url ||
          anime.image,
        releaseDate: anime.aired?.from || anime.year,
        type: anime.type,
        genres: getGenres(anime),
      });
      setInWatchlist(true);
    }

    // Trigger storage event for navbar update
    window.dispatchEvent(new Event("storage"));
  };

  const getImageUrl = anime => {
    // Handle MyAnimeList image structure
    if (anime.images?.jpg?.image_url) {
      return anime.images.jpg.image_url;
    }
    if (anime.images?.webp?.image_url) {
      return anime.images.webp.image_url;
    }
    // Fallback to direct image property
    return anime.image || "/placeholder-anime.jpg";
  };

  const getTitle = anime => {
    return (
      anime.title ||
      anime.title_english ||
      anime.title_japanese ||
      "Unknown Title"
    );
  };

  const getDescription = anime => {
    return anime.synopsis || anime.description || "No description available.";
  };

  const getYear = anime => {
    if (anime.aired?.from) {
      return new Date(anime.aired.from).getFullYear();
    }
    if (anime.year) {
      return anime.year;
    }
    return null;
  };

  const getStatus = anime => {
    return anime.status || "Unknown";
  };

  const getEpisodes = anime => {
    return anime.episodes || "Unknown";
  };

  // Properly extract genres from MyAnimeList data structure
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

  if (!anime) return null;

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={getImageUrl(anime)}
        alt={getTitle(anime)}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {getTitle(anime)}
            </h1>

            {/* Description */}
            {getDescription(anime) && (
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed line-clamp-3">
                {getDescription(anime)}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex items-center space-x-4 mb-8 text-gray-300">
              {getYear(anime) && <span>{getYear(anime)}</span>}
              {anime.type && (
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                  {anime.type}
                </span>
              )}
              {getStatus(anime) && <span>{getStatus(anime)}</span>}
              {getEpisodes(anime) && <span>{getEpisodes(anime)} Episodes</span>}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                href={`/watch/${anime.mal_id || anime.id}`}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2 shadow-lg"
              >
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
                <span>Play Now</span>
              </Link>

              <Link
                href={`/anime/${anime.mal_id || anime.id}`}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2"
              >
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Details</span>
              </Link>

              <button
                onClick={handleWatchlistToggle}
                className={`px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2 ${
                  inWatchlist
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                }`}
              >
                {inWatchlist ? (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>In Watchlist</span>
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Add to Watchlist</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
