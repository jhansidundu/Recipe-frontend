import { useEffect, useState } from "react";
import { fetchPopularRecipes } from "../../../services/api/endpoints/recipe.api.js";
import Recipe from "../recipe-card/Recipe.js";
import classes from "./Popular.module.css";
import Pagination from "../../pagination/Pagination.js";
const Popular = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const handlePageChange = (newPageNum) => {
    setCurrentPage(newPageNum);
  };
  useEffect(() => {
    const getPopularRecipes = async () => {
      const response = await fetchPopularRecipes();
      setData(response.data.recipes);
    };

    getPopularRecipes();
  }, []);
  const startIdx = (currentPage - 1) * recordsPerPage;
  const endIdx = startIdx + recordsPerPage;
  const filteredData = data.slice(startIdx, endIdx);
  return (
    <div className={classes.content}>
      <h4 className={classes.title}>Popular Recipes</h4>
      <ul className={classes.box}>
        {filteredData.map((element) => (
          <Recipe key={element.id} element={element} id={element.id} />
        ))}
      </ul>
      <Pagination
        total={data.length}
        currentPage={currentPage}
        recodsPerPage={recordsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Popular;
