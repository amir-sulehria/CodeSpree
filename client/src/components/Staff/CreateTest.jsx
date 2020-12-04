import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, FormControl } from "react-bootstrap";
import AdminLayout from "../../layouts/AdminLayout";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function CreateTest() {
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  const history = useHistory();
  const [created, setCreated] = useState(false);
  const [tid, setTId] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/questions`)
      .then((response) => {
        return response.data.data;
      })
      .then((data) => {
        data.sort((a, b) =>
          new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
        );
        setLoading(false);
        setData(data);
        console.log(data);
      });
  }, []);

  const handleAddQues = (e) => {
    e.preventDefault();
    const data = JSON.stringify(questions);
    axios
      .patch(`http://localhost:4000/api/test/${tid}/addquestions`, {
        data: data,
      })
      .then((response) => {
        history.push("/admin/dashboard");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:4000/api/test/create`, {
        name: name,
        date: startDate,
      })
      .then((response) => {
        setCreated(true);
        setTId(response.data.id);
      });
  };

  const createTest = (
    <>
      {" "}
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
    </>
  );

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
      <div className="container" style={{ paddingTop: "3em" }}>
        <div className="row">
          {created === false ? (
            createTest
          ) : (
            <div className="col-md-12">
              <button className="btn btn-info" onClick={handleAddQues}>
                Add Selected Questions
              </button>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Statement</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, ind) => (
                    <tr>
                      <th scope="row">{ind + 1}</th>
                      <td key={item.objectID}>{item.statement}</td>
                      <td>
                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Check
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setQuestions([...questions, item.id]);
                              } else {
                                setQuestions(
                                  questions.filter((e) => e !== item.id)
                                );
                              }
                            }}
                          />
                        </Form.Group>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
