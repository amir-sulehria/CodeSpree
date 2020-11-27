import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="container" style={{ paddingTop: "3em" }}>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Monthly Coding Competition</h5>
            <h6 className="card-subtitle mb-2 text-muted">November 2020</h6>
            <p className="card-text">
              Participate in the competetion to test your skills
            </p>
            <Link to="/test" className="card-link">
              Start
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
