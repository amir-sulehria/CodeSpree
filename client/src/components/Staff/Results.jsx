import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Alert, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export default function Results() {
  const [loading, setLoading] = useState(true);
  const [ranking, setRanking] = useState([]);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/submission/getranking/${id}`)
      .then((response) => {
        setRanking(response.data);
        setLoading(false);
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
    <AdminLayout>
      <Alert variant="success">
        <Alert.Heading>Rankings</Alert.Heading>
        <p>
          List of candidates who appeared in the exam along with their score
        </p>
      </Alert>
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
                    <th scope="col">Status</th>
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
                        <td>{d.status}</td>
                        <button
                          classname="btn btn-sm btn-primary"
                          onClick={() => history.push(`/test/view/${d.id}`)}
                        >
                          View Details
                        </button>
                        <td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  );
}
