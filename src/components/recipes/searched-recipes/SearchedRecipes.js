import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchedRecipes } from "../../../services/api/endpoints/recipe.api";
import Recipe from "../recipe-card/Recipe";
import classes from "./SearchedRecipes.module.css";
const SearchedRecipes = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  useEffect(() => {
    const getSearchMovies = async () => {
      const res = await fetchSearchedRecipes(query);
      setData(res.data.results);
    };

    getSearchMovies();
  }, [query]);

  return (
    <div className={classes.content}>
      <h4 className={classes.title}>Search results for: {query}</h4>
      <ul className={classes.box}>
        {data.map((element) => (
          <Recipe key={element.id} element={element} id={element.id} />
        ))}
      </ul>
    </div>
  );
};

export default SearchedRecipes;
