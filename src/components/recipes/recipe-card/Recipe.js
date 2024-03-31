import { useContext, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import userContext from "../../../Store/context";
import image from "../../../assets/No_Image_Available.jpg";
import {
  addBookmark,
  removeBookmark,
} from "../../../services/api/endpoints/bookmark.api";
import Card from "../../card/Card";
import classes from "./Recipe.module.css";

const Recipe = ({ element, isLiked = false, onDisLike = null }) => {
  const context = useContext(userContext);
  const [isHovered, setHover] = useState(false);
  const [liked, setLiked] = useState(isLiked);

  const url = element.image ? element.image : image;

  async function onAddLike(e) {
    e.stopPropagation();
    const recipeId = element.id;
    const payload = {
      recipeId,
    };
    if (!liked) {
      await addBookmark(payload);
      alert("Added to bookmarks");
      setLiked(true);
    } else {
      await removeBookmark();
      alert("Removed from bookmarks");
      setLiked(false);
    }
  }

  function getDisplayTitle(title) {
    if (title.length < 25) return title;
    else return title.substring(0, 25);
  }

  let likeButton;
  if (context.isLoggedIn) {
    likeButton = (
      <div
        onClick={onAddLike}
        className={`${classes.heart} ${liked ? "text-danger" : ""}`}
      >
        {liked ? <AiFillHeart /> : <BiHeart />}
      </div>
    );
  } else {
    likeButton = <div></div>;
  }

  return (
    <Card class={classes["card"]}>
      <div>
        <div
          className={classes.image}
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <img className={classes.pic} src={url} alt="movie" />
          {isHovered && likeButton}
        </div>
        <div className={classes["card-body"]}>
          <div className="d-flex justify-content-between">
            <p className="m-0 pr-2">{getDisplayTitle(element.title)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default Recipe;
