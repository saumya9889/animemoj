"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "@/lib/watchlist";

export default function AnimeCard({ anime, showWatchlistButton = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  // Check if anime is in watchlist on mount
  useState(() => {
    if (typeof window !== "undefined") {
      setInWatchlist(isInWatchlist(anime.mal_id || anime.id));
    }
  });

  const handleWatchlistToggle = e => {
    e.preventDefault();
    e.stopPropagation();

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

  const truncateTitle = (title, maxLength = 20) => {
    if (!title) return "Unknown Title";
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + "...";
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

  const getYear = anime => {
    if (anime.aired?.from) {
      return new Date(anime.aired.from).getFullYear();
    }
    if (anime.year) {
      return anime.year;
    }
    return null;
  };

  const getType = anime => {
    return anime.type || "Unknown";
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

  return (
    <div
      className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/anime/${anime.mal_id || anime.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={getImageUrl(anime)}
            alt={getTitle(anime)}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
            {truncateTitle(getTitle(anime))}
          </h3>

          {getYear(anime) && (
            <p className="text-gray-400 text-xs">{getYear(anime)}</p>
          )}

          {getType(anime) && (
            <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded mt-2">
              {getType(anime)}
            </span>
          )}
        </div>
      </Link>

      {/* Watchlist Button */}
      {showWatchlistButton && (
        <button
          onClick={handleWatchlistToggle}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
            inWatchlist
              ? "bg-red-600 text-white"
              : "bg-black/50 text-white hover:bg-red-600"
          }`}
          title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        >
          {inWatchlist ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
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
          )}
        </button>
      )}

      {/* Play Now Button */}
      <Link
        href={`/watch/${anime.mal_id || anime.id}`}
        className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-full transition-all duration-200 shadow-lg"
        title="Play Now"
        onClick={e => e.stopPropagation()}
      >
        ▶️ Play
      </Link>
    </div>
  );
}
