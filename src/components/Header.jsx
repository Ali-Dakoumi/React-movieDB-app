import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();

    navigate("/searched/" + input);
    setInput("");
  };
  return (
    <header>
      <div className="links">
        <NavLink className="NavLink home" to="/react-movie-app">
          MovieDB
        </NavLink>
        <nav>
          <NavLink className="NavLink" to="/top">
            Top movies
          </NavLink>
          <NavLink className="NavLink" to="/favourites">
            Favourites
          </NavLink>
        </nav>
      </div>
      <form onSubmit={submitHandler} action="">
        <FiSearch />{" "}
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="search"
        />
      </form>
    </header>
  );
};

export default Header;
