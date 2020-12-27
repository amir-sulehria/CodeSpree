import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [testData, setTestData] = useState([]);
  const [questData, setQuestData] = useState([]);
  const [total, setTotal] = useState(0);
  const [dataStr, setDataStr] = useState(0);
  const [algo, setAlgo] = useState(0);
  const [gen, setGen] = useState(0);
  const [prob, setProb] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/testdata`).then((response) => {
      setTestData(response.data.data);
      axios.get(`http://localhost:4000/api/questions`).then((response) => {
        let data = response.data.data;
        let ds = 0;
        let pro = 0;
        let ge = 0;
        let alg = 0;
        setQuestData(response.data.data);
        if (data.length > 1) {
          data.map((d, i) => {
            if (d.category === "Data Structure") {
              ds = ds + 1;
            } else if (d.category === "Problem Solving") {
              pro = pro + 1;
            } else if (d.category === "General") {
              ge = ge + 1;
            } else if (d.category === "Algorithm") {
              alg = alg + 1;
            }
          });
          setTotal(data.length);
          setDataStr(ds);
          setProb(pro);
          setGen(ge);
          setAlgo(alg);
        }
        setLoading(false);
        console.log(algo);
      });
    });
  }, []);

  const getLabels = () => {
    const labels = [];
    testData.map((d, i) => {
      labels.push(d.name);
    });
    return labels;
  };

  const getCandidateTotal = () => {
    const total = [];
    testData.map((d, i) => {
      total.push(d.totalCandidates);
    });
    return total;
  };

  const getColors = (ar) => {
    const colors = [];
    ar.map((d) => {
      colors.push(
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 1)`
      );
    });
    return colors;
  };

  const data1 = {
    labels: getLabels(),
    datasets: [
      {
        label: "# of candidates",
        data: getCandidateTotal(),
        backgroundColor: getColors(testData),
      },
    ],
  };

  const data2 = {
    labels: ["General", "Problem Solving", "Data Struture", "Algorithm"],
    datasets: [
      {
        label: "Tests",
        data: [gen, prob, dataStr, algo],
        backgroundColor: getColors(questData),
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1,
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

  if (loading && loading2) {
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
      <div className="container" style={{ paddingTop: "3em" }}>
        <div className="row">
          <div className="col-md-6">
            <h3>Number of participating candidates</h3>
            <Bar data={data1} options={options} />
          </div>
          <div className="col-md-6">
            <h3>Total questions in database</h3>
            <Pie data={data2} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
