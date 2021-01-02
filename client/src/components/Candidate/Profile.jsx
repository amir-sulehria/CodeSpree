import React, { useState } from "react";
import { Form, Button, Image, Col } from "react-bootstrap";
import ExaminerLayout from "../../layouts/ExaminerLayout";
import axios from "axios";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import HomeLayout from "../../layouts/HomeLayout";
import AdminLayout from "../../layouts/AdminLayout";

export default function Profile(props) {
  const [oldPsw, setOldPsw] = useState();
  const [newPsw, setNewPsw] = useState();
  const [loading, setLoading] = useState();
  const [confirmNewPsw, setConfirmNewPsw] = useState();
  const [data, setData] = useState();
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [file, setFile] = useState();
  const history = useHistory();

  useEffect(() => {
    const token = Cookie.get("token");
    const id = jwt_decode(token);
    axios
      .get(`http://localhost:4000/api/users/user/${id.id}`)
      .then((response) => {
        let data = response.data.data;
        setImg(data.photo);
        setName(data.name);
        setEmail(data.email);
        setLoading(false);
      });
  }, []);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("file", file);
    console.log(file);
    const result = await axios.patch(
      "http://localhost:4000/api/user/imgupload",
      fd
    );
    console.log(result.data);
    setImg(result.data.data.url);
    const token = Cookie.get("token");
    const id = jwt_decode(token);
    if (result.data.data) {
      axios
        .patch(`http://localhost:4000/api/user/img/${id.id}`, {
          img: result.data.data.url,
        })
        .then((res) => {
          alert("Updated");
        })
        .catch((err) => alert("not updated"));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      passwordCurrent: oldPsw,
      password: newPsw,
      passwordConfirm: confirmNewPsw,
    };
    const token = Cookie.get("token");
    if (token) {
      axios
        .patch("http://localhost:4000/api/users/update-my-password", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.token) {
            Cookie.set("token", res.data.token);
            history.push("/dashboard");
          }
        });
    }
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

  const comp = (
    <div className="container">
      <br />
      <Form>
        <Form.Group controlId="formBasicImg">
          <Image src={img} rounded style={{ height: "10em" }} />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Upload image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFile} />
        </Form.Group>
        <button className="btn btn-primary" onClick={handleImageUpload}>
          Update Image
        </button>
        <Form.Group>
          <br />
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" value={name} disabled />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={email} disabled />
        </Form.Group>
        <Form.Group controlId="formBasicPsw">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setOldPsw(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicNPsw">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setNewPsw(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCNPsw">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setConfirmNewPsw(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleUpdate}>
          Update Password
        </Button>
      </Form>
      <br />
    </div>
  );
  if (props.role === "staff") {
    return <ExaminerLayout>{comp}</ExaminerLayout>;
  } else if (props.role === "admin") {
    return <AdminLayout>{comp}</AdminLayout>;
  } else {
    return <HomeLayout>{comp}</HomeLayout>;
  }
}
