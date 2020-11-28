import React, { useState, useEffect } from "react";
import { Alert, Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import Cookie from "js-cookie";

export default function ExaminerData() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({ users: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:4000/api/users?role=staff").then((response) => {
      setData(response.data.data.users);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  console.log(data);

  const handleNotify = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleMessage = async (id) => {
    const token = Cookie.get("token");
    if (token) {
      const res = await axios.patch(
        `http://localhost:4000/admin/user/notify/${id}`,
        { message }
      );
      if (res.status === 200) {
        setShow(false);
      }
    }
  };

  const handleDelete = async (id) => {
    const token = Cookie.get("token");
    if (token) {
      const res = await axios.delete(
        `http://localhost:4000/api/users/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 204) {
        const arr = data.filter((item) => item.id !== id);
        setData(arr);
      }
    }
  };

  return (
    <AdminLayout>
      <Alert variant="success">
        <Alert.Heading>List of all registered Exam Makers</Alert.Heading>
      </Alert>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, ind) => (
                  <tr>
                    <th scope="row">{ind + 1}</th>
                    <td key={item.objectID}>{item.name}</td>
                    <td key={item.objectID}>{item.email}</td>
                    <td>
                      <button className="btn btn-sm btn-success">Edit</button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={handleNotify}
                      >
                        Notify
                      </button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Enter message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <InputGroup className="mb-3">
                            <FormControl
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Enter message"
                              aria-label="message area"
                              aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                              <Button
                                variant="primary"
                                onClick={() => handleMessage(item.id)}
                              >
                                Send
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                        </Modal.Body>
                      </Modal>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
