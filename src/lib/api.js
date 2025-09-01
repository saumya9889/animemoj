// import { getEpisodeStreamingSources } from "./realAnimeStreaming";
// import {
//   gogoAnimeAPI,
//   zoroAPI,
//   searchBothPlatforms,
//   getStreamingUrlsFromBoth,
// } from "./gogoanimeZoroAPI";
// import {
//   getFreeEpisodeStreaming,
//   getAllFreeAnime,
//   searchFreeAnime,
// } from "./freeAnimeStreaming";

// const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

// // Rate limiting helper with exponential backoff
// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// // Simple cache to avoid repeated API calls
// const cache = new Map();
// const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// // Cache helper functions
// const getCachedData = key => {
//   const cached = cache.get(key);
//   if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
//     return cached.data;
//   }
//   return null;
// };

// const setCachedData = (key, data) => {
//   cache.set(key, {
//     data,
//     timestamp: Date.now(),
//   });
// };

// // Enhanced fetch with retry logic for rate limiting
// async function fetchWithRetry(url, options = {}, maxRetries = 3) {
//   for (let attempt = 1; attempt <= maxRetries; attempt++) {
//     try {
//       // Add delay based on attempt number to avoid rate limiting
//       const delayMs = attempt === 1 ? 1000 : Math.pow(2, attempt) * 1000;
//       await delay(delayMs);

//       const response = await fetch(url, options);

//       if (response.status === 429) {
//         if (attempt === maxRetries) {
//           throw new Error(
//             "Rate limit exceeded. Please wait a moment and try again."
//           );
//         }
//         // Wait longer before retrying
//         await delay(5000);
//         continue;
//       }

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       return response;
//     } catch (error) {
//       if (attempt === maxRetries) {
//         throw error;
//       }
//       // Wait before retrying
//       await delay(2000);
//     }
//   }
// }

// // Get popular anime from MyAnimeList
// export const getPopularAnime = async () => {
//   try {
//     const cacheKey = "popular_anime";
//     const cachedData = getCachedData(cacheKey);
//     if (cachedData) {
//       return cachedData;
//     }

//     const response = await fetchWithRetry(
//       `${JIKAN_BASE_URL}/top/anime?filter=bypopularity&limit=20`
//     );
//     const data = await response.json();
//     const result = { data: data.data || [] };

//     setCachedData(cacheKey, result);
//     return result;
//   } catch (error) {
//     console.error("Error fetching popular anime:", error);
//     // Fallback to free anime streaming service
//     const freeAnime = getAllFreeAnime();
//     return { data: freeAnime };
//   }
// };

// // Get trending anime from MyAnimeList
// export const getTrendingAnime = async () => {
//   try {
//     const cacheKey = "trending_anime";
//     const cachedData = getCachedData(cacheKey);
//     if (cachedData) {
//       return cachedData;
//     }

//     const response = await fetchWithRetry(
//       `${JIKAN_BASE_URL}/seasons/now?limit=20`
//     );
//     const data = await response.json();
//     const result = { data: data.data || [] };

//     setCachedData(cacheKey, result);
//     return result;
//   } catch (error) {
//     console.error("Error fetching trending anime:", error);
//     // Fallback to free anime streaming service
//     const freeAnime = getAllFreeAnime();
//     return { data: freeAnime };
//   }
// };

// // Search anime using both GogoAnime and Zoro APIs
// export const searchAnimeGogo = async query => {
//   try {
//     console.log("Searching GogoAnime for:", query);
//     const results = await gogoAnimeAPI.searchAnime(query);
//     console.log("GogoAnime search results:", results);
//     return { data: results };
//   } catch (error) {
//     console.error("Error searching GogoAnime:", error);
//     // Fallback to free anime streaming service
//     const freeResults = searchFreeAnime(query);
//     return { data: freeResults };
//   }
// };

// // Search anime using Zoro API
// export const searchAnimeZoro = async query => {
//   try {
//     console.log("Searching Zoro for:", query);
//     const results = await zoroAPI.searchAnime(query);
//     console.log("Zoro search results:", results);
//     return { data: results };
//   } catch (error) {
//     console.error("Error searching Zoro:", error);
//     // Fallback to free anime streaming service
//     const freeResults = searchFreeAnime(query);
//     return { data: freeResults };
//   }
// };

// // Search both platforms simultaneously
// export const searchAnimeBoth = async query => {
//   try {
//     console.log("Searching both platforms for:", query);
//     const results = await searchBothPlatforms(query);
//     console.log("Combined search results:", results);
//     return { data: results };
//   } catch (error) {
//     console.error("Error searching both platforms:", error);
//     // Fallback to free anime streaming service
//     const freeResults = searchFreeAnime(query);
//     return { data: freeResults };
//   }
// };

