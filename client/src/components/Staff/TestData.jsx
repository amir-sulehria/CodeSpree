import React from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";

export default function MakeTest() {
  const history = useHistory();
  return (
    <AdminLayout>
      <Alert variant="success">
        <Alert.Heading>List of all Tests</Alert.Heading>
      </Alert>

      <div className="container">
        <div className="row">
          <div className="col-md-10"></div>
          <div className="col-md-2">
            <button
              className="btn btn-danger"
              onClick={() => history.push("/admin/test/create")}
            >
              +Create Test
            </button>
          </div>
          <div className="col-md-12">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Nov Hackathon</td>
                  <td>Nov2020</td>
                  <td>Pending</td>
                  <td>
                    <button className="btn btn-sm btn-primary">
                      View Results
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
