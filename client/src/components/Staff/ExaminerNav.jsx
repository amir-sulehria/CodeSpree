import React from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

const ExaminerNav = () => {
  const history = useHistory();
  return (
    <Navbar
      style={{ fontSize: "1.5em" }}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand
        as={Link}
        to="/examiner/dashboard"
        style={{ fontSize: "1.5em", fontWeight: "bold", color: "white" }}
      >
        CodeSpree
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link
            style={{ paddingRight: "1em" }}
            as={Link}
            to="/examiner/questions"
          >
            Questions
          </Nav.Link>
          <Nav.Link
            style={{ paddingRight: "1em" }}
            as={Link}
            to="/examiner/inbox"
          >
            Inbox
          </Nav.Link>
          <Nav.Link
            style={{ paddingRight: "1em" }}
            as={Link}
            to="/examiner/profile"
          >
            Profile
          </Nav.Link>
          <Nav.Link
            style={{ paddingRight: "1em" }}
            onClick={() => {
              axios.get("http://localhost:4000/api/users/signout");
              Cookie.remove("token");
              history.push("/");
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ExaminerNav;
