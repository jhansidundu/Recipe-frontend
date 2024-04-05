import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../../store/context";
import { login } from "../../services/api/endpoints/auth.api";
import Form from "react-bootstrap/Form";
import Card from "../common/card/Card";
import classes from "./Auth.module.css";
import Button from "react-bootstrap/Button";
export const Login = () => {
  const [email, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: null, password: null });
  const { handleAPIError, setLogInState } = useContext(userContext);
  const handleLogin = async (email, password) => {
    try {
      const payload = {
        email: email,
        password: password,
      };
      const res = await login(payload);
      setLogInState(res.data);
      navigate("/");
    } catch (err) {
      handleAPIError(err);
    }
  };

  // handle submission
  const handleSubmit = async () => {
    let isFormValid = true;

    if (!email || !email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Invalid email" }));
      isFormValid = false;
    } else {
      setErrors((prev) => ({ ...prev, email: null }));
    }

    if (!password || !password.trim()) {
      setErrors((prev) => ({
        ...prev,
        password: "Invalid password",
      }));
      isFormValid = false;
    } else {
      setErrors((prev) => ({ ...prev, password: null }));
    }
    if (!isFormValid) {
      return;
    }
    handleLogin(email, password);
  };

  return (
    <Card extraClass={classes.container}>
      <Form>
        <h3 className="text-center">Login</h3>
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
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