// // Get recent episodes (currently airing anime)
// export const getRecentEpisodesGogo = async () => {
//   try {
//     const cacheKey = "recent_episodes";
//     const cachedData = getCachedData(cacheKey);
//     if (cachedData) {
//       return cachedData;
//     }

//     const response = await fetchWithRetry(
//       `${JIKAN_BASE_URL}/seasons/now?limit=20`
//     );
//     const data = await response.json();
//     const result = { data: data.data || [] };

//     setCachedData(cacheKey, result);
//     return result;
//   } catch (error) {
//     console.error("Error fetching recent episodes:", error);
//     // Fallback to free anime streaming service
//     const freeAnime = getAllFreeAnime();
//     return { data: freeAnime };
//   }
// };

// // Get top airing anime
// export const getTopAiringGogo = async () => {
//   try {
//     const cacheKey = "top_airing";
//     const cachedData = getCachedData(cacheKey);
//     if (cachedData) {
//       return cachedData;
//     }

//     const response = await fetchWithRetry(
//       `${JIKAN_BASE_URL}/top/anime?filter=airing&limit=20`
//     );
//     const data = await response.json();
//     const result = { data: data.data || [] };

//     setCachedData(cacheKey, result);
//     return result;
//   } catch (error) {
//     console.error("Error fetching top airing anime:", error);
//     // Fallback to free anime streaming service
//     const freeAnime = getAllFreeAnime();
//     return { data: freeAnime };
//   }
// };

// // Get anime by genre
// export const getAnimeByGenre = async genre => {
//   try {
//     const cacheKey = `genre_${genre}`;
//     const cachedData = getCachedData(cacheKey);
//     if (cachedData) {
//       return cachedData;
//     }

//     const response = await fetchWithRetry(
//       `${JIKAN_BASE_URL}/anime?genres=${genre}&order_by=popularity&limit=20`
//     );
//     const data = await response.json();
//     const result = { data: data.data || [] };

//     setCachedData(cacheKey, result);
//     return result;
//   } catch (error) {
//     console.error("Error fetching anime by genre:", error);
//     // Fallback to free anime streaming service
//     const freeAnime = getAllFreeAnime();
//     return { data: freeAnime };
//   }
// };

// // Get anime info from MyAnimeList with caching and better rate limiting
// export const getAnimeInfoGogo = async id => {
//   try {
//     // Check cache first
//     const cacheKey = `anime_${id}`;
//     const cachedData = getCachedData(cacheKey);
//     if (cachedData) {
//       return cachedData;
//     }

//     const response = await fetchWithRetry(`${JIKAN_BASE_URL}/anime/${id}/full`);
//     const data = await response.json();
//     const result = data.data || null;

//     if (result) {
//       setCachedData(cacheKey, result);
//     }
//     return result;
//   } catch (error) {
//     console.error("Error fetching anime info:", error);
//     throw error; // Re-throw to handle in component
//   }
// };

// export const getAnimeInfoZoro = async id => {
//   return getAnimeInfoGogo(id); // Alias for consistency
// };

// // Get episode streaming links from GogoAnime
// export const getEpisodeStreamingGogo = async episodeId => {
//   try {
//     console.log("getEpisodeStreamingGogo called with episodeId:", episodeId);

//     // First try to get from free anime streaming service
//     const freeEpisodeData = getFreeEpisodeStreaming(episodeId);
//     if (freeEpisodeData) {
//       console.log("Free anime streaming data found:", freeEpisodeData);
//       return freeEpisodeData;
//     }

//     // Try to get real streaming URL from GogoAnime API
//     const animeId = episodeId.split("-")[0]; // Extract anime ID from episode ID
//     const episodeNumber = episodeId.split("-ep-")[1]; // Extract episode number

//     if (animeId && episodeNumber) {
//       console.log("Attempting to get real streaming URL from GogoAnime...");
//       const realStreamingUrl = await gogoAnimeAPI.getEpisodeStreamingUrl(
//         animeId,
//         episodeNumber
//       );

//       if (realStreamingUrl) {
//         console.log("Real GogoAnime streaming URL found:", realStreamingUrl);
//         return {
//           id: episodeId,
//           episode: parseInt(episodeNumber),
//           title: `Episode ${episodeNumber}`,
//           animeId: animeId,
//           animeTitle: animeId.charAt(0).toUpperCase() + animeId.slice(1),
//           animeImage: `https://cdn.myanimelist.net/images/anime/13/17405.jpg`,
//           sources: [
//             {
//               url: realStreamingUrl,
//               quality: "1080p",
//               isM3U8: false,
//               type: "gogoanime",
//               server: "GogoAnime",
//               isWorking: true,
//             },
//           ],
//           subtitles: [{ language: "English", url: "#" }],
//         };
//       }
//     }

