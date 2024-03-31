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
    if (err.response?.status === 401) {
      handleLogout();
      hideLoader();
    } else if (err?.response?.status === 403) {
      alert(err.response.data.message);
    } else if (err?.response?.status === 400) {
      alert(err.response.data.message);
    } else {
      alert("Unknown Error");
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
