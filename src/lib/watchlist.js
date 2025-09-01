// // Watchlist utility functions using localStorage

// const WATCHLIST_KEY = "animeflix_watchlist";

// // Get watchlist from localStorage
// export const getWatchlist = () => {
//   if (typeof window === "undefined") return [];

//   try {
//     const watchlist = localStorage.getItem(WATCHLIST_KEY);
//     return watchlist ? JSON.parse(watchlist) : [];
//   } catch (error) {
//     console.error("Error reading watchlist:", error);
//     return [];
//   }
// };

// // Add anime to watchlist
// export const addToWatchlist = anime => {
//   if (typeof window === "undefined") return;

//   try {
//     const watchlist = getWatchlist();
//     const exists = watchlist.find(item => item.id === anime.id);

//     if (!exists) {
//       watchlist.push({
//         ...anime,
//         addedAt: new Date().toISOString(),
//         lastWatched: null,
//         currentEpisode: 1,
//       });
//       localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
//     }
//   } catch (error) {
//     console.error("Error adding to watchlist:", error);
//   }
// };

// // Remove anime from watchlist
// export const removeFromWatchlist = animeId => {
//   if (typeof window === "undefined") return;

//   try {
//     const watchlist = getWatchlist();
//     const filtered = watchlist.filter(item => item.id !== animeId);
//     localStorage.setItem(WATCHLIST_KEY, JSON.stringify(filtered));
//   } catch (error) {
//     console.error("Error removing from watchlist:", error);
//   }
// };

// // Check if anime is in watchlist
// export const isInWatchlist = animeId => {
//   if (typeof window === "undefined") return false;

//   try {
//     const watchlist = getWatchlist();
//     return watchlist.some(item => item.id === animeId);
//   } catch (error) {
//     console.error("Error checking watchlist:", error);
//     return false;
//   }
// };

// // Update last watched episode
// export const updateLastWatched = (animeId, episodeNumber) => {
//   if (typeof window === "undefined") return;

//   try {
//     const watchlist = getWatchlist();
//     const updated = watchlist.map(item =>
//       item.id === animeId
//         ? {
//             ...item,
//             lastWatched: new Date().toISOString(),
//             currentEpisode: episodeNumber,
//           }
//         : item
//     );
//     localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
//   } catch (error) {
//     console.error("Error updating last watched:", error);
//   }
// };

// // Get watchlist count
// export const getWatchlistCount = () => {
//   if (typeof window === "undefined") return 0;

//   try {
//     const watchlist = getWatchlist();
//     return watchlist.length;
//   } catch (error) {
//     console.error("Error getting watchlist count:", error);
//     return 0;
//   }
// };


"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getEpisodeStreaming } from "@/lib/api";
import Player from "@/components/Player";

export default function WatchPage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getEpisodeStreaming(id);
      setEpisode(data);
    }
    fetchData();
  }, [id]);

  if (!episode) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6">
      <Player
        sources={episode.sources}
        poster={episode.image}
        title={`${episode.title} - Episode ${episode.episodeNumber}`}
      />
    </div>
  );
}
