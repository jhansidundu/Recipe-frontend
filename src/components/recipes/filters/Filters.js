import { useState } from "react";
import classes from "./Filters.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Filters = () => {
  const [filters, setFilers] = useState({
    query: "",
    type: "",
    cuisine: "",
    diet: "",
    intolerances: "",
  });

  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const { value, name } = e.target;
    setFilers({ ...filters, [name]: value });
  };

  const handleClearFilters = () => {
    setFilers({
      query: "",
      type: "",
      cuisine: "",
      diet: "",
      intolerances: "",
    });
  };

  const handleSearch = () => {
    let url = `/search?`;
    const { query, type, cuisine, intolerances, diet } = filters;
    const queryStrArr = [];
    if (!!query.trim()) {
      queryStrArr.push(`query=${query}`);
    }
    if (!!type.trim()) {
      queryStrArr.push(`type=${type}`);
    }
    if (!!cuisine.trim()) {
      queryStrArr.push(`cuisine=${cuisine}`);
    }
    if (!!intolerances.trim()) {
      queryStrArr.push(`intolerances=${intolerances}`);
    }
    if (!!diet.trim()) {
      queryStrArr.push(`diet=${diet}`);
    }
    const queryStr = queryStrArr.join("&");
    if (!!queryStr) {
      navigate(`/search?${queryStr}`);
    }
  };

  return (
    <div className={classes.container}>
      <h4>Filters</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Search</Form.Label>
          <Form.Control
            size="sm"
            placeholder="Search..."
            name="query"
            value={filters.query}
            onChange={handleFilterChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Recipe type</Form.Label>
          <Form.Select
            size="sm"
            name="type"
            onChange={handleFilterChange}
            value={filters.type}
          >
            <option value="">Select</option>
            <option value="main course">Main course</option>
            <option value="breakfast">Breakfast</option>
            <option value="soup">Soup</option>
            <option value="dessert">Dessert</option>
            <option value="salad">Salad</option>
            <option value="side dish">Side Dish</option>
            <option value="snack">Snack</option>
            <option value="drink">Drink</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Diet</Form.Label>
          <Form.Select
            size="sm"
            name="diet"
            onChange={handleFilterChange}
            value={filters.diet}
          >
            <option value="">Select</option>
            <option value="Gluten Free">Gluten Free</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Whole30">Whole30</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cuisine</Form.Label>
          <Form.Select
            size="sm"
            name="cuisine"
            onChange={handleFilterChange}
            value={filters.cuisine}
          >
            <option value="">Select</option>
            <option value="African">African</option>
            <option value="Asian">Asian</option>
            <option value="American">American</option>
            <option value="French">French</option>
            <option value="Indian">Indian</option>
            <option value="Japanese">Japanese</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Intolerances</Form.Label>
          <Form.Select
            size="sm"
            name="intolerances"
            onChange={handleFilterChange}
            value={filters.intolerances}
          >
            <option value="">Select</option>
            <option value="Dairy">Dairy</option>
            <option value="Egg">Egg</option>
            <option value="Gluten">Gluten</option>
            <option value="Peanut">Peanut</option>
            <option value="Seafood">Seafood</option>
            <option value="Wheat">Wheat</option>
          </Form.Select>
        </Form.Group>

        <Button variant="secondary" onClick={handleClearFilters}>
          Clear
        </Button>
        <Button className="mx-2" onClick={handleSearch}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Filters;
