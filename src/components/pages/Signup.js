import { login, signup } from "../../services/api/endpoints/auth.Api";
import React, { useState } from "react";
import userContext from "../../Store/context";
import { useContext } from "react";
import axios from "axios";
export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const context = useContext(userContext);
  const handleSignup = async (name, email, phoneNumber, password) => {
    const requestBody = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };

    const config = {
      data: requestBody, // This will be sent in the request body
    };
    const res = await signup(config.data);
    console.log("this is console in signup ", res.email);
    // console.log(res);

    localStorage.setItem("email", res.email);
    localStorage.setItem("name", res.name);
    context.setEmail(res.email);
    context.setLogin(true);
  };
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation (replace with more robust validation)
    if (!name || !email || !phoneNumber || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    handleSignup(name, email, phoneNumber, password);

    // Simulate login (replace with actual authentication logic)
  };

  return (
    <div className="login-container">
      <h1>Signup</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
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
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

// State variables to store user input

export default Signup;
