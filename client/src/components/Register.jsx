import React, { useState } from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/users/signup", {
        name,
        email,
        password,
        passwordConfirm,
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
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleRegister}>
            Register
          </Button>
        </Form>
        <br />
        <br />
        {error ? <Alert variant="danger">{error}</Alert> : null}
      </div>
    </GeneralLayout>
  );
}
