import React from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { Form, Button } from "react-bootstrap";

export default function Register() {
  return (
    <GeneralLayout>
      <div className="container" style={{ paddingTop: "5em" }}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </GeneralLayout>
  );
}
