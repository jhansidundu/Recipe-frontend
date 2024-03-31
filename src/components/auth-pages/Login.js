import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../Store/context";
import { login } from "../../services/api/endpoints/auth.api";
export const Login = () => {
  const [email, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const context = useContext(userContext);
  const handleLogin = async (email, password) => {
    const payload = {
      email: email,
      password: password,
    };
    const res = await login(payload);
    const accessToken = res.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("name", res.data.name);
    localStorage.setItem("email", res.data.email);
    context.setIsLoggedIn(true);
    navigate("/");
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
    <div className="login-container">
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
