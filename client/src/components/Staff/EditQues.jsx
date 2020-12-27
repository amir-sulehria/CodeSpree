import React from "react";
import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import ExaminerLayout from "../../layouts/ExaminerLayout";
import axios from "axios";
import { useEffect } from "react";

export default function EditQues() {
  const [error, setError] = useState("");
  const [statement, setStatement] = useState("");
  const [type, setType] = useState("Test");
  const [category, setCategory] = useState("");
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
  const [loading, setLoading] = useState(true);

  const [skill, setSkill] = useState([
    "None",
    "General",
    "Data Structure",
    "Algorithm",
    "Problem Solving",
  ]);
  const history = useHistory();

  let { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:4000/api/question/${id}`).then((response) => {
      let data = response.data.data;
      setStatement(data.statement);
      setType(data.type);
      setCategory(data.category);
      setTotalMarks(data.marks);
      setSolW(data.solW);
      setTCOne(data.testC1In);
      setTCTwo(data.testC2In);
      setTCThree(data.testC3In);
      setTCOneOutput(data.testC1Out);
      setTCTwoOutput(data.testC2Out);
      setTCThreeOutput(data.testC3Out);
      setSampleIn(data.sampleIn);
      setSampleOut(data.sampleOut);
      setSubW(data.socW);
      setLineW(data.locW);
      setSubThreshold(data.subT);
      setLineThreshold(data.locT);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `http://localhost:4000/api/question/${id}`,
        {
          statement: statement,
          type: type,
          category: category,
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

  if (loading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

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
                    value={statement}
                    placeholder="Enter Question Statement"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option>Test</option>;<option>Practice</option>;
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Label</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={category}
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
                  <Form.Label>Marks</Form.Label>
                  <Form.Control
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(e.target.value)}
                    type="text"
                    placeholder="Enter total possible marks"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Solution Weightage</Form.Label>
                  <Form.Control
                    onChange={(e) => setSolW(e.target.value)}
                    value={solW}
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
                    value={tcOne}
                    type="text"
                    placeholder="Enter input"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Test Case Output (1)</Form.Label>
                  <Form.Control
                    onChange={(e) => setTCOneOutput(e.target.value)}
                    value={tcOneOutput}
                    type="text"
                    placeholder="Enter output"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Test Case Input (2)</Form.Label>
                  <Form.Control
                    onChange={(e) => setTCTwo(e.target.value)}
                    value={tcTwo}
                    type="text"
                    placeholder="Enter input"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Test Case Output (2)</Form.Label>
                  <Form.Control
                    onChange={(e) => setTCTwoOutput(e.target.value)}
                    value={tcTwoOutput}
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
                    value={tcThree}
                    type="text"
                    placeholder="Enter input"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Test Case Output (3)</Form.Label>
                  <Form.Control
                    onChange={(e) => setTCThreeOutput(e.target.value)}
                    value={tcThreeOutput}
                    type="text"
                    placeholder="Enter output"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Sample Input</Form.Label>
                  <Form.Control
                    onChange={(e) => setSampleIn(e.target.value)}
                    value={sampleIn}
                    type="text"
                    placeholder="Enter input"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Sample Output</Form.Label>
                  <Form.Control
                    onChange={(e) => setSampleOut(e.target.value)}
                    value={sampleOut}
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
                    value={subW}
                    type="text"
                    placeholder="Enter weightage"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Submission Threshold</Form.Label>
                  <Form.Control
                    onChange={(e) => setSubThreshold(e.target.value)}
                    value={subThreshold}
                    type="text"
                    placeholder="Enter submission threshold"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>LineOfCode Weightage</Form.Label>
                  <Form.Control
                    onChange={(e) => setLineW(e.target.value)}
                    value={lineW}
                    type="text"
                    placeholder="Enter weightage"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>LineOfCode Threshold</Form.Label>
                  <Form.Control
                    onChange={(e) => setLineThreshold(e.target.value)}
                    value={lineThreshold}
                    type="text"
                    placeholder="Enter threshold"
                  />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Update
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
