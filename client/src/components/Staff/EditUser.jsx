import React, { useState, useEffect } from "react";
import { Form, Button, Image, Col } from "react-bootstrap";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

export default function EditUser() {
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [roles, setRoles] = useState(["user", "staff", "admin"]);

  let { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:4000/api/users/user/${id}`).then((response) => {
      let data = response.data.data;
      setImg(data.photo);
      setName(data.name);
      setEmail(data.email);
      setRole(data.role);
      setLoading(false);
    });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    alert(role);
    axios
      .patch(`http://localhost:4000/api/user/role/${id}`, { role: role })
      .then((response) => {
        history.push("/admin/dashboard");
      });
  };
  if (loading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <AdminLayout>
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
            <Form.Control type="text" value={name} disabled />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={email} disabled />
          </Form.Group>
          <Form.Group controlId="formGridState">
            <Form.Label>Label</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((el) => {
                return <option>{el}</option>;
              })}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleUpdate}>
            Update Profile
          </Button>
        </Form>
      </div>
    </AdminLayout>
  );
}
