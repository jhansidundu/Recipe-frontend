import { useContext, useEffect, useState } from "react";
import Pagination from "../../common/pagination/Pagination";
import RecipeCard from "../recipe-card/RecipeCard";
import classes from "./Bookmarks.module.css";
import userContext from "../../../store/context";
import { fetchAllBookmarks } from "../../../services/api/endpoints/bookmark.api";
const Bookmarks = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const { showLoader, hideLoader, handleAPIError } = useContext(userContext);

  // function for pagenavigation
  const handlePageChange = (newPageNum) => {
    setCurrentPage(newPageNum);
  };

  // function for remove item from bookmark
  const handleRemoveBookmark = (recipeId) => {
    const newBookmarks = data.filter((r) => r.id !== recipeId);
    setData(newBookmarks);
  };

  useEffect(() => {
    // functions for getting all bookmarks
    const getBookmarks = async () => {
      try {
        showLoader();

        const response = await fetchAllBookmarks();
        hideLoader();
        setData(response.data);
      } catch (err) {
        handleAPIError(err);
      }
    };

    getBookmarks();
  }, []);
  const startIdx = (currentPage - 1) * recordsPerPage;
  const endIdx = startIdx + recordsPerPage;
  const filteredData = data.slice(startIdx, endIdx);
  return (
    <div className={classes.container}>
      <h4 className={classes.title}>Bookmarks</h4>
      {(!data || data.length === 0) && (
        <p className="text-white">You don't have any bookmarks</p>
      )}
      <ul className={classes.box}>
        {filteredData.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            isLiked={true}
            recipe={recipe}
            id={recipe.id}
            onDislike={handleRemoveBookmark}
          />
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

export default Bookmarks;
