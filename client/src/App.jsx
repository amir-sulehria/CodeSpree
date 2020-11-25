import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Dashboard from "./components/Candidate/Dashboard";
import CodeEditor from "./components/Candidate/CodeEditor";
import Test from "./components/Candidate/Test";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/Dashboard" exact component={Dashboard} />
        <Route path="/practice" exact component={CodeEditor} />
        <Route path="/test" exact component={Test} />
      </Switch>
    </Router>
  );
};

export default App;
