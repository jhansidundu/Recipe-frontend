import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchedRecipes } from "../../../services/api/endpoints/recipe.api";
import classes from "./SearchedRecipes.module.css";
import RecipeCard from "../recipe-card/RecipeCard";
import userContext from "../../../store/context";
const SearchedRecipes = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const { showLoader, hideLoader, handleAPIError } = useContext(userContext);
  const query = searchParams.get("query");
  useEffect(() => {
    const getSearchMovies = async () => {
      try {
        showLoader();
        const res = await fetchSearchedRecipes(query);
        setData(res.data.results);
        hideLoader();
      } catch (err) {
        handleAPIError(err);
      }
    };

    getSearchMovies();
  }, [query]);

  return (
    <div>
      <h4 className={classes.title}>Search results for: {query}</h4>
      <ul className={classes.box}>
        {data.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} id={recipe.id} />
        ))}
      </ul>
    </div>
  );
};

export default SearchedRecipes;
