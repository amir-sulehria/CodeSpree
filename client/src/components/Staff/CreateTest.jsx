import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import AdminLayout from "../../layouts/AdminLayout";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function CreateTest() {
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/api/test/create`, {
        name: name,
        date: startDate,
      })
      .then((response) => {
        history.push("/admin/test/create/addquestions");
      });
  };

  return (
    <AdminLayout>
      <div className="container" style={{ paddingTop: "3em" }}>
        <div className="row">
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name of test"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridDate">
              <Form.Label>Event Date</Form.Label>
              <br />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Create Test and add Questions
            </Button>
          </Form>{" "}
        </div>
      </div>
    </AdminLayout>
  );
}
