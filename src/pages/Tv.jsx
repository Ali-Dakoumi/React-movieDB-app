import { useState, useEffect } from "react";
import "@splidejs/react-splide/css";
import Card from "../components/Card";
import Loader from "../components/Loader";

const api =
  "https://api.themoviedb.org/3/tv/popular?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const Tv = ({ addFavouriteMovie, favourites, setFavourites }) => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getShows = async () => {
    const data = await fetch(api);
    const results = await data.json();
    let tempMovies = results.results;
    console.log(tempMovies);
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    if (movieFavourites) {
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

    setShows(tempMovies);
    setIsLoading(false);
  };
  useEffect(() => {
    getShows();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="popular-wrapper">
      <h1> Popular TV shows </h1>
      <div className="popular">
        {shows.map((show) => {
          const { poster_path, name, vote_average, id, fav } = show;

          return (
            <Card
              img={IMGPATH}
              poster={poster_path}
              title={name}
              id={id}
              movie={show}
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

export default Tv;
