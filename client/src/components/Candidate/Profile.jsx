import React from "react";
import { Form, Button, Image } from "react-bootstrap";
import HomeLayout from "../../layouts/HomeLayout";

export default function Profile() {
  return (
    <HomeLayout>
      <div className="container">
        <br />
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Image
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              rounded
              style={{ height: "10em" }}
            />

            {/* <Form.Control type="text" value="Muhammad Ali" disabled /> */}
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" value="Muhammad Ali" disabled />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value="ali@gmail.com" disabled />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Change Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </div>
    </HomeLayout>
  );
}
