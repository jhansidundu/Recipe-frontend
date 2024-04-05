import React, { useContext, useState } from "react";
import userContext from "../../store/context";
import { signup } from "../../services/api/endpoints/auth.api";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Card from "../common/card/Card";
import classes from "./Auth.module.css";
import Button from "react-bootstrap/Button";

//  user signup
export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setUserEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    phoneNumber: null,
    password: null,
  });
  const { setLogInState, handleAPIError } = useContext(userContext);
  const navigate = useNavigate();

  // function for calling sigup api
  const handleSignup = async () => {
    try {
      const payload = {
        name,
        email,
        phoneNumber,
        password,
      };
      const res = await signup(payload);
      // const { accessToken, email, name} = res.data;
      setLogInState(res.data);
      navigate("/");
    } catch (err) {
      handleAPIError(err);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // validation
    let isFormValid = true;
    if (!name || !name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Invalid username" }));
      isFormValid = false;
    } else {
      setErrors((prev) => ({ ...prev, name: null }));
    }
    if (!email || !email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Invalid email" }));
      isFormValid = false;
    } else {
      setErrors((prev) => ({ ...prev, email: null }));
    }
    if (!phoneNumber || !phoneNumber.trim() || phoneNumber.length !== 10) {
      setErrors((prev) => ({ ...prev, phoneNumber: "Invalid phone number" }));
      isFormValid = false;
    } else {
      setErrors((prev) => ({ ...prev, phoneNumber: null }));
    }
    if (!password || !password.trim() || password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be atleast 6 characters",
      }));
      isFormValid = false;
    } else {
      setErrors((prev) => ({ ...prev, password: null }));
    }
    if (!isFormValid) {
      return;
    }
    handleSignup();
  };

  return (
    <Card extraClass={classes.container}>
      <Form>
        <h3 className="text-center">Signup</h3>
        <Form.Group className="mb-2">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {!!errors.name && (
            <Form.Text className="text-danger">{errors.name}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {!!errors.email && (
            <Form.Text className="text-danger">{errors.email}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {!!errors.phoneNumber && (
            <Form.Text className="text-danger">{errors.phoneNumber}</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!!errors.password && (
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Signup
        </Button>
      </Form>
    </Card>
  );
};

export default Signup;
