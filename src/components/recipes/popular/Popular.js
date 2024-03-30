import { useEffect, useState } from "react";
import classes from "./Popular.module.css";
import axios from "axios";
import { APIKEY, PROXY_URL } from "../../../constants.js";
import Recipe from "../recipe-card/Recipe.js";
const Popular = () => {
  const [data, setData] = useState([]);
  let result = [];
  useEffect(() => {
    const response = axios.get(
      `${PROXY_URL}/random?apiKey=${APIKEY}&number=100`
    );

    response.then((res) => {
      console.log(res);
      res = res.data;
      console.log(res);
      result = res.recipes;
      setData(result);
    });
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

export default Popular;
