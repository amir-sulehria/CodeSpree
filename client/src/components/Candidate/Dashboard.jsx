import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import HomeLayout from "../../layouts/HomeLayout";
import { useHistory } from "react-router-dom";
import { TestContext } from "../../contextapi/TestContext";

export default function Dashboard() {
  const [tests, setTests] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [userId, setUserId] = useState();
  const [selectedTest, setSelectedTest] = useContext(TestContext);

  const getServerTime = async () => {
    const res = await axios.get("http://localhost:4000/api/servertime");
    let serverTime = res.data.data;
    return serverTime;
  };

  const history = useHistory();

  const handleStart = (id) => {
    setSelectedTest(id);
    history.push("/system-check");
  };

  const hanldeParticipate = (testid) => {
    const token = Cookie.get("token");
    if (token) {
      const obj = jwt_decode(token);
      const id = obj.id;
      setUserId(id);
      axios
        .patch(`http://localhost:4000/api/test/register/${testid}`, {
          userId: id,
        })
        .then((response) => {
          console.log(response.data);
          axios
            .post(`http://localhost:4000/api/submission/create`, {
              userID: id,
              testID: testid,
              totalScore: 0,
            })
            .then((response) => {
              console.log(response.data);
              window.location.reload();
            });
        });
    }
  };

  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      const obj = jwt_decode(token);
      const id = obj.id;
      setUserId(id);
      axios
        .get(`http://localhost:4000/api/user/tasks/${id}`)
        .then((response) => {
          return response.data.data.upcomingTasks;
        })
        .then((d) => {
          d = d.filter((a) => {
            return new Date(a.deadline) > new Date(Date.now());
          });
          setLoading(false);
          setData(d);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/user/upcomingtests`)
      .then((response) => {
        setLoading2(false);
        setTests(response.data.data.tests);
      });
  }, []);

  if (loading || loading2) {
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
  console.log(tests);

  return (
    <HomeLayout>
      <div className="container" style={{ paddingTop: "3em" }}>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              {tests.map((d, i) => {
                return (
                  <div className="col-md-6">
                    <div
                      className="card"
                      style={{
                        width: "18rem",
                        margin: "5px",
                      }}
                    >
                      <div className="card-body">
                        <div key={i}>
                          <p className="card-text">{d.name}</p>
                          <h6 className="card-subtitle mb-2 text-muted">
                            Date: {getDate(d.date)}
                          </h6>
                          <hr />
                          {d.registeredUsers.indexOf(userId) === -1 ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => hanldeParticipate(d.id)}
                            >
                              Participate
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary"
                              onClick={() => handleStart(d.id)}
                            >
                              Start
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
