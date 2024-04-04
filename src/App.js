import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import classes from "./App.module.css";
import Home from "./components/home/Home.js";
import Login from "./components/auth-pages/Login.js";
import Signup from "./components/auth-pages/Signup.js";
import Loader from "./components/common/loader/Loader.js";
import Header from "./components/header/Header.js";
import Bookmarks from "./components/recipes/bookmarks/Bookmarks";
import RecipeDetails from "./components/recipes/details/RecipeDetails.js";
import SearchedRecipes from "./components/recipes/searched-recipes/SearchedRecipes";
import userContext, { UserContextProvider } from "./store/context.js";
const App = () => {
  const { isLoading } = useContext(userContext);
  return (
    <UserContextProvider>
      <BrowserRouter>
        {isLoading && <Loader />}
        {/* <Loader /> */}
        <Header />
        <div className={classes.content}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchedRecipes />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
