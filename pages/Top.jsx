import { useState, useEffect } from "react";
import "@splidejs/react-splide/css";
import Card from "../components/Card";
import Loader from "../components/Loader";

const api =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const Top = ({ addFavouriteMovie, favourites, setFavourites }) => {
  const [movies, setMovies] = useState([]);
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
        console.log("set to false");
      });
      tempMovies.map((movie) => {
        movieFavourites.map((moviefav) => {
          if (moviefav.id === movie.id) {
            movie.fav = true;
            console.log("set to true");
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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="popular-wrapper">
      <h1> Top rated movies of all time </h1>
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

export default Top;
