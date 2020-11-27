import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Alert, FormControl, InputGroup } from "react-bootstrap";

export default function Rankings() {
  return (
    <HomeLayout>
      <Alert variant="success">
        <Alert.Heading>Results for Nov 2020 announced</Alert.Heading>
        <p>
          List of candidates who appeared in the exam along with their score
        </p>
      </Alert>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Score</th>
                  <th scope="col">City</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>95</td>
                  <td>Lahore</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>90</td>
                  <td>Islamabad</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>80</td>
                  <td>Karachi</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <h4>Filter By:</h4>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  Name
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">
                  City
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
