import React, { useContext, useState } from "react";
import userContext from "../../Store/context";
import { signup } from "../../services/api/endpoints/auth.api";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setLogInState } = useContext(userContext);
  const navigate = useNavigate();
  const handleSignup = async (name, email, phoneNumber, password) => {
    const payload = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };
    const res = await signup(payload);
    // const { accessToken, email, name} = res.data;
    setLogInState(res.data);
    navigate("/");
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // validation
    if (!name || !email || !phoneNumber || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    handleSignup(name, email, phoneNumber, password);
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
            onChange={(e) => setUserEmail(e.target.value)}
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

export default Signup;
