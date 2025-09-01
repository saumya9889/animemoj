"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getWatchlistCount } from "@/lib/watchlist";

export default function Navbar() {
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const updateWatchlistCount = () => {
      setWatchlistCount(getWatchlistCount());
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", updateWatchlistCount);

    // Initial count
    updateWatchlistCount();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateWatchlistCount);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-sm shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-red-600 text-2xl font-bold">AnimeFlix</div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Search
            </Link>
            <Link
              href="/genres"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Genres
            </Link>
            <Link
              href="/watchlist"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium relative"
            >
              Watchlist
              {watchlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {watchlistCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
