import React, { useState, useEffect } from "react";
import {
  Alert,
  FormControl,
  InputGroup,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";
import Cookie from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function UsersData(props) {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [tshow, setTShow] = useState();
  const [message, setMessage] = useState("");
  const [data, setData] = useState({ users: [] });
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    axios.get(props.url).then((response) => {
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

  const handleTask = async (id) => {
    const token = Cookie.get("token");
    if (token) {
      const res = await axios.patch(
        `http://localhost:4000/admin/user/task/${id}`,
        { taskMsg: message, deadline: startDate, createdAt: Date.now() }
      );
      if (res.status === 200) {
        setTShow(false);
      }
    }
  };

  const handleMessage = async (id) => {
    const token = Cookie.get("token");
    if (token) {
      const res = await axios.patch(
        `http://localhost:4000/admin/user/notify/${id}`,
        { msg: message, createdAt: Date.now() }
      );
      if (res.status === 200) {
        setShow(false);
      }
    }
  };

  const handleTaskAll = async () => {
    const res = await axios.patch(
      `http://localhost:4000/admin/user/notifyall`,
      { taskMsg: message, deadline: startDate, createdAt: Date.now() }
    );
    if (res.status === 200) {
      setShow3(false);
    }
  };
  const handleMessageAll = async () => {
    const res = await axios.patch(
      `http://localhost:4000/admin/user/messageall`,
      { msg: message, createdAt: Date.now() }
    );
    if (res.status === 200) {
      setShow2(false);
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
        <Alert.Heading>List of all registered {props.role}</Alert.Heading>
      </Alert>

      <div className="container">
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-2">
            <Button variant="primary" onClick={() => setShow2(true)}>
              Message All
            </Button>
          </div>
          <div className="col-md-2">
            <Button variant="info" onClick={() => setShow3(true)}>
              Notify All
            </Button>
          </div>
        </div>
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
                        className="btn btn-sm btn-primary"
                        onClick={() => setShow(true)}
                      >
                        Message
                      </button>
                      <Modal show={show} onHide={() => setShow(false)}>
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
                        className="btn btn-sm btn-info"
                        onClick={() => setTShow(true)}
                      >
                        Notify
                      </button>
                      <Modal show={tshow} onHide={() => setTShow(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Enter your message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <InputGroup className="mb-3">
                            <FormControl
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Enter message"
                              aria-label="message area"
                              aria-describedby="basic-addon2"
                            />
                          </InputGroup>
                          <InputGroup className="mb-3">
                            <Form.Label>Deadline{":  "}</Form.Label>

                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                          </InputGroup>

                          <Button
                            variant="primary"
                            onClick={() => handleTask(item.id)}
                          >
                            Send
                          </Button>
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

      <Modal show={show2} onHide={() => setShow2(false)}>
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
              <Button variant="primary" onClick={() => handleMessageAll()}>
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Modal.Body>
      </Modal>

      {/*  */}

      <Modal show={show3} onHide={() => setShow3(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
              aria-label="message area"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Label>Deadline{":  "}</Form.Label>

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </InputGroup>

          <Button variant="primary" onClick={() => handleTaskAll()}>
            Send
          </Button>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
}
