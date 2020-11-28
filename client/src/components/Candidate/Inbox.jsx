import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";

export default function Inbox() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      const obj = jwt_decode(token);
      const id = obj.id;
      axios
        .get(`http://localhost:4000/api/users/inbox/${id}`)
        .then((response) => {
          //   setData(response.data.data.user);
          setLoading(false);
          setData(response.data.data.inbox);
        });
    }
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

  return (
    <HomeLayout>
      <div className="container" style={{ paddingTop: "3em" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Inbox</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              <tr>
                <th scope="row">{1}</th>
                <td>{data}</td>
              </tr>
            ) : null}
          </tbody>
        </Table>
      </div>
    </HomeLayout>
  );
}
