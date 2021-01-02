import React, { useEffect } from "react";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import axios from "axios";

export default function MakeTest() {
  const history = useHistory();

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState([]);

  const getDate = (date) => {
    const update = new Date(date);
    return (
      <p>
        {update.getDate()}/{update.getMonth()}/{update.getFullYear()}
      </p>
    );
  };

  useEffect(() => {
    axios.get("http://localhost:4000/api/tests").then((response) => {
      setTests(response.data.data.tests);
      setLoading(false);
    });

    axios
      .get(`http://localhost:4000/api/tests`)
      .then((response) => {
        return response.data.data.tests;
      })
      .then((data) => {
        if (data.length > 1) {
          data.sort((a, b) =>
            new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
          );
          setLoading(false);
          setTests(data);
        } else {
          setLoading(false);
          setTests(data);
        }
      });
  }, []);

  const handleOpen = (id) => {
    axios
      .patch(`http://localhost:4000/api/admin/opentest/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => alert("cannot update"));
  };

  const handleResult = (id) => {
    history.push(`/result/${id}`);
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
      <Alert variant="success">
        <Alert.Heading>List of all Tests</Alert.Heading>
      </Alert>

      <div className="container">
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <button
              className="btn btn-danger"
              onClick={() => history.push("/admin/test/create")}
            >
              +Create Test
            </button>
          </div>
          <div className="col-md-12">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((d, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{d.name}</td>
                      <td>{getDate(d.date)}</td>
                      <td>{d.status}</td>
                      {d.status !== "upcoming" ? (
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleResult(d.id)}
                          >
                            View Results
                          </button>
                        </td>
                      ) : (
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleOpen(d.id)}
                          >
                            Open Test
                          </button>
                        </td>
                      )}
                      <td>
                        <button className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
