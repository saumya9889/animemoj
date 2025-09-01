"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Player from "@/components/Player";
import { getEpisodeStreamingGogo, getEpisodeStreamingZoro } from "@/lib/api";

export default function WatchPage() {
  const params = useParams();
  const episodeId = params.id;
  const [episodeData, setEpisodeData] = useState(null);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSource, setSelectedSource] = useState("gogo");
  const [gogoData, setGogoData] = useState(null);
  const [zoroData, setZoroData] = useState(null);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      if (!episodeId) return;
      try {
        setIsLoading(true);
        setError(null);

        // Get episode data immediately (no API call needed for demo)
        const [gogo, zoro] = await Promise.all([
          getEpisodeStreamingGogo(episodeId),
          getEpisodeStreamingZoro(episodeId),
        ]);

        setGogoData(gogo);
        setZoroData(zoro);

        if (gogo) {
          setEpisodeData(gogo);
          setAnimeInfo({
            id: gogo.animeId || episodeId,
            title: gogo.animeTitle || "Demo Anime",
            image: gogo.animeImage || null,
          });
        } else if (zoro) {
          setEpisodeData(zoro);
          setAnimeInfo({
            id: zoro.animeId || episodeId,
            title: zoro.animeTitle || "Demo Anime",
            image: zoro.animeImage || null,
          });
          setSelectedSource("zoro");
        } else {
          setError("No episode data available");
        }
      } catch (error) {
        console.error("Error fetching episode data:", error);
        setError("Failed to load episode");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEpisodeData();
  }, [episodeId]);

  const handleSourceChange = source => {
    setSelectedSource(source);
    if (source === "gogo" && gogoData) {
      setEpisodeData(gogoData);
    } else if (source === "zoro" && zoroData) {
      setEpisodeData(zoroData);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading episode...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-white text-2xl font-bold mb-4">
            Error Loading Episode
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

  if (!episodeData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">❌</div>
          <h1 className="text-white text-2xl font-bold mb-4">
            Episode Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The episode you&apos;re looking for doesn&apos;t exist.
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
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-xl font-semibold">
                {animeInfo?.title || "Demo Anime"}
              </h1>
              <p className="text-gray-400 text-sm">
                Episode {episodeData.episode || 1}
              </p>
            </div>

            {/* Source Selector */}
            <div className="flex bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => handleSourceChange("gogo")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedSource === "gogo"
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                GogoAnime
              </button>
              <button
                onClick={() => handleSourceChange("zoro")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  selectedSource === "zoro"
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Zoro
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
          <div className="aspect-video w-full">
            {episodeData &&
            episodeData.sources &&
            episodeData.sources.length > 0 ? (
              <Player
                sources={episodeData.sources}
                poster={animeInfo?.image}
                title={`${animeInfo?.title || "Anime"} - Episode ${
                  episodeData.episode || 1
                }`}
              />
            ) : (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 text-6xl mb-4">📺</div>
                  <h3 className="text-white text-xl font-semibold mb-2">
                    Loading Video Player...
                  </h3>
                  <p className="text-gray-400">
                    Preparing your video player...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Episode Info */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-white text-2xl font-bold mb-4">
            Episode {episodeData.episode || 1}
          </h2>
          {episodeData.title && (
            <p className="text-gray-300 text-lg mb-4">{episodeData.title}</p>
          )}
          <p className="text-gray-400">
            Currently playing from{" "}
            {selectedSource === "gogo" ? "GogoAnime" : "Zoro"} source.
          </p>
        </div>

        {/* Note about Demo */}
        <div className="mt-8 bg-blue-900/20 border border-blue-700 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="text-blue-400 text-xl">ℹ️</div>
            <div>
              <h3 className="text-blue-300 text-lg font-semibold mb-2">
                Demo Mode
              </h3>
              <p className="text-blue-200">
                This is a demo video player. In a real implementation, you would
                integrate with actual streaming services like GogoAnime, Zoro,
                or other anime streaming platforms to get real episode content.
              </p>
              <p className="text-blue-200 mt-2">
                The current video is a placeholder to demonstrate the player
                functionality.
              </p>
            </div>
          </div>
        </div>

        {/* Video Controls Info */}
        <div className="mt-8 bg-green-900/20 border border-green-700 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="text-green-400 text-xl">🎮</div>
            <div>
              <h3 className="text-green-300 text-lg font-semibold mb-2">
                Video Player Controls
              </h3>
              <p className="text-green-200">
                The video player above should be fully functional with:
              </p>
              <ul className="text-green-200 mt-2 list-disc list-inside space-y-1">
                <li>Play/Pause controls</li>
                <li>Volume adjustment</li>
                <li>Fullscreen mode</li>
                <li>Progress bar</li>
                <li>Quality selection (1080p/720p)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Anime Button */}
        <div className="mt-8 text-center">
          <Link
            href={`/anime/${episodeId}`}
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center space-x-2"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to Anime Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
