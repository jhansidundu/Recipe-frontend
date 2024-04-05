import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchedRecipes } from "../../../services/api/endpoints/recipe.api";
import classes from "./SearchedRecipes.module.css";
import RecipeCard from "../recipe-card/RecipeCard";
import userContext from "../../../store/context";
import Pagination from "../../common/pagination/Pagination";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
const SearchedRecipes = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const { showLoader, hideLoader, handleAPIError } = useContext(userContext);

  // getting filter queries
  const query = searchParams.get("query");
  const type = searchParams.get("type");
  const cuisine = searchParams.get("cuisine");
  const diet = searchParams.get("diet");
  const intolerances = searchParams.get("intolerances");

  // getting current page
  const handlePageChange = (newPageNum) => {
    setCurrentPage(newPageNum);
  };

  useEffect(() => {
    // get all search movies
    const getSearchMovies = async () => {
      try {
        showLoader();
        setData([]);
        const res = await fetchSearchedRecipes({
          query,
          type,
          cuisine,
          diet,
          intolerances,
        });
        setData(res.data.results);
        hideLoader();
      } catch (err) {
        handleAPIError(err);
      }
    };

    getSearchMovies();
  }, [query]);

  // setting intial and end numbers of card index for current page
  const startIdx = (currentPage - 1) * recordsPerPage;
  const endIdx = startIdx + recordsPerPage;
  const filteredData = data.slice(startIdx, endIdx);
  return (
    <Container fluid>
      <Row>
        <Col>
          <div className={classes.container}>
            <h4 className={classes.title}>
              Search results
              {/* for: <i className="text-warning">{query}</i> */}
            </h4>
            {(!filteredData || filteredData.length === 0) && (
              <p className="text-white">No results found</p>
            )}
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
        </Col>
      </Row>
    </Container>
  );
};

export default SearchedRecipes;
