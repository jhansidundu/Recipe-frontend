import { useContext, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import userContext from "../../Store/context.js";
import classes from "./Header.module.css";
const Header = () => {
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, handleLogout } = useContext(userContext);

  function handleSearch() {
    const searchQuery = searchRef.current.value;
    if (!searchQuery || !searchQuery.trim()) return;
    navigate(`/search?query=${searchQuery}`);
  }

  const OnLogin = () => {
    navigate("/login");
  };
  const onSignUp = () => {
    navigate("/signup");
  };
  const onGetLike = () => {};
  const onSignOut = () => {
    handleLogout();
    navigate("/");
  };
  return (
    <>
      <header className={classes.header}>
        <Link className={classes.logo} to="/home">
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
            <span className={classes.headerLink} onClick={onGetLike}>
              Bookmark
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
    </>
  );
};
export default Header;
