import { useContext, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import userContext from "../../store/context.js";
import classes from "./Header.module.css";
import { useLocation } from "react-router-dom";
import { CiBookmarkCheck } from "react-icons/ci";

const Header = () => {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, handleLogout } = useContext(userContext);

  // function for getting search query
  const handleSearchOnEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // searched text validation
  const handleSearch = () => {
    const searchQuery = searchRef.current.value;
    if (!searchQuery || !searchQuery.trim()) return;
    navigate(`/search?query=${searchQuery}`);
  };

  const OnLogin = () => {
    navigate("/login");
  };
  const onSignUp = () => {
    navigate("/signup");
  };
  const onGotoBookmarks = () => {
    navigate("/bookmarks");
  };
  const onSignOut = () => {
    handleLogout();
    navigate("/");
  };

  // search appearance
  let showSearch = !(
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/bookmarks" ||
    location.pathname.includes("/recipe")
  );

  return (
    <header className={classes.header}>
      <Link className={classes.logo} to="/home">
        <h3>Recipes</h3>
      </Link>

      {/* search button */}
      {showSearch && (
        <div className={classes.searchParent}>
          <input
            type="search"
            ref={searchRef}
            className={classes.input}
            placeholder="Search..."
            onKeyDown={handleSearchOnEnter}
          />
          <button onClick={handleSearch} className={classes.button}>
            <BiSearchAlt />
          </button>
        </div>
      )}

      {/* if user login then login should off*/}
      <div className={classes.InOut}>
        {isLoggedIn ? (
          ""
        ) : (
          <span className={classes.headerLink} onClick={OnLogin}>
            Login
          </span>
        )}

        {/* if user login then signup should off */}
        {isLoggedIn ? (
          ""
        ) : (
          <span className={classes.headerLink} onClick={onSignUp}>
            Signup
          </span>
        )}

        {/* if user login bookmark appear */}
        {isLoggedIn ? (
          <>
            {/* <CiBookmarkCheck color="white" /> */}
            <span className={classes.headerLink} onClick={onGotoBookmarks}>
              Bookmarks
            </span>
          </>
        ) : (
          ""
        )}

        {/* if user login logout appear */}
        {isLoggedIn ? (
          <span className={classes.headerLink} onClick={onSignOut}>
            Logout
          </span>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};
export default Header;
