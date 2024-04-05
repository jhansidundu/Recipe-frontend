import React, { useEffect, useState } from "react";
const userContext = React.createContext({
  email: "",
  isLoggedIn: false,
  setUserEmail: () => {},
  setIsLoggedIn: () => {},
  setLogInState: () => {},
  handleLogout: () => {},
  handleAPIError: () => {},
});

export const UserContextProvider = (props) => {
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

  const handleAPIError = (err) => {
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
        setUserEmail,
        setIsLoggedIn,
        setLogInState,
        handleLogout,
        handleAPIError,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;
