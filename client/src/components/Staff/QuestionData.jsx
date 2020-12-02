import React, { useEffect } from "react";
import { Accordion, Card, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ExaminerLayout from "../../layouts/ExaminerLayout";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import axios from "axios";

export default function QuestionData() {
  const history = useHistory();

  useEffect(() => {
    const token = Cookie.get("token");
    const id = jwt_decode(token);
    axios
      .get(`http://localhost:4000/api/questions/${id.id}`)
      .then((response) => {
        console.log(response.data);
      });
  }, []);

  return (
    <ExaminerLayout>
      <div className="container" style={{ padding: "3em" }}>
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <button
              className="btn btn-danger"
              onClick={() => history.push("/examiner/questions/create")}
            >
              +Create New
            </button>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="light" eventKey="0">
                    Data Structure and Algorithms
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Mark</td>
                          <td>
                            <Button>Edit</Button>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Jacob</td>
                          <td>
                            <Button>Edit</Button>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td colSpan="2">Larry the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Click me!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </div>
    </ExaminerLayout>
  );
}
