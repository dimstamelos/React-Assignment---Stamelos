import MovieCard from "./MovieCard";
import "./styles/FavoritePage.css";

const FavoritesPage = ({ removeFavorite, favorites }) => {
  return (
    <div className="favorites-page">
      <h1 className="favorites-title">Your Favorite Movies</h1>
      <div className="movie-list">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <MovieCard
                title={movie.Title}
                year={movie.Year}
                poster={movie.Poster}
                imdbID={movie.imdbID}
              />
              <button
                onClick={() => removeFavorite(movie.imdbID)}
                className="favorite-remove-btn"
              >
                Remove from Favorites
              </button>
            </div>
          ))
        ) : (
          <p className="no-favorites">No favorite movies added.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
