import { useContext, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import userContext from "../../store/context.js";
import classes from "./Header.module.css";
import { useLocation } from "react-router-dom";
const Header = () => {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, handleLogout } = useContext(userContext);

  const handleSearchOnEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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

      <div className={classes.InOut}>
        {isLoggedIn ? (
          ""
        ) : (
          <span className={classes.headerLink} onClick={OnLogin}>
            Login
          </span>
        )}
        {isLoggedIn ? (
          ""
        ) : (
          <span className={classes.headerLink} onClick={onSignUp}>
            Signup
          </span>
        )}
        {isLoggedIn ? (
          <span className={classes.headerLink} onClick={onGotoBookmarks}>
            Bookmarks
          </span>
        ) : (
          ""
        )}
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
