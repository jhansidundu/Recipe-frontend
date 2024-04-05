import { useContext, useEffect, useState } from "react";
import { fetchPopularRecipes } from "../../../services/api/endpoints/recipe.api.js";
import classes from "./Popular.module.css";
import Pagination from "../../common/pagination/Pagination.js";
import RecipeCard from "../recipe-card/RecipeCard.js";
import userContext from "../../../store/context.js";
const Popular = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const { handleAPIError } = useContext(userContext);
  const handlePageChange = (newPageNum) => {
    setCurrentPage(newPageNum);
  };
  useEffect(() => {
    const getPopularRecipes = async () => {
      try {
        const response = await fetchPopularRecipes();
        setData(response.data.recipes);
      } catch (err) {
        handleAPIError(err);
      }
    };

    getPopularRecipes();
  }, []);
  const startIdx = (currentPage - 1) * recordsPerPage;
  const endIdx = startIdx + recordsPerPage;
  const filteredData = data.slice(startIdx, endIdx);
  return (
    <div>
      <h4 className={classes.title}>Popular Recipes</h4>
      <ul className={classes.box}>
        {filteredData.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} id={recipe.id} />
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
