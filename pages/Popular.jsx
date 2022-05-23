import { useState, useEffect } from "react";
import "@splidejs/react-splide/css";
import Card from "../components/Card";
import Loading from "../components/Loader";
import Loader from "../components/Loader";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const Popular = ({
  movies,
  setMovies,
  addFavouriteMovie,
  favourites,
  isLoading,
}) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="popular-wrapper">
      <h1> Popular </h1>
      <div className="popular">
        {movies.map((movie) => {
          const { poster_path, title, vote_average, id, fav } = movie;

          return (
            <Card
              img={IMGPATH}
              poster={poster_path}
              title={title}
              id={id}
              movie={movie}
              key={id}
              vote={vote_average}
              addFavouriteMovie={addFavouriteMovie}
              favourites={favourites}
              fav={fav}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
