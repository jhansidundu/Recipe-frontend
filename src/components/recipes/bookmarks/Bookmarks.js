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
  const handlePageChange = (newPageNum) => {
    setCurrentPage(newPageNum);
  };
  useEffect(() => {
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
    <div>
      <h4 className={classes.title}>Your bookmarks</h4>
      <ul className={classes.box}>
        {filteredData.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            isLiked={true}
            recipe={recipe}
            id={recipe.id}
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
