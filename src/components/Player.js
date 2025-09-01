"use client";

import { useState, useEffect } from "react";

export default function Player({ sources, poster, title }) {
  const [currentSource, setCurrentSource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debug logging
  useEffect(() => {
    console.log("Player component received props:", { sources, poster, title });
  }, [sources, poster, title]);

  useEffect(() => {
    console.log("Sources in Player:", sources);
    if (sources && sources.length > 0) {
      // Prefer HD sources, fallback to first available
      const hdSource = sources.find(
        source => source.quality === "1080p" || source.quality === "720p"
      );
      setCurrentSource(hdSource || sources[0]);
      setIsLoading(false);
    } else {
      console.log("No sources available, setting error");
      setError("No video sources available");
      setIsLoading(false);
    }
  }, [sources]);

  const handleSourceChange = source => {
    setCurrentSource(source);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-white text-2xl font-bold mb-4">Video Error</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <p className="text-gray-300 text-sm">
            Please check your internet connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black">
      {/* Video Player */}
      <div className="relative w-full h-full">
        {currentSource && currentSource.url && (
          <div className="w-full h-full">
            {currentSource.url.includes("youtube.com") ||
            currentSource.url.includes("youtu.be") ? (
              <iframe
                src={currentSource.url}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={title || "Video Player"}
              />
            ) : (
              <video
                key={currentSource.url}
                className="w-full h-full"
                controls
                autoPlay
                preload="metadata"
                poster={poster}
              >
                <source src={currentSource.url} type="video/mp4" />
                <source src={currentSource.url} type="video/webm" />
                <source src={currentSource.url} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        {/* Quality Selector Overlay */}
        {sources && sources.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/80 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <span className="text-white text-sm font-medium">Quality:</span>
              <select
                value={currentSource?.url || ""}
                onChange={e => {
                  const source = sources.find(s => s.url === e.target.value);
                  if (source) handleSourceChange(source);
                }}
                className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 text-sm"
              >
                {sources.map((source, index) => (
                  <option key={index} value={source.url}>
                    {source.quality || `${index + 1}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Video Title Overlay */}
        {title && (
          <div className="absolute bottom-4 left-4 bg-black/80 rounded-lg p-3 max-w-md">
            <h3 className="text-white text-sm font-medium truncate">{title}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
