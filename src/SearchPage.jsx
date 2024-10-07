import React, { useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import "./styles/global.css";
import "./styles/SearchPage.css";

const SearchPage = ({ addFavorite, favorites }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("default");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_OMDB_API_KEY;
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
      );
      setMovies(response.data.Search || []);
    } catch (err) {
      setError("Unable to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sortMovies = (movies) => {
    switch (sortCriteria) {
      case "yearAsc":
        return [...movies].sort((a, b) => a.Year - b.Year);
      case "yearDesc":
        return [...movies].sort((a, b) => b.Year - a.Year);
      case "titleAsc":
        return [...movies].sort((a, b) => a.Title.localeCompare(b.Title));
      case "titleDesc":
        return [...movies].sort((a, b) => b.Title.localeCompare(a.Title));
      default:
        return movies;
    }
  };

  const sortedMovies = sortMovies(movies);

  return (
    <div className="container">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button onClick={handleSearch}>Search</button>
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="sort-dropdown"
        >
          <option value="default">Sort by</option>
          <option value="yearAsc">Year: Oldest first</option>
          <option value="yearDesc">Year: Newest first</option>
          <option value="titleAsc">Title: A-Z</option>
          <option value="titleDesc">Title: Z-A</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="movie-list">
        {sortedMovies.length > 0
          ? sortedMovies.map((movie) => (
              <div className="movie-card">
                <MovieCard
                  key={movie.imdbID}
                  title={movie.Title}
                  year={movie.Year}
                  poster={movie.Poster}
                  imdbID={movie.imdbID}
                />
                <button onClick={() => addFavorite(movie)}>
                  {favorites.find((fav) => fav.imdbID === movie.imdbID)
                    ? "Favorited"
                    : "Add to Favorites"}
                </button>
              </div>
            ))
          : !loading && <p>No movies found</p>}
      </div>
    </div>
  );
};

export default SearchPage;
