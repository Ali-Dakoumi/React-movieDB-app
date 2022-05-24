import { useEffect, useState } from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Category from "./Category";
import Searched from "./Searched";
import Movie from "./Movie";
import Top from "./Top";
import Tv from "./Tv";
import Favourites from "./Favourites";
const api =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const searchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const Pages = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    const data = await fetch(api);
    const results = await data.json();
    let tempMovies = results.results;

    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    if (movieFavourites) {
      console.log("function works", movies);
      tempMovies.map((movie) => {
        movie.fav = false;
      });
      tempMovies.map((movie) => {
        movieFavourites.map((moviefav) => {
          if (moviefav.id === movie.id) {
            movie.fav = true;
          }
        });
      });
    }
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }

    setMovies(tempMovies);
    setIsLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    console.log(movie);
    movie.fav = !movie.fav;
    let newFavouriteList = [...favourites];

    newFavouriteList = newFavouriteList.filter(
      (favmovie) => favmovie.title !== movie.title
    );
    if (movie.fav) {
      newFavouriteList = [...newFavouriteList, movie];
    }

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/React-movieDB-app/"
          element={
            <Home
              movies={movies}
              setMovies={setMovies}
              addFavouriteMovie={addFavouriteMovie}
              favourites={favourites}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/top"
          element={
            <Top
              addFavouriteMovie={addFavouriteMovie}
              favourites={favourites}
              setFavourites={setFavourites}
            />
          }
        />

        <Route path="/category" element={<Category />} />
        <Route
          path="/searched/:search"
          element={
            <Searched
              addFavouriteMovie={addFavouriteMovie}
              favourites={favourites}
              setFavourites={setFavourites}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <Movie
              addFavouriteMovie={addFavouriteMovie}
              favourites={favourites}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              addFavouriteMovie={addFavouriteMovie}
              favourites={favourites}
              setFavourites={setFavourites}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Pages;
