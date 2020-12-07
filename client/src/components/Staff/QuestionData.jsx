import React, { useEffect } from "react";
import { Accordion, Card, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ExaminerLayout from "../../layouts/ExaminerLayout";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import axios from "axios";
import { useState } from "react";

export default function QuestionData() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookie.get("token");
    const id = jwt_decode(token);

    axios
      .get(`http://localhost:4000/api/questions/${id.id}`)
      .then((response) => {
        return response.data.data;
      })
      .then((data) => {
        if (data.length > 1) {
          data.sort((a, b) =>
            new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
          );
          setLoading(false);
          setData(data);
        } else {
          setLoading(false);
          setData(data);
        }
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
  const getDate = (date) => {
    const update = new Date(date);
    return (
      <p>
        {update.getDate()}/{update.getMonth()}/{update.getFullYear()}
      </p>
    );
  };

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
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Statement</th>
                  <th scope="col">Type</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, ind) => (
                  <tr>
                    <th scope="row">{ind + 1}</th>
                    <td key={item.objectID}>{item.statement}</td>
                    <td key={item.objectID}>{item.type}</td>
                    <td key={item.objectID}>{getDate(item.createdAt)}</td>
                    <td>
                      <button className="btn btn-sm btn-info">View</button>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-warning">Edit</button>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ExaminerLayout>
  );
}
