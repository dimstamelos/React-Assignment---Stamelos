import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles/MovieDetailPage.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}`
        );
        if (response.data.Error) {
          setError("Unable to fetch movie details.");
          return;
        }
        setMovie(response.data);
      } catch (err) {
        setError("Unable to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movie-details">
      {movie && (
        <>
          <div className="movie-poster">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"}
              alt={movie.Title}
            />
          </div>
          <div className="movie-info">
            <h1>{movie.Title}</h1>
            <p>
              <strong>Plot:</strong> {movie.Plot}
            </p>
            <p>
              <strong>Cast:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Rating:</strong> {movie.imdbRating}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetailPage;
