import React, { useEffect, useState } from "react";
const userContext = React.createContext({
  email: "",
  isLoggedIn: false,
  isLoading: false,
  setUserEmail: () => {},
  setIsLoggedIn: () => {},
  setLogInState: () => {},
  handleLogout: () => {},
  showLoader: () => {},
  hideLoader: () => {},
  handleAPIError: () => {},
});

export const UserContextProvider = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [_, setLoaderCount] = useState(0);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // function for storing user data in localstoragge
  const setLogInState = ({ email, name, accessToken }) => {
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    localStorage.setItem("accessToken", accessToken);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
  };

  const showLoader = () => {
    if (!isLoading) setLoading(true);
    setLoaderCount((prev) => prev + 1);
  };

  const hideLoader = () => {
    setLoaderCount((prev) => {
      if (prev === 0) return prev;
      if (prev === 1) {
        setLoading(false);
      }
      return prev - 1;
    });
  };

  const handleAPIError = (err) => {
    hideLoader();
    if (err.response?.status === 401) {
      handleLogout();
    } else if (err?.response?.status === 403) {
      alert(err.response.data.message);
    } else if (err?.response?.status === 400) {
      alert(err.response.data.message);
    } else {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setIsLoggedIn(true);
      setUserEmail(userEmail);
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        email: userEmail,
        isLoggedIn,
        isLoading,
        setUserEmail,
        setIsLoggedIn,
        setLogInState,
        handleLogout,
        showLoader,
        hideLoader,
        handleAPIError,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;
