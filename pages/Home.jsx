import React from "react";
import Popular from "./Popular";

const Home = ({
  addToFavCard,
  movies,
  setMovies,
  addFavouriteMovie,
  favourites,
  isLoading,
}) => {
  return (
    <div>
      <Popular
        movies={movies}
        setMovies={setMovies}
        addFavouriteMovie={addFavouriteMovie}
        favourites={favourites}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Home;
