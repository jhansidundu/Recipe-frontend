import { useContext, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import userContext from "../../Store/context.js";
import classes from "./Header.module.css";
import SearchedRecipes from "../Recipes/SearchedRecipes/SearchRecipes.js";
const Header = () => {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(userContext);

  function handleSearch() {
    const searchQuery = searchRef.current.value;
    console.log(typeof searchQuery);
    console.log(searchQuery);
    if (!searchQuery || !searchQuery.trim()) return;
    navigate(`/search?query=${searchQuery}`);
  }

  const OnLogin = () => {
    navigate("/login");
  };
  const onSignUp = () => {
    navigate("/signup");
  };
  const onGetLike = () => {
    navigate("/likedlist");
  };
  const onSignOut = () => {
    context.setLogin(false);
    localStorage.removeItem("email");
    localStorage.removeItem("userid");
    localStorage.removeItem("name");
    context.setLogin(false);

    navigate("/");
  };
  return (
    <>
      <header className={classes.header}>
        <Link className={classes.logo} to="/home">
          {/* <img src={image} /> */}
          <h3>Recipes</h3>
        </Link>

        <div className={classes.searchParent}>
          <input
            type="search"
            ref={searchRef}
            className={classes.input}
            placeholder="Search..."
          />
          <button onClick={handleSearch} className={classes.button}>
            <BiSearchAlt />
          </button>
        </div>

        <div className={classes.InOut}>
          {context.login ? (
            ""
          ) : (
            <span className={classes.headerLink} onClick={OnLogin}>
              Login
            </span>
          )}
          {context.login ? (
            ""
          ) : (
            <span className={classes.headerLink} onClick={onSignUp}>
              Signup
            </span>
          )}
          {context.login ? (
            <span className={classes.headerLink} onClick={onGetLike}>
              Bookmark
            </span>
          ) : (
            ""
          )}
          {context.login ? (
            <span className={classes.headerLink} onClick={onSignOut}>
              Logout
            </span>
          ) : (
            ""
          )}
        </div>
      </header>
    </>
  );
};
export default Header;
