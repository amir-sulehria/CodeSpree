import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CLogin from "./components/Login";
import SLogin from "./components/Staff/Login";
import AdminDB from "./components/Staff/AdminDB";
import ExaminerDB from "./components/Staff/ExaminerDB";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import LandingPage from "./components/LandingPage";
import Register from "./components/Register";
import Dashboard from "./components/Candidate/Dashboard";
import Test from "./components/Candidate/Test";
import Rankings from "./components/Candidate/Rankings";
import Profile from "./components/Candidate/Profile";
import UserPrivateRoute from "./UserPrivateRoute";
import AdminPrivateRoute from "./AdminPrivateRoute";
import StaffPrivateRoute from "./StaffPrivateRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={CLogin} />
        <Route path="/register" exact component={Register} />
        <Route path="/cs-staff" exact component={SLogin} />
        <UserPrivateRoute path="/dashboard" exact component={Dashboard} />
        <AdminPrivateRoute path="/admin/dashboard" exact component={AdminDB} />
        <StaffPrivateRoute
          path="/examiner/dashboard"
          exact
          component={ExaminerDB}
        />
        <UserPrivateRoute path="/test" exact component={Test} />
        <UserPrivateRoute path="/rankings" exact component={Rankings} />
        <UserPrivateRoute path="/profile" exact component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;
