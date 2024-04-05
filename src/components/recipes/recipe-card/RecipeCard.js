import { useContext, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import userContext from "../../../store/context";
import image from "../../../assets/No_Image_Available.jpg";
import {
  addBookmark,
  removeBookmark,
} from "../../../services/api/endpoints/bookmark.api";
import Card from "../../common/card/Card";
import classes from "./RecipeCard.module.css";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe, isLiked = false, onDislike = null }) => {
  const { isLoggedIn, showLoader, hideLoader, handleAPIError } =
    useContext(userContext);
  const [isHovered, setHover] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const navigate = useNavigate();

  // adding to bookmark and removing from bookmark
  const handleLikeAction = async (e) => {
    e.stopPropagation();
    try {
      const recipeId = recipe.id;
      const payload = {
        recipeId,
      };
      showLoader();

      // adding to bookmark
      if (!liked) {
        await addBookmark(payload);
        setLiked(true);
        alert("Added to bookmarks");
      } else {
        // remove from bookmark if already exist on click action
        await removeBookmark(payload);

        //  remove card from page on dislike
        if (!!onDislike) {
          onDislike(recipeId);
        }
        setLiked(false);
        alert("Removed from bookmarks");
      }
      hideLoader();
    } catch (err) {
      handleAPIError(err);
    }
  };

  const getDisplayTitle = (title) => {
    if (title.length < 25) return title;
    else return title.substring(0, 25);
  };

  const goToRecipeDetails = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  let likeButton;

  // if user loggedin then wishlist list symbol appears on the each recipe
  if (isLoggedIn) {
    likeButton = (
      <div
        onClick={handleLikeAction}
        style={{ color: "white" }}
        className={`${classes.heart} ${liked ? "text-danger" : ""}`}
      >
        {liked ? <AiFillHeart /> : <BiHeart />}
      </div>
    );
  } else {
    likeButton = <div></div>;
  }

  const url = recipe.image ? recipe.image : image;
  return (
    <Card extraClass={classes["card"]}>
      {/* onclick on card to details */}
      <div onClick={goToRecipeDetails}>
        <div
          className={classes["image-container"]}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <img className={classes.pic} src={url} alt="movie" />
          <div className={classes["blur-overlay"]}></div>
          {isHovered && likeButton}
        </div>
        <div className={classes["card-body"]}>
          <div className="d-flex justify-content-between">
            <p className="m-0 pr-2">{getDisplayTitle(recipe.title)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default RecipeCard;
