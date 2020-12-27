import React, { useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Alert, FormControl, InputGroup } from "react-bootstrap";
import { useContext } from "react";
import { TestContext } from "../../contextapi/TestContext";
import axios from "axios";

export default function Rankings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useContext(TestContext);

  useEffect(() => {
    console.log(selectedTest);
    axios
      .get(`http://localhost:4000/api/submission/getranking/${selectedTest}`)
      .then((response) => {
        setLoading(false);
        setData(response.data);
        console.log(data);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <HomeLayout>
      <Alert variant="success">
        <Alert.Heading>Rankings</Alert.Heading>
        <p>
          List of candidates who appeared in the exam along with their score
        </p>
      </Alert>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{d.userID.name}</td>
                      <td>{d.totalScore}</td>
                    </tr>
                  );
                })}
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
