import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import HomeLayout from "../../layouts/HomeLayout";
import ExaminerLayout from "../../layouts/ExaminerLayout";
import axios from "axios";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";

export default function Inbox(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      const obj = jwt_decode(token);
      const id = obj.id;
      axios
        .get(`http://localhost:4000/api/users/inbox/${id}`)
        .then((response) => {
          return response.data.data.inbox;
        })
        .then((data) => {
          data.sort((a, b) =>
            new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
          );
          setLoading(false);
          setData(data);
        });
    }
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

  const getDate = (date) => {
    const update = new Date(date);
    return (
      <p>
        {update.getHours()}:{update.getMinutes()}
        {"\t"}
        {update.getDate()}/{update.getMonth()}/{update.getFullYear()}
      </p>
    );
  };

  const inboxComp = (
    <div className="container" style={{ paddingTop: "3em" }}>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Inbox</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => {
            return (
              <tr>
                <td>{d.msg}</td>
                <td>{getDate(d.createdAt)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );

  return props.role === "user" ? (
    <HomeLayout>{inboxComp}</HomeLayout>
  ) : (
    <ExaminerLayout>{inboxComp}</ExaminerLayout>
  );
}
