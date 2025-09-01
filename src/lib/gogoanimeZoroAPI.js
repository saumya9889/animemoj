// Real GogoAnime and Zoro API Integration
// This file provides actual API calls to real anime streaming platforms

const GOGOANIME_BASE_URL = "https://gogocdn.net";
const ZORO_BASE_URL = "https://aniwatch.to";
const GOGOANIME_API_BASE = "https://api.gogoanime.gr";

// Helper function to make HTTP requests
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error(`Error making request to ${url}:`, error);
    throw error;
  }
}

// GogoAnime API Functions
export class GogoAnimeAPI {
  constructor() {
    this.baseUrl = GOGOANIME_BASE_URL;
    this.apiBase = GOGOANIME_API_BASE;
  }

  // Search anime on GogoAnime
  async searchAnime(query) {
    try {
      const searchUrl = `${this.apiBase}/search?q=${encodeURIComponent(query)}`;
      const response = await makeRequest(searchUrl);

      // Parse the response (GogoAnime returns HTML, need to extract data)
      // This is a simplified version - in production you'd use proper HTML parsing
      return this.parseSearchResults(response);
    } catch (error) {
      console.error("Error searching GogoAnime:", error);
      return [];
    }
  }

  // Get anime info from GogoAnime
  async getAnimeInfo(animeId) {
    try {
      const infoUrl = `${this.apiBase}/anime/${animeId}`;
      const response = await makeRequest(infoUrl);

      return this.parseAnimeInfo(response);
    } catch (error) {
      console.error("Error getting GogoAnime anime info:", error);
      return null;
    }
  }

  // Get episode list from GogoAnime
  async getEpisodeList(animeId) {
    try {
      const episodesUrl = `${this.apiBase}/anime/${animeId}/episodes`;
      const response = await makeRequest(episodesUrl);

      return this.parseEpisodeList(response);
    } catch (error) {
      console.error("Error getting GogoAnime episode list:", error);
      return [];
    }
  }

  // Get streaming URL for a specific episode
  async getEpisodeStreamingUrl(animeId, episodeNumber) {
    try {
      const streamingUrl = `${
        this.baseUrl
      }/streaming.php?id=${animeId}&title=${encodeURIComponent(
        animeId
      )}&typesub=SUB&sub=&cover=${this.baseUrl}/cover/${animeId}.png`;

      // Make request to get the actual streaming page
      const response = await makeRequest(streamingUrl);

      // Extract the actual video URL from the streaming page
      return this.extractVideoUrl(response);
    } catch (error) {
      console.error("Error getting GogoAnime streaming URL:", error);
      return null;
    }
  }

  // Parse search results from HTML response
  parseSearchResults(html) {
    // This is a simplified parser - in production you'd use a proper HTML parser
    const results = [];

    // Extract anime titles and IDs from the HTML
    // This is a basic example - real implementation would be more sophisticated
    const titleMatches = html.match(/<h3[^>]*>([^<]+)<\/h3>/g);
    const idMatches = html.match(/href="\/anime\/([^"]+)"/g);

    if (titleMatches && idMatches) {
      for (
        let i = 0;
        i < Math.min(titleMatches.length, idMatches.length);
        i++
      ) {
        const title = titleMatches[i].replace(/<[^>]*>/g, "").trim();
        const id = idMatches[i].match(/\/anime\/([^"]+)/)[1];

        results.push({
          id,
          title,
          url: `${this.apiBase}/anime/${id}`,
          source: "GogoAnime",
        });
      }
    }

    return results;
  }

  // Parse anime info from HTML response
  parseAnimeInfo(html) {
    // Extract anime information from HTML
    // This is a simplified version
    const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const descriptionMatch = html.match(
      /<p[^>]*class="[^"]*synopsis[^"]*"[^>]*>([^<]+)<\/p>/
    );

    return {
      title: titleMatch ? titleMatch[1].trim() : "Unknown",
      description: descriptionMatch
        ? descriptionMatch[1].trim()
        : "No description available",
      source: "GogoAnime",
    };
  }

  // Parse episode list from HTML response
  parseEpisodeList(html) {
    // Extract episode information from HTML
    const episodes = [];
    const episodeMatches = html.match(
      /href="[^"]*episode-(\d+)[^"]*"[^>]*>([^<]+)</g
    );

    if (episodeMatches) {
      episodeMatches.forEach(match => {
        const episodeNumber = match.match(/episode-(\d+)/)[1];
        const title = match.match(/>([^<]+)</)[1];

        episodes.push({
          episode: parseInt(episodeNumber),
          title: title.trim(),
          url: `${this.baseUrl}/episode-${episodeNumber}`,
        });
      });
    }

    return episodes.sort((a, b) => a.episode - b.episode);
  }

  // Extract actual video URL from streaming page
  extractVideoUrl(html) {
    // Extract the actual video source URL
    // This is a simplified version - real implementation would be more sophisticated
    const videoMatch = html.match(/<source[^>]*src="([^"]+)"[^>]*>/);
    const iframeMatch = html.match(/<iframe[^>]*src="([^"]+)"[^>]*>/);

    if (videoMatch) {
      return videoMatch[1];
    } else if (iframeMatch) {
      return iframeMatch[1];
    }

    return null;
  }
}

