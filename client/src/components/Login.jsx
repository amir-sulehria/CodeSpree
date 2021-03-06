import React, { useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/users/signin", {
        email,
        password,
      });
      if (res.data.token) {
        Cookie.set("token", res.data.token);
        let obj = jwt_decode(res.data.token);

        history.push("/dashboard");
      }
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response; // take everything but 'request'
      try {
        if (errorObject.data.errors) {
          errorObject.data.errors.map((e) => {
            setError(e.message);
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <GeneralLayout>
      <div className="container" style={{ paddingTop: "5em" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Form>
        <br />
        <br />
        {error ? <Alert variant="danger">{error}</Alert> : null}
      </div>
    </GeneralLayout>
  );
};

export default Login;
