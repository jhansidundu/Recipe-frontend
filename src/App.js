import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./components/pages/Signup.js";
import { Login } from "./components/pages/Login.js";
import { UserContextProvider } from "./Store/context";
import Home from "./Home.js";
import Header from "./components/Header/Header.js";
import userContext from "./Store/context";
import { useContext } from "react";
import LikedItems from "./components/LikedItems.js/LikedItems";
import SearchedRecipes from "./components/Recipes/SearchedRecipes/SearchRecipes";
function App() {
  const context = useContext(userContext);
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchedRecipes />} />
          <Route path="/likedlist" element={<LikedItems />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
