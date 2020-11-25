import React from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  return (
    <GeneralLayout>
      <div className="container" style={{ paddingTop: "5em" }}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </GeneralLayout>
  );
};

export default Login;
