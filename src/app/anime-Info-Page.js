"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAnimeInfoGogo, getAnimeInfoZoro } from "@/lib/api";

export default function AnimeInfoPage() {
  const params = useParams();
  const animeId = params.id;

  const [animeInfo, setAnimeInfo] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!animeId) return;

    async function fetchAnimeInfo() {
      try {
        setIsLoading(true);
        setError(null);

        // Try both GogoAnime and Zoro
        const gogo = await getAnimeInfoGogo(animeId);
        const zoro = await getAnimeInfoZoro(animeId);

        const info = gogo || zoro;
        if (info) {
          setAnimeInfo(info);

          // episodes agar info ke andar aaye
          if (info.episodes) {
            setEpisodes(info.episodes);
          }
        } else {
          setError("Anime details not found.");
        }
      } catch (err) {
        console.error("Error loading anime info:", err);
        setError("Failed to fetch anime details.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAnimeInfo();
  }, [animeId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Loading anime details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!animeInfo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">No anime info available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Anime Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={animeInfo.image || "/placeholder-anime.jpg"}
          alt={animeInfo.title}
          width={250}
          height={350}
          className="rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{animeInfo.title}</h1>
          <p className="text-gray-300 mb-4">{animeInfo.description}</p>
          <p className="text-gray-400 text-sm mb-2">
            Episodes: {animeInfo.totalEpisodes || "N/A"}
          </p>
          {animeInfo.genres && (
            <p className="text-gray-400 text-sm">
              Genres: {animeInfo.genres.join(", ")}
            </p>
          )}
        </div>
      </div>

      {/* Episodes List */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {episodes.length > 0 ? (
            episodes.map((ep, idx) => (
              <Link
                key={idx}
                href={`/watch/${animeId}-ep-${ep.number || ep.episode}`}
                className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition"
              >
                <h3 className="font-semibold">
                  Episode {ep.number || ep.episode}
                </h3>
                <p className="text-gray-400 text-sm truncate">{ep.title}</p>
              </Link>
            ))
          ) : (
            <p className="text-gray-400">No episodes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
