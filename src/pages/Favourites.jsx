import React, { useEffect } from "react";
import Card from "../components/Card";
import { useState } from "react";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const Favourites = ({
  bool,
  added,
  movies,
  setMovies,
  favourites,
  setFavourites,
  addFavouriteMovie,
  fav,
}) => {
  favourites = favourites.filter((favmovie) => favmovie.fav === true);
  return (
    <div className="popular-wrapper">
      <h1>Your movie List</h1>
      <div className="popular">
        {favourites
          ? favourites.map((movie, i) => {
              const { poster_path, title, name, vote_average, id, fav } = movie;
              return (
                <Card
                  img={IMGPATH}
                  poster={poster_path}
                  title={title ? title : name}
                  id={id}
                  movie={movie}
                  key={i}
                  vote={vote_average}
                  addFavouriteMovie={addFavouriteMovie}
                  fav={fav}
                  favourites={favourites}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Favourites;
