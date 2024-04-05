import parser from "html-react-parser";
import { useContext, useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { AiFillHeart } from "react-icons/ai";
import { BiHeart } from "react-icons/bi";
import { useParams } from "react-router-dom";
import {
  addBookmark,
  checkIfAlreadyBookmarked,
  removeBookmark,
} from "../../../services/api/endpoints/bookmark.api";
import { fetchRecipeDetails } from "../../../services/api/endpoints/recipe.api";
import userContext from "../../../store/context";
import classes from "./RecipeDetails.module.css";

const RecipeDetails = () => {
  const { recipeId } = useParams(); // recipeId from url
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [details, setDetails] = useState(null);
  const { isLoggedIn, handleAPIError } = useContext(userContext);

  // handles both bookmarking and unbookmarking
  const handleBookmarkAction = async () => {
    try {
      const payload = {
        recipeId,
      };

      // if not already bookmarked
      if (!isBookmarked) {
        await addBookmark(payload);
        setIsBookmarked(true);
        alert("Added to bookmarks");
      }
      // if already bookmarked
      else {
        await removeBookmark(payload);
        setIsBookmarked(false);
        alert("Removed from bookmarks");
      }
    } catch (err) {
      handleAPIError(err);
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetchRecipeDetails(recipeId);
        setDetails(res.data);
      } catch (err) {
        handleAPIError(err);
      }
    };
    const alreadyBookmarked = async () => {
      try {
        const res = await checkIfAlreadyBookmarked(recipeId);
        setIsBookmarked(res.data.bookmarked);
      } catch (err) {
        handleAPIError(err);
      }
    };
    // get recipe details
    fetchRecipe();

    // if loggedIn check if user had bookmarked the recipe
    if (isLoggedIn) {
      alreadyBookmarked();
    }
  }, [recipeId, isLoggedIn]);

  let ingredients;
  if (!!details) {
    ingredients = details.extendedIngredients.map((ing) => (
      <Badge key={ing.name} bg="secondary" className="py-2 px-3">
        {ing.name}
      </Badge>
    ));
  }

  return (
    <>
      {!details && <h5 className="text-white p-2">Loading...</h5>}
      {!!details && (
        <Container fluid className="text-white p-4">
          <Row>
            <Col xs={7}>
              <h5 className="text-primary">{details.title}</h5>
              <img
                src={details.image}
                alt="Recipe Image"
                className={classes.recipeImage}
              />
            </Col>
            <Col xs={5}>
              <Row>
                <Col className="d-flex justify-content-end">
                  {isLoggedIn && (
                    <div
                      onClick={handleBookmarkAction}
                      style={{ color: "white" }}
                      className={`${classes.heart} ${
                        isBookmarked ? "text-danger" : ""
                      }`}
                    >
                      {isBookmarked ? (
                        <AiFillHeart size={24} />
                      ) : (
                        <BiHeart size={24} />
                      )}
                    </div>
                  )}
                </Col>
              </Row>
              <h6>Course types</h6>
              <div className="d-flex flex-wrap gap-2">
                <Badge bg="secondary" className="py-2 px-3">
                  {details.dishTypes[0]}
                </Badge>
                <Badge bg="secondary" className="py-2 px-3">
                  {details.dishTypes[1]}
                </Badge>
                <Badge bg="secondary" className="py-2 px-3">
                  {details.dishTypes[2]}
                </Badge>
                <Badge bg="secondary" className="py-2 px-3">
                  {details.dishTypes[3]}
                </Badge>
              </div>
              <div className="d-flex align-items-center mt-3 gap-4">
                <div>
                  <h6> Servings</h6>
                  <Badge bg="secondary" className="py-2 px-3">
                    {details.servings}
                  </Badge>
                </div>

                <div>
                  <h6> Price per serving</h6>
                  <Badge bg="secondary" className="py-2 px-3">
                    $ {(details.pricePerServing / 100).toFixed(2)}
                  </Badge>
                </div>
                <div>
                  <h6>Prep time</h6>
                  <Badge bg="secondary" className="py-2 px-3">
                    {details.readyInMinutes} minutes
                  </Badge>
                </div>

                <div>
                  <h6>Health score</h6>
                  <Badge bg="secondary" className="py-2 px-3">
                    {details.healthScore}
                  </Badge>
                </div>
              </div>
              <div className="mt-3">
                <h6>Ingredients</h6>
                <div className="d-flex flex-wrap gap-2">{ingredients}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="mt-3">
                <h4>Summary</h4>
                <div className="text-light">{parser(details.summary)}</div>
              </div>
              <p className="mt-3">
                For more details visit{" "}
                <a href={details.sourceUrl} target="_blank">
                  here
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default RecipeDetails;
