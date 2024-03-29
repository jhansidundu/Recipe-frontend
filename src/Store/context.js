import React, { useEffect, useState } from "react";
const userContext = React.createContext({
  email: "",
  setEmail: () => {},
  login: false,
  setLogin: () => {},
});
export default userContext;
export const UserContextProvider = (props) => {
  const [userEmail, setEmail] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setLogin(true);
      setEmail(userEmail);
    }
  }, []);

  return (
    <userContext.Provider
      value={{ email: userEmail, login, setEmail, setLogin }}
    >
      {props.children}
    </userContext.Provider>
  );
};
