import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import EmpLayout from "../../layouts/EmpLayout";
import jwt_decode from "jwt-decode";

const SLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/staff/signin", {
        email,
        password,
      });
      if (res.data.token) {
        Cookie.set("token", res.data.token);
        let obj = jwt_decode(res.data.token);
        console.log(obj);
        if (obj.role === "staff") {
          history.push("/examiner/dashboard");
        } else if (obj.role === "admin") {
          history.push("/admin/dashboard");
        }
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
    <EmpLayout>
      <div className="container" style={{ paddingTop: "5em" }}>
        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Staff Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
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
          <br />
          <br />
          {error ? <Alert variant="danger">{error}</Alert> : null}
        </Form>
      </div>
    </EmpLayout>
  );
};

export default SLogin;
