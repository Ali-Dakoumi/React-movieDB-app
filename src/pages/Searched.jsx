import react from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../components/Loader";

const searchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const Searched = ({ addFavouriteMovie, favourites, setFavourites }) => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(searchApi + name);
    const results = await data.json();
    let tempMovies = results.results;
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    if (movieFavourites) {
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

    setSearchedMovies(tempMovies);
    setIsLoading(false);
  };
  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="popular-wrapper">
      <h1> Searched </h1>
      <div className="popular">
        {searchedMovies.map((movie) => {
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

export default Searched;
