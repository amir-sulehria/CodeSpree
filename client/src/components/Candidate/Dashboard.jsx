import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import HomeLayout from "../../layouts/HomeLayout";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      const obj = jwt_decode(token);
      const id = obj.id;
      axios
        .get(`http://localhost:4000/api/user/tasks/${id}`)
        .then((response) => {
          return response.data.data.upcomingTasks;
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
        {update.getDate()}/{update.getMonth()}/{update.getFullYear()}
      </p>
    );
  };

  return (
    <HomeLayout>
      <div className="container" style={{ paddingTop: "3em" }}>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4">
            <div
              className="card"
              style={{
                width: "18rem",
                margin: "5px",
                backgroundColor: "#F0F1F6",
              }}
            >
              <div className="card-body">
                <h4>Recent News</h4>
                <hr />
                {data.map((d, i) => {
                  return (
                    <div key={i}>
                      <p className="card-text">{d.taskMsg}</p>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Deadline: {getDate(d.deadline)}
                      </h6>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
