import { login } from "../../services/api/endpoints/auth.Api";
import React, { useState } from "react";
import { useContext } from "react";
import userContext from "../../Store/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const context = useContext(userContext);
  const handleLogin = async (email, password) => {
    const requestBody = {
      email: email,

      password: password,
    };

    const config = {
      data: requestBody, // This will be sent in the request body
    };
    const res = await login(config.data);
    console.log(res.name);
    console.log(res.data.accessToken);
    const accessToken = res.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("name", res.name);
    localStorage.setItem("email", res.email);
    context.setLogin(true);
    navigate("/");
  };
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation (replace with more robust validation)
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    handleLogin(email, password);

    // Simulate login (replace with actual authentication logic)
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
            onChange={(e) => setEmail(e.target.value)}
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

// State variables to store user input

export default Login;
