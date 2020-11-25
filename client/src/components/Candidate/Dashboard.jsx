import React from "react";
import { Link } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";

export default function Dashboard() {
  return (
    <HomeLayout>
      <div className="container" style={{ paddingTop: "3em" }}>
        <div class="card" style={{ width: "18rem" }}>
          <div class="card-body">
            <h5 class="card-title">Monthly Coding Competition</h5>
            <h6 class="card-subtitle mb-2 text-muted">November 2020</h6>
            <p class="card-text">
              Participate in the competetion to test your skills
            </p>
            <Link to="/test" class="card-link">
              Start
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
