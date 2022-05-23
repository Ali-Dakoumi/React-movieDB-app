import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GrFavorite } from "react-icons/gr";

const Card = ({
  id,
  movie,
  poster,
  title,
  vote,
  img,
  addFavouriteMovie,
  favourites,
  bool,
  fav,
  name,
}) => {
  return (
    <div key={id} className="movie">
      <button className="fav" onClick={() => addFavouriteMovie(movie)}>
        <GrFavorite
          className={`favIcon 
              ${fav === true ? "active" : ""}
           `}
        />
      </button>
      <Link className="link" to={"/movie/" + id}>
        <img src={img + poster} alt={title} />
        <div className="movie-info">
          <h4> {title} </h4>
          <span className="rate">{vote}</span>
          <span className="rate">{fav}</span>
        </div>
      </Link>
    </div>
  );
};

export default Card;
