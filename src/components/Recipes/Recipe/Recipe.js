import { useContext, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { useNavigate } from "react-router";
import userContext from "../../../Store/context";
import image from "../../../assets/No_Image_Available.jpg";
//   import { db } from "../../../config/firebase";
import Card from "../../Card/Card";
import classes from "./Recipe.module.css";

const Recipe = ({ element, isLiked = false, onDisLike = null }) => {
  const context = useContext(userContext);
  const [isHovered, setHover] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const navigate = useNavigate();

  const url = element.image ? element.image : image;

  async function onAddLike(e) {
    console.log(e);
    e.stopPropagation();
    if (!liked) {
      //   setLiked(true);
    } else {
    }
  }

  function getDisplayTitle(title) {
    if (title.length < 25) return title;
    else return title.substring(0, 25);
  }
  let likeButton;
  if (context.login) {
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
            {/* <span>
              <p className="d-inline text-warning">
                {Math.round(element.vote_average * 10) / 10}
              </p>
              /10
            </span> */}
          </div>
        </div>
      </div>
    </Card>
  );
};
export default Recipe;
