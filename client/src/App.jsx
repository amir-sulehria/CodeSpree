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
import UsersData from "./components/Staff/UsersData";
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
import Inbox from "./components/Candidate/Inbox";
import InvigSys from "./components/Candidate/InvigSys";
import TestData from "./components/Staff/TestData";
import CreateTest from "./components/Staff/CreateTest";
import QuestionData from "./components/Staff/QuestionData";
import CreateQues from "./components/Staff/CreateQues";
import { TestProvider } from "./contextapi/TestContext";
import EditQues from "./components/Staff/EditQues";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={CLogin} />
        <Route path="/register" exact component={Register} />
        <Route path="/cs-staff" exact component={SLogin} />
        <AdminPrivateRoute path="/admin/dashboard" exact component={AdminDB} />
        <AdminPrivateRoute path="/admin/test" exact component={TestData} />
        <AdminPrivateRoute
          path="/admin/test/create"
          exact
          component={CreateTest}
        />
        <AdminPrivateRoute
          path="/admin/users"
          exact
          component={(props) => (
            <UsersData
              {...props}
              url="http://localhost:4000/api/users?role=user"
              role="Users"
            />
          )}
        />
        <AdminPrivateRoute
          path="/admin/staff"
          exact
          component={(props) => (
            <UsersData
              {...props}
              url="http://localhost:4000/api/users?role=staff"
              role={"Examiners"}
            />
          )}
        />
        <StaffPrivateRoute
          path="/examiner/dashboard"
          exact
          component={ExaminerDB}
        />
        <StaffPrivateRoute
          path="/examiner/questions"
          exact
          component={QuestionData}
        />
        <StaffPrivateRoute
          path="/examiner/questions/create"
          exact
          component={CreateQues}
        />
        <StaffPrivateRoute
          path="/examiner/questions/:id"
          exact
          component={EditQues}
        />
        <StaffPrivateRoute path="/examiner/inbox" exact component={Inbox} />
        <TestProvider>
          <UserPrivateRoute path="/dashboard" exact component={Dashboard} />
          <UserPrivateRoute
            path="/inbox"
            exact
            component={(props) => <Inbox {...props} role="user" />}
          />
          <UserPrivateRoute path="/test" exact component={Test} />
          <UserPrivateRoute path="/rankings" exact component={Rankings} />
          <UserPrivateRoute path="/profile" exact component={Profile} />
          <UserPrivateRoute path="/system-check" exact component={InvigSys} />
        </TestProvider>
      </Switch>
    </Router>
  );
};

export default App;
