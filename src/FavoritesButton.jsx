import { useState, useEffect } from "react";

const FavoriteButton = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorited = savedFavorites.some(
      (favMovie) => favMovie.imdbID === movie.imdbID
    );
    setIsFavorite(isFavorited);
  }, [movie]);

  const toggleFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updatedFavorites = savedFavorites.filter(
        (favMovie) => favMovie.imdbID !== movie.imdbID
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      savedFavorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(savedFavorites));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
