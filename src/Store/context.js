import React, { useEffect, useState } from "react";
const userContext = React.createContext({
  email: "",
  setUserEmail: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  setLogInState: () => {},
  handleLogout: () => {},
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
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;
