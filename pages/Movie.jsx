import react from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../components/Loader";
const api =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const Movie = ({ addFavouriteMovie, favourites }) => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();

  const getMovie = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?&api_key=04c35731a5ee918f014970082a0088b1`
    );
    const movies = await data.json();
    let tempMovies = movies;
    favourites.map((favmovie) => {
      if (favmovie.title === tempMovies.title) {
        tempMovies.fav = true;
      }
    });
    console.log(tempMovies.fav);

    setMovie(tempMovies);
    setIsLoading(false);
  };
  useEffect(() => {
    getMovie(params.id);
  }, [params.id]);
  const { poster_path, title, overview, release_date, vote_average, id, fav } =
    movie;
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="movie-wrapper">
      <div className="text">
        <h1> {title} </h1>
        <p>{overview}</p>
        <h4>Genres:</h4>
        <ul>
          {movie.genres?.map((genre) => {
            return <li> {genre.name} * </li>;
          })}
        </ul>
        {release_date ? (
          <>
            <h4>Release date:</h4>
            <p> {release_date} </p>
          </>
        ) : (
          ""
        )}
      </div>
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
    </div>
  );
};

export default Movie;
