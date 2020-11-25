import React from "react";
import GeneralLayout from "../layouts/GeneralLayout";
import { useHistory } from "react-router-dom";
import "../layouts/common.css";

export default function LandingPage(props) {
  const history = useHistory();
  const handleLogin = () => history.push("/login");
  const handleRegister = () => history.push("/register");

  return (
    <GeneralLayout>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div style={{ paddingTop: "5em", color: "grey" }} className="row">
              <div className="col-md-12">
                <h2>
                  <span style={{ fontSize: "1.5em", color: "#26AD54" }}>
                    Become part of the community
                  </span>{" "}
                  <br />
                  Take part in Coding Challenge to compete with developers
                </h2>
              </div>
            </div>
            <div style={{ paddingTop: "5em", color: "grey" }} className="row">
              <div className="col-md-2">
                <button
                  className="btn btn-lg btn-outline-success"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-lg btn-outline-success"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img src="/bgImage.jpg" alt="bg" />
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
}
