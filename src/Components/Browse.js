import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import useGetMovies  from "../Components/useGetMovies";
import { useSelector } from "react-redux";

function Browse() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const {movieList,featuredMovie} = useSelector((store)=> store.movieReducer)
  useGetMovies();

  // Convert YouTube URL into video ID
  const getVideoId = (url) => {
    if (!url) return null;

    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.slice(1);
      }

      if (parsedUrl.hostname.includes("youtube.com")) {
        return parsedUrl.searchParams.get("v");
      }

      return null;
    } catch {
      return null;
    }
  };

  const videoId = getVideoId(featuredMovie?.trailer);

  return (
    <div className="relative min-h-screen bg-black text-white">

      {/* Profile and Logout */}
      <div className="absolute top-5 right-5 z-30 flex items-center gap-3">
        <div className="w-10 h-10 bg-yellow-400 rounded flex items-center justify-center text-2xl">
          😊
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Featured Movie Trailer */}
      <div className="relative h-screen w-full overflow-hidden">

        {videoId ? (
          <iframe
            className="absolute inset-0 h-full w-full pointer-events-none"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            Loading trailer...
          </div>
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none" />

        {/* Featured Movie Details */}
        {featuredMovie && (
          <div className="absolute left-12 top-2/4 z-10 max-w-xl">
            <h1 className="text-5xl font-bold">
              {featuredMovie.title}
            </h1>

            <p className="mt-4 text-sm">
              {featuredMovie.overview}
            </p>

            <button className="mt-6 mr-2 rounded bg-gray-400 px-4 py-3 font-bold text-black hover:backdrop-grayscale">
              ▶ Play
            </button>
            <button className="mt-6 rounded bg-gray-900 px-4 py-3 font-bold text-white hover:backdrop-grayscale">
              ⓘ info
            </button>
          </div>
        )}
      </div>

      {/* Popular Movies */}
      <div className="px-8 py-6">
        <h2 className="mb-4 text-2xl font-bold">
          Popular Movies
        </h2>

        <div className="flex gap-4 overflow-x-auto">
          {movieList.map((movie) => (
            <div key={movie.ids.trakt} className="min-w-40">
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Browse;