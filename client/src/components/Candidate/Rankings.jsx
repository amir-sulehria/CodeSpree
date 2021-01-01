import React, { useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Alert, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import { useContext } from "react";
import { TestContext } from "../../contextapi/TestContext";
import axios from "axios";

export default function Rankings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState();
  const [ranking, setRanking] = useState([]);

  const handleLoad = () => {
    let selectedTest;
    if (typeof test === "undefined") {
      selectedTest = data[0].name;
    } else {
      selectedTest = test;
    }
    const id = data.filter((e) => e.name === selectedTest);
    if (id[0]) {
      axios
        .get(`http://localhost:4000/api/submission/getranking/${id[0].id}`)
        .then((res) => {
          setRanking(res.data);
          console.log(res);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/users/getalltests`)
      .then((response) => {
        setLoading(false);
        setData(response.data.data);
        console.log(response.data.data);
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
          <div className="col-md-6">
            <h3>Select Test to load</h3>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Test</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setTest(e.target.value)}
              >
                {data.map((el) => {
                  return <option>{el.name}</option>;
                })}
              </Form.Control>
              <br />
              <button className="btn btn-info" onClick={handleLoad}>
                Load
              </button>
            </Form.Group>
          </div>
        </div>
      </div>
      <hr />
      {typeof ranking !== "undefined" || ranking.length >= 1 ? (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((d, i) => {
                    return (
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{d.userID.name}</td>
                        <td>
                          {d.userID.email.substring(
                            0,
                            d.userID.email.lastIndexOf("@")
                          )}
                        </td>
                        <td>{d.totalScore}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </HomeLayout>
  );
}
