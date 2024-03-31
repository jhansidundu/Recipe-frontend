import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home.js";
import { UserContextProvider } from "./Store/context";
import Login from "./components/auth-pages/Login.js";
import Signup from "./components/auth-pages/Signup.js";
import Header from "./components/header/Header.js";
import SearchedRecipes from "./components/recipes/searched-recipes/SearchedRecipes";
function App() {
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
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
