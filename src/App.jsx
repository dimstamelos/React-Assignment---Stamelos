import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import MovieDetailPage from "./MovieDetailPage";
import FavoritesPage from "./FavoritesPage";
import NavBar from "./NavBar";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const addFavorite = (movie) => {
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      const updatedData = [...favorites, movie];
      setFavorites(updatedData);
      localStorage.setItem("favorites", JSON.stringify(updatedData));
    }
  };

  const removeFavorite = (id) => {
    const updatedData = favorites.filter((fav) => fav.imdbID !== id);
    setFavorites(updatedData);
    localStorage.setItem("favorites", JSON.stringify(updatedData));
  };

  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage addFavorite={addFavorite} favorites={favorites} />
            }
          />
          <Route
            path="/movie/:id"
            element={
              <MovieDetailPage
                addFavorite={addFavorite}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                removeFavorite={removeFavorite}
                favorites={favorites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