//     // Fallback to our structured data if real API fails
//     console.log("Falling back to structured data...");
//     const episodeData = await getEpisodeStreamingSources(episodeId);

//     if (episodeData) {
//       console.log(
//         "getEpisodeStreamingGogo returning structured data:",
//         episodeData
//       );
//       return episodeData;
//     } else {
//       // Fallback to a default episode if none found
//       const defaultEpisode = await getEpisodeStreamingSources("naruto-ep-1");
//       console.log("getEpisodeStreamingGogo returning default:", defaultEpisode);
//       return defaultEpisode;
//     }
//   } catch (error) {
//     console.error("Error fetching episode streaming:", error);
//     return null;
//   }
// };

// // Get episode streaming links from Zoro
// export const getEpisodeStreamingZoro = async episodeId => {
//   try {
//     console.log("getEpisodeStreamingZoro called with episodeId:", episodeId);

//     // First try to get from free anime streaming service
//     const freeEpisodeData = getFreeEpisodeStreaming(episodeId);
//     if (freeEpisodeData) {
//       console.log("Free anime streaming data found:", freeEpisodeData);
//       return freeEpisodeData;
//     }

//     // Try to get real streaming URL from Zoro API
//     const animeId = episodeId.split("-")[0]; // Extract anime ID from episode ID
//     const episodeNumber = episodeId.split("-ep-")[1]; // Extract episode number

//     if (animeId && episodeNumber) {
//       console.log("Attempting to get real streaming URL from Zoro...");
//       const realStreamingUrl = await zoroAPI.getEpisodeStreamingUrl(
//         animeId,
//         episodeNumber
//       );

//       if (realStreamingUrl) {
//         console.log("Real Zoro streaming URL found:", realStreamingUrl);
//         return {
//           id: episodeId,
//           episode: parseInt(episodeNumber),
//           title: `Episode ${episodeNumber}`,
//           animeId: animeId,
//           animeTitle: animeId.charAt(0).toUpperCase() + animeId.slice(1),
//           animeImage: `https://cdn.myanimelist.net/images/anime/13/17405.jpg`,
//           sources: [
//             {
//               url: realStreamingUrl,
//               quality: "720p",
//               isM3U8: false,
//               type: "zoro",
//               server: "Zoro",
//               isWorking: true,
//             },
//           ],
//           subtitles: [{ language: "English", url: "#" }],
//         };
//       }
//     }

//     // Fallback to our structured data if real API fails
//     console.log("Falling back to structured data...");
//     const episodeData = await getEpisodeStreamingSources(episodeId);

//     if (episodeData) {
//       console.log(
//         "getEpisodeStreamingZoro returning structured data:",
//         episodeData
//       );
//       return episodeData;
//     } else {
//       // Fallback to a default episode if none found
//       const defaultEpisode = await getEpisodeStreamingSources("naruto-ep-1");
//       console.log("getEpisodeStreamingZoro returning default:", defaultEpisode);
//       return defaultEpisode;
//     }
//   } catch (error) {
//     console.error("Error fetching episode streaming:", error);
//     return null;
//   }
// };

// // Get streaming URLs from both platforms
// export const getStreamingUrlsFromBothPlatforms = async (
//   animeId,
//   episodeNumber
// ) => {
//   try {
//     console.log(
//       "Getting streaming URLs from both platforms for:",
//       animeId,
//       "episode",
//       episodeNumber
//     );
//     const urls = await getStreamingUrlsFromBoth(animeId, episodeNumber);
//     console.log("Streaming URLs from both platforms:", urls);
//     return urls;
//   } catch (error) {
//     console.error("Error getting streaming URLs from both platforms:", error);
//     return { gogoanime: null, zoro: null };
//   }
// };

// // NEW: Get free anime streaming data
// export const getFreeAnimeStreaming = () => {
//   return getAllFreeAnime();
// };

// // NEW: Search free anime
// export const searchFreeAnimeStreaming = query => {
//   return searchFreeAnime(query);
// };

// // NEW: Get free episode streaming
// export const getFreeEpisodeStreamingData = episodeId => {
//   return getFreeEpisodeStreaming(episodeId);
// };



// lib/api.js

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { searchAnime } from "@/lib/api";


export default function HomePage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    const data = await searchAnime(query);
    setResults(data.results || []);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">AnimeFlix</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded text-black"
        />
        <button type="submit" className="ml-2 bg-red-600 px-4 py-2 rounded">
          Search
        </button>
      </form>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((anime) => (
          <Link key={anime.id} href={`/anime/${anime.id}`}>
            <div className="bg-gray-800 p-3 rounded hover:bg-gray-700">
              <img
                src={anime.image}
                alt={anime.title}
                className="w-full h-64 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{anime.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
