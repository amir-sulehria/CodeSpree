import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HorizontalBar } from "react-chartjs-2";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import { useHistory } from "react-router-dom";
import ExaminerLayout from "../../layouts/ExaminerLayout";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [userId, setUserId] = useState();
  const [total, setTotal] = useState(0);
  const [dataStr, setDataStr] = useState(0);
  const [algo, setAlgo] = useState(0);
  const [gen, setGen] = useState(0);
  const [prob, setProb] = useState(0);

  const history = useHistory();

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
        .then((data) => {
          data.sort((a, b) =>
            new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
          );
          setLoading(false);
          setData(data);
        });
    }
  }, []);

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
          setTotal(data.length);
          data.map((d, i) => {
            if (d.category === "Data Structure") {
              setDataStr(dataStr + 1);
            } else if (d.category === "Problem Solving") {
              setProb(prob + 1);
            } else if (d.category === "General") {
              setGen(gen + 1);
            } else if (d.category === "Algorithm") {
              setAlgo(algo + 1);
            }
          });
          setLoading2(false);
        } else {
          setLoading2(false);
        }
      });
  }, []);

  if (loading && loading2) {
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
    return update.getDate() + "/" + update.getMonth();
  };
  const data1 = {
    labels: ["General", "Problem Solving", "Data Structure", "Algorithmitic"],
    datasets: [
      {
        label: "# of questions",
        data: [gen, prob, dataStr, algo],
        backgroundColor: [
          "rgba(255, 0, 100, 0.3)",
          "rgba(100, 0, 255, 0.3)",
          "rgba(255, 100, 0, 0.3)",
          "rgba(100, 0, 150, 0.3)",
        ],
        borderColor: [
          "rgba(255, 0, 0, 0.3)",
          "rgba(0, 0, 255, 0.3)",
          "rgba(255, 0, 0, 0.3)",
          "rgba(200, 0, 255, 0.3)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            stepSize: 1,
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <ExaminerLayout>
      <div className="container" style={{ paddingTop: "3em" }}>
        <div className="row">
          <div className="col-md-8">
            <HorizontalBar data={data1} options={options} />

            <h4 style={{ textAlign: "center" }}>Total questions = {total}</h4>
          </div>
          <div>
            <h4> Upcoming Requests</h4>
            <hr />
            {data.map((d, i) => {
              return (
                <div key={i} className="col-md-4">
                  <div
                    className="card"
                    style={{
                      width: "18rem",
                      margin: "5px",
                    }}
                  >
                    <div className="card-body">
                      <div key={i}>
                        <p className="card-text">{d.taskMsg}</p>
                        <p className="card-subtitle mb-2 text-muted">
                          Deadline: {getDate(d.deadline)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ExaminerLayout>
  );
}
