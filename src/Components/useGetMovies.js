import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/TraktAPI";
import { addMovies, addFeaturedMovie } from "../Utils/movieSlice";

function useGetMovies() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovies = async () => {
      try {
        // Fetch popular movies
        const response = await fetch(
          "https://api.trakt.tv/movies/popular?limit=20&page=1",
          API_OPTIONS
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const movies = await response.json();

        // Store popular movies in Redux
        dispatch(addMovies(movies));

        // Find a movie with a trailer
        for (const movie of movies.slice(10, 20)) {
          const detailsResponse = await fetch(
            `https://api.trakt.tv/movies/${movie.ids.trakt}?extended=full`,
            API_OPTIONS
          );

          if (!detailsResponse.ok) continue;

          const details = await detailsResponse.json();

          if (details.trailer) {
            dispatch(addFeaturedMovie(details));
            break;
          }
        }
      } catch (error) {
        console.error("Movie fetching error:", error);
      }
    };

    getMovies();
  }, [dispatch]);
}

export default useGetMovies;