import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { APIKEY, PROXY_URL } from "../../../constants";
import Recipe from "../recipe-card/Recipe";
import classes from "./SearchRecipes.module.css";
const SearchedRecipes = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  useEffect(() => {
    const getSearchMovies = async () => {
      const url = `${PROXY_URL}/complexSearch?apiKey=${APIKEY}&query=${query}`;
      let res = await axios.get(url);
      console.log(res.data.results);
      setData(res.data.results);
    };

    getSearchMovies();
  }, []);

  return (
    <div className={classes.content}>
      <h4 className={classes.title}>Popular Recipes</h4>
      <ul className={classes.box}>
        {data.map((element) => (
          <Recipe key={element.id} element={element} id={element.id} />
        ))}
      </ul>
    </div>
  );
};

export default SearchedRecipes;