// Zoro API Functions
export class ZoroAPI {
  constructor() {
    this.baseUrl = ZORO_BASE_URL;
  }

  // Search anime on Zoro
  async searchAnime(query) {
    try {
      const searchUrl = `${this.baseUrl}/search?keyword=${encodeURIComponent(
        query
      )}`;
      const response = await makeRequest(searchUrl);

      return this.parseZoroSearchResults(response);
    } catch (error) {
      console.error("Error searching Zoro:", error);
      return [];
    }
  }

  // Get anime info from Zoro
  async getAnimeInfo(animeId) {
    try {
      const infoUrl = `${this.baseUrl}/watch/${animeId}`;
      const response = await makeRequest(infoUrl);

      return this.parseZoroAnimeInfo(response);
    } catch (error) {
      console.error("Error getting Zoro anime info:", error);
      return null;
    }
  }

  // Get episode list from Zoro
  async getEpisodeList(animeId) {
    try {
      const episodesUrl = `${this.baseUrl}/watch/${animeId}`;
      const response = await makeRequest(episodesUrl);

      return this.parseZoroEpisodeList(response);
    } catch (error) {
      console.error("Error getting Zoro episode list:", error);
      return [];
    }
  }

  // Get streaming URL for a specific episode
  async getEpisodeStreamingUrl(animeId, episodeNumber) {
    try {
      const streamingUrl = `${this.baseUrl}/watch/${animeId}?ep=${episodeNumber}`;
      const response = await makeRequest(streamingUrl);

      return this.extractZoroVideoUrl(response);
    } catch (error) {
      console.error("Error getting Zoro streaming URL:", error);
      return null;
    }
  }

  // Parse Zoro search results
  parseZoroSearchResults(html) {
    const results = [];

    // Extract anime information from Zoro HTML
    const animeMatches = html.match(
      /<div[^>]*class="[^"]*anime-card[^"]*"[^>]*>([\s\S]*?)<\/div>/g
    );

    if (animeMatches) {
      animeMatches.forEach(match => {
        const titleMatch = match.match(/<h3[^>]*>([^<]+)<\/h3>/);
        const idMatch = match.match(/href="\/watch\/([^"]+)"/);

        if (titleMatch && idMatch) {
          results.push({
            id: idMatch[1],
            title: titleMatch[1].trim(),
            url: `${this.baseUrl}/watch/${idMatch[1]}`,
            source: "Zoro",
          });
        }
      });
    }

    return results;
  }

  // Parse Zoro anime info
  parseZoroAnimeInfo(html) {
    const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    const descriptionMatch = html.match(
      /<div[^>]*class="[^"]*description[^"]*"[^>]*>([^<]+)<\/div>/
    );

    return {
      title: titleMatch ? titleMatch[1].trim() : "Unknown",
      description: descriptionMatch
        ? descriptionMatch[1].trim()
        : "No description available",
      source: "Zoro",
    };
  }

  // Parse Zoro episode list
  parseZoroEpisodeList(html) {
    const episodes = [];
    const episodeMatches = html.match(
      /href="[^"]*ep=(\d+)[^"]*"[^>]*>([^<]+)</g
    );

    if (episodeMatches) {
      episodeMatches.forEach(match => {
        const episodeNumber = match.match(/ep=(\d+)/)[1];
        const title = match.match(/>([^<]+)</)[1];

        episodes.push({
          episode: parseInt(episodeNumber),
          title: title.trim(),
          url: `${this.baseUrl}/ep=${episodeNumber}`,
        });
      });
    }

    return episodes.sort((a, b) => a.episode - b.episode);
  }

  // Extract Zoro video URL
  extractZoroVideoUrl(html) {
    const videoMatch = html.match(/<source[^>]*src="([^"]+)"[^>]*>/);
    const iframeMatch = html.match(/<iframe[^>]*src="([^"]+)"[^>]*>/);

    if (videoMatch) {
      return videoMatch[1];
    } else if (iframeMatch) {
      return iframeMatch[1];
    }

    return null;
  }
}

// Create and export API instances
export const gogoAnimeAPI = new GogoAnimeAPI();
export const zoroAPI = new ZoroAPI();

// Combined search function
export async function searchBothPlatforms(query) {
  try {
    const [gogoResults, zoroResults] = await Promise.all([
      gogoAnimeAPI.searchAnime(query),
      zoroAPI.searchAnime(query),
    ]);

    return [...gogoResults, ...zoroResults];
  } catch (error) {
    console.error("Error searching both platforms:", error);
    return [];
  }
}

// Get streaming URLs from both platforms
export async function getStreamingUrlsFromBoth(animeId, episodeNumber) {
  try {
    const [gogoUrl, zoroUrl] = await Promise.all([
      gogoAnimeAPI.getEpisodeStreamingUrl(animeId, episodeNumber),
      zoroAPI.getEpisodeStreamingUrl(animeId, episodeNumber),
    ]);

    return {
      gogoanime: gogoUrl,
      zoro: zoroUrl,
    };
  } catch (error) {
    console.error("Error getting streaming URLs from both platforms:", error);
    return {
      gogoanime: null,
      zoro: null,
    };
  }
}
