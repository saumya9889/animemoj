import AnimeCard from "./AnimeCard";

export default function AnimeGrid({
  animes,
  title,
  showWatchlistButton = true,
}) {
  if (!animes || animes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No anime found</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {title && <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {animes.map(anime => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            showWatchlistButton={showWatchlistButton}
          />
        ))}
      </div>
    </div>
  );
}
