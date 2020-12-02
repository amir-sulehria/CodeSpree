import React from "react";
import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ExaminerLayout from "../../layouts/ExaminerLayout";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";

export default function CreateQues() {
  const [error, setError] = useState("");
  const [statement, setStatement] = useState("");
  const [type, setType] = useState("Test");
  const [category, setCategory] = useState("");
  const [inputType, setInputType] = useState("Integer");
  const [sampleIn, setSampleIn] = useState();
  const [sampleOut, setSampleOut] = useState();
  const [tcOne, setTCOne] = useState("");
  const [tcOneOutput, setTCOneOutput] = useState("");
  const [tcTwo, setTCTwo] = useState("");
  const [tcTwoOutput, setTCTwoOutput] = useState("");
  const [tcThree, setTCThree] = useState("");
  const [tcThreeOutput, setTCThreeOutput] = useState("");
  const [solW, setSolW] = useState();
  const [subW, setSubW] = useState();
  const [subThreshold, setSubThreshold] = useState();
  const [lineW, setLineW] = useState();
  const [lineThreshold, setLineThreshold] = useState();
  const [totalMarks, setTotalMarks] = useState();

  const [skill, setSkill] = useState([
    "None",
    "Data Structure",
    "Algorithm",
    "Problem Solving",
    "Operating System",
  ]);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookie.get("token");
    const id = jwt_decode(token);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/question/create",
        {
          statement: statement,
          type: type,
          category: category,
          stdinType: inputType,
          marks: totalMarks,
          solW: solW,
          testC1In: tcOne,
          testC2In: tcTwo,
          testC3In: tcThree,
          testC1Out: tcOneOutput,
          testC2Out: tcTwoOutput,
          testC3Out: tcThreeOutput,
          sampleIn: sampleIn,
          sampleOut: sampleOut,
          socW: subW,
          subT: subThreshold,
          locW: lineW,
          locT: lineThreshold,
          madeBy: id.id,
        }
      );
      if (res.data) {
        history.push("/examiner/questions");
      }
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response; // take everything but 'request'
      try {
        if (errorObject.data.errors) {
          errorObject.data.errors.map((e) => {
            setError(e.message);
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <ExaminerLayout>
      <div className="container" style={{ paddingTop: "3em" }}>
        <div className="row">
          <div className="col-md-12">
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridStatement">
                  <Form.Label>Statement</Form.Label>
                  <Form.Control
                    onChange={(e) => setStatement(e.target.value)}
                    type="text"
                    placeholder="Enter Question Statement"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Select..."
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option>Test</option>;<option>Practice</option>;
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Label</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Select..."
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {skill.map((el) => {
                      return <option>{el}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Input Type</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Select..."
                    onChange={(e) => setInputType(e.target.value)}
                  >
                    <option>Integer</option>;<option>Double</option>;
                    <option>String</option>;
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Marks</Form.Label>
                  <Form.Control
                    onChange={(e) => setTotalMarks(e.target.value)}
                    type="text"
                    placeholder="Enter total possible marks"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Solution Weightage</Form.Label>
                  <Form.Control
                    onChange={(e) => setSolW(e.target.value)}
                    type="text"
                    placeholder="Enter weightage"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Test Case Input (1)</Form.Label>
                  <Form.Control
                    onChange={(e) => setTCOne(e.target.value)}
                    type="text"
                    placeholder="Enter input"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Test Case Output (1)</Form.Label>
                  <Form.Control
                    onChange={(e) => setTCOneOutput(e.target.value)}
                    type="text"
                    placeholder="Enter output"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Test Case Input (2)</Form.Label>
                  <Form.Control
                    onChange={(e) => setTCTwo(e.target.value)}
                    type="text"
                    placeholder="Enter input"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Test Case Output (2)</Form.Label>
                  <Form.Control
                    onChange={(e) => setTCTwoOutput(e.target.value)}
                    type="text"
                    placeholder="Enter output"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Test Case Input (3)</Form.Label>
                  <Form.Control
                    onChange={(e) => setTCThree(e.target.value)}
                    type="text"
                    placeholder="Enter input"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Test Case Output (3)</Form.Label>
                  <Form.Control
                    onChange={(e) => setTCThreeOutput(e.target.value)}
                    type="text"
                    placeholder="Enter output"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Sample Input</Form.Label>
                  <Form.Control
                    onChange={(e) => setSampleIn(e.target.value)}
                    type="text"
                    placeholder="Enter input"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Sample Output</Form.Label>
                  <Form.Control
                    onChange={(e) => setSampleOut(e.target.value)}
                    type="text"
                    placeholder="Enter output"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Speed Coding Weightage</Form.Label>
                  <Form.Control
                    onChange={(e) => setSubW(e.target.value)}
                    type="text"
                    placeholder="Enter weightage"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Submission Threshold</Form.Label>
                  <Form.Control
                    onChange={(e) => setSubThreshold(e.target.value)}
                    type="text"
                    placeholder="Enter submission threshold"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>LineOfCode Weightage</Form.Label>
                  <Form.Control
                    onChange={(e) => setLineW(e.target.value)}
                    type="text"
                    placeholder="Enter weightage"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>LineOfCode Threshold</Form.Label>
                  <Form.Control
                    onChange={(e) => setLineThreshold(e.target.value)}
                    type="text"
                    placeholder="Enter threshold"
                  />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
            <br />
            {error}
          </div>
        </div>
      </div>
    </ExaminerLayout>
  );
}
