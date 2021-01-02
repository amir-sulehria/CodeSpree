import React, { useState } from "react";
import { Form, Button, Image, Col } from "react-bootstrap";
import axios from "axios";
import Cookie from "js-cookie";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import AdminLayout from "../../layouts/AdminLayout";

export default function CandDetails(props) {
  const [loading, setLoading] = useState();
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [score, setScore] = useState();
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [userId, setUserId] = useState();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/submissions/submission/${id}`)
      .then((response) => {
        let data = response.data;
        setImg(data.userID.photo);
        setName(data.userID.name);
        setEmail(data.userID.email);
        setUserId(data.userID.id);
        setScore(data.totalScore);
        setImg1(data.img1);
        setImg2(data.img2);
        setImg3(data.img3);
        setLoading(false);
      });
  }, []);

  const handleCancel = () => {
    axios
      .patch(`http://localhost:4000/api/user/cancel/${id}`)
      .then((res) => {
        axios
          .patch(`http://localhost:4000/admin/user/notify/${userId}`, {
            msg: `Your test has been cancelled due to violation of tos`,
            createdAt: Date.now(),
          })
          .then((res) => alert("Action Completed"))
          .catch((err) => alert("try again"));
        history.push("/admin/dashboard");
      })
      .catch((err) => alert("Cannot Update"));
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
        <div className="row">
          <Form>
            <Form.Group controlId="formBasicImg">
              <Image src={img} rounded style={{ height: "10em" }} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" value={name} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={email} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Score</Form.Label>
              <Form.Control type="text" value={score} disabled />
            </Form.Group>
          </Form>
        </div>
        <div className="row">
          <div className="col-md-4">
            <img style={{ width: "20em" }} src={img1} alt="img1" />
          </div>
          <div className="col-md-4">
            <img style={{ width: "20em" }} src={img2} alt="img2" />
          </div>
          <div className="col-md-4">
            <img style={{ width: "20em" }} src={img3} alt="img3" />
          </div>
        </div>
        <div className="row">
          <button className="btn btn-sm btn-info" onClick={handleCancel}>
            Cancel Test
          </button>
        </div>
        <br />
      </div>
    </AdminLayout>
  );
}
