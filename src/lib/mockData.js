// Mock anime data for development and testing
const mockAnimeData = {
  trending: [
    {
      id: "1",
      title: "Demon Slayer: Kimetsu no Yaiba",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description:
        "A young boy named Tanjiro becomes a demon slayer after his family is attacked by demons.",
      releaseDate: "2019-04-06",
      type: "TV",
      status: "Ongoing",
      genres: ["Action", "Fantasy", "Supernatural"],
      totalEpisodes: 26,
    },
    {
      id: "2",
      title: "Attack on Titan",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description:
        "Humanity's last stand against giant humanoid creatures known as Titans.",
      releaseDate: "2013-04-07",
      type: "TV",
      status: "Completed",
      genres: ["Action", "Drama", "Fantasy"],
      totalEpisodes: 25,
    },
    {
      id: "3",
      title: "My Hero Academia",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description:
        "In a world where people have superpowers, a boy without powers dreams of becoming a hero.",
      releaseDate: "2016-04-03",
      type: "TV",
      status: "Ongoing",
      genres: ["Action", "Comedy", "Superhero"],
      totalEpisodes: 138,
    },
    {
      id: "4",
      title: "One Piece",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description:
        "A pirate adventure following Monkey D. Luffy and his crew in search of the ultimate treasure.",
      releaseDate: "1999-10-20",
      type: "TV",
      status: "Ongoing",
      genres: ["Action", "Adventure", "Comedy"],
      totalEpisodes: 1000,
    },
    {
      id: "5",
      title: "Naruto",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description:
        "A young ninja seeks to become the strongest ninja in his village.",
      releaseDate: "2002-10-03",
      type: "TV",
      status: "Completed",
      genres: ["Action", "Adventure", "Fantasy"],
      totalEpisodes: 720,
    },
    {
      id: "6",
      title: "Death Note",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description:
        "A high school student finds a supernatural notebook that can kill anyone whose name is written in it.",
      releaseDate: "2006-10-03",
      type: "TV",
      status: "Completed",
      genres: ["Mystery", "Psychological", "Thriller"],
      totalEpisodes: 37,
    },
  ],
  popular: [
    {
      id: "7",
      title: "Fullmetal Alchemist: Brotherhood",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description:
        "Two brothers seek to restore their bodies after a failed alchemy experiment.",
      releaseDate: "2009-04-05",
      type: "TV",
      status: "Completed",
      genres: ["Action", "Adventure", "Drama"],
      totalEpisodes: 64,
    },
    {
      id: "8",
      title: "Hunter x Hunter",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description:
        "A young boy embarks on a journey to become a Hunter and find his father.",
      releaseDate: "2011-10-02",
      type: "TV",
      status: "Completed",
      genres: ["Action", "Adventure", "Fantasy"],
      totalEpisodes: 148,
    },
    {
      id: "9",
      title: "Steins;Gate",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description:
        "A scientist accidentally discovers time travel and must prevent a dystopian future.",
      releaseDate: "2011-04-06",
      type: "TV",
      status: "Completed",
      genres: ["Sci-Fi", "Thriller", "Drama"],
      totalEpisodes: 24,
    },
    {
      id: "10",
      title: "Code Geass",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description:
        "A prince gains the power to control anyone and seeks revenge against the empire.",
      releaseDate: "2006-10-06",
      type: "TV",
      status: "Completed",
      genres: ["Action", "Mecha", "Drama"],
      totalEpisodes: 25,
    },
  ],
  recent: [
    {
      id: "11",
      title: "Jujutsu Kaisen",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "A boy becomes a sorcerer to save his friend from a curse.",
      releaseDate: "2020-10-03",
      type: "TV",
      status: "Ongoing",
      genres: ["Action", "Fantasy", "Horror"],
      totalEpisodes: 24,
    },
    {
      id: "12",
      title: "Spy x Family",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      description: "A spy must form a fake family to complete his mission.",
      releaseDate: "2022-04-09",
      type: "TV",
      status: "Ongoing",
      genres: ["Action", "Comedy", "Drama"],
      totalEpisodes: 25,
    },
  ],
};

// Mock anime info
const mockAnimeInfo = {
  1: {
    id: "1",
    title: "Demon Slayer: Kimetsu no Yaiba",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    description:
      "A young boy named Tanjiro becomes a demon slayer after his family is attacked by demons. He sets out on a journey to save his sister and avenge his family.",
    releaseDate: "2019-04-06",
    type: "TV",
    status: "Ongoing",
    genres: ["Action", "Fantasy", "Supernatural", "Drama"],
    totalEpisodes: 26,
    otherNames: ["鬼滅の刃", "Kimetsu no Yaiba"],
    episodes: [
      { id: "ep1", number: 1, title: "Cruelty" },
      { id: "ep2", number: 2, title: "Trainer Sakonji Urokodaki" },
      { id: "ep3", number: 3, title: "Sabito and Makomo" },
      { id: "ep4", number: 4, title: "Final Selection" },
      { id: "ep5", number: 5, title: "My Own Steel" },
    ],
  },
  2: {
    id: "2",
    title: "Attack on Titan",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    description:
      "Humanity's last stand against giant humanoid creatures known as Titans. The story follows Eren Yeager and his friends as they join the military to fight the Titans.",
    releaseDate: "2013-04-07",
    type: "TV",
    status: "Completed",
    genres: ["Action", "Drama", "Fantasy", "Horror"],
    totalEpisodes: 25,
    otherNames: ["進撃の巨人", "Shingeki no Kyojin"],
    episodes: [
      { id: "ep1", number: 1, title: "To You, 2,000 Years From Now" },
      { id: "ep2", number: 2, title: "That Day" },
      { id: "ep3", number: 3, title: "A Dim Light Amid Despair" },
      { id: "ep4", number: 4, title: "The Night of the Closing Ceremony" },
      { id: "ep5", number: 5, title: "First Battle" },
    ],
  },
};

// Mock episode streaming data
const mockEpisodeData = {
  ep1: {
    id: "ep1",
    episode: 1,
    title: "Cruelty",
    animeId: "1",
    animeTitle: "Demon Slayer: Kimetsu no Yaiba",
    animeImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    sources: [
      {
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        quality: "1080p",
        isM3U8: false,
      },
    ],
  },
  ep2: {
    id: "ep2",
    episode: 2,
    title: "Trainer Sakonji Urokodaki",
    animeId: "1",
    animeTitle: "Demon Slayer: Kimetsu no Yaiba",
    animeImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    sources: [
      {
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        quality: "1080p",
        isM3U8: false,
      },
    ],
  },
};

// Mock search results
const mockSearchResults = {
  demon: [
    {
      id: "1",
      title: "Demon Slayer: Kimetsu no Yaiba",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      releaseDate: "2019-04-06",
      type: "TV",
    },
  ],
  attack: [
    {
      id: "2",
      title: "Attack on Titan",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
      releaseDate: "2013-04-07",
      type: "TV",
    },
  ],
};

export const getMockTrendingAnime = () => mockAnimeData.trending;
export const getMockPopularAnime = () => mockAnimeData.popular;
export const getMockRecentAnime = () => mockAnimeData.recent;
export const getMockAnimeInfo = id => mockAnimeInfo[id] || null;
export const getMockEpisodeData = episodeId =>
  mockEpisodeData[episodeId] || null;
export const getMockSearchResults = query => {
  const lowerQuery = query.toLowerCase();
  const results = [];

  Object.keys(mockSearchResults).forEach(key => {
    if (key.includes(lowerQuery) || lowerQuery.includes(key)) {
      results.push(...mockSearchResults[key]);
    }
  });

  return results;
};
