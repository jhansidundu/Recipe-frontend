import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../store/context";
import { login } from "../../services/api/endpoints/auth.api";
export const Login = () => {
  const [email, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { showLoader, hideLoader, handleAPIError, setLogInState } =
    useContext(userContext);
  const handleLogin = async (email, password) => {
    try {
      showLoader();
      const payload = {
        email: email,
        password: password,
      };
      const res = await login(payload);
      hideLoader();
      setLogInState(res.data);
      navigate("/");
    } catch (err) {
      handleAPIError(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    handleLogin(email, password);
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
