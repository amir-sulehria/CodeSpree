import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { Accordion, Dropdown, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";

export default function CodeEditor(props) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();
  const history = useHistory();

  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("python3");
  const [stdin, setStdin] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testId, setTestId] = useState("5fc8c68674d13c0b1c64ace5");
  const [currentStart, setCurrentStart] = useState(new Date());
  const [currentEnd, setCurrentEnd] = useState(new Date());

  const getLines = () => {
    let a = valueGetter.current();
    a = a.split(/\r\n|\r|\n/).length;
    return a;
  };

  const handleTest = () => {};

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/tests/test/${testId}`)
      .then((response) => {
        setQuestions(response.data.data.questions);
        setLoading(false);
        setCurrentStart(new Date(Date.now()));
      });
  }, []);

  const prepareStdin = () => {
    let a = stdin.split(",");
    a = a.join("\n");
    return a;
  };
  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);

    valueGetter.current = _valueGetter;
  }

  const setTime = () => {
    setCurrentEnd(new Date(Date.now()));
  };
  const handleSubmit = () => {
    const token = Cookie.get("token");
    setTime();
    const obj = jwt_decode(token);
    const id = obj.id;
    axios
      .patch(
        `http://localhost:4000/api/submission/${"5fc9f1d09977ed2bd86756bf"}/addanswer`,
        {
          userId: id,
          testId: "5fc8c68674d13c0b1c64ace5",
          questionId: questions[0].id,
          statement: questions[0].statement,
          startedAt: currentStart,
          submittedAt: new Date(Date.now()),
          lineOfCode: getLines(),
          code: valueGetter.current(),
        }
      )
      .then((response) => {
        setQuestions(questions.filter((d, i) => i !== 0));
        setCurrentStart(new Date(Date.now()));
      });
  };

  const handleCheck = () => {
    alert(Math.ceil((currentEnd.getTime() - currentStart.getTime()) / 1000));
  };

  const handleRun = async () => {
    let url = "http://localhost:4000/api/run";
    let data = {
      script: valueGetter.current(),
      language: lang,
      stdin: prepareStdin(),
      versionIndex: "0",
      clientId: "7e7642102f3f94520bbdb97de9374678",
      clientSecret:
        "6d8f21bd22164605af37871acba14b50041682fb8f060fab6355737b1cff19b9",
    };
    const res = await axios.post(url, data);
    setOutput(res.data.data.output);
  };

  if (loading) {
    return (
      <HomeLayout>
        <br />
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </HomeLayout>
    );
  }
  return (
    <HomeLayout>
      {questions[0] ? (
        <div className="container">
          <div className="row">
            <h3 style={{ fontWeight: "bold" }}>Problem: </h3>
            <div className="col-md-12">{questions[0].statement}</div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <Editor
                height="70vh"
                language="java"
                theme="dark"
                editorDidMount={handleEditorDidMount}
              />
            </div>
            <div
              // style={{ backgroundColor: "#202124", color: "white" }}
              className="col-4"
            >
              <h4>Standard Input</h4>
              <input
                type="text"
                placeholder="line separated input"
                onChange={(e) => setStdin(e.target.value)}
              />
              <hr />
              <h4>Output Screen</h4>
              <hr /> {">>>"}
              <p>{output}</p>
              <label htmlFor="lang">Choose Lang</label>
              <br />
              <h5>Sample Input: {questions[0].sampleIn}</h5>
              <h5>Sample Output: {questions[0].sampleOut}</h5>
              <select
                name="lang"
                id="lang"
                onChange={(e) => {
                  setLang(e.target.value);
                }}
              >
                <option value="python3">python3</option>
                <option value="java">java</option>
                <option value="c">c</option>
              </select>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-1">
              <button
                className="btn btn-lg btn-success"
                onClick={handleRun}
                disabled={!isEditorReady}
              >
                Run
              </button>
            </div>
            <div className="col-md-1">
              <button
                className="btn btn-lg btn-success"
                onClick={handleTest}
                disabled={!isEditorReady}
              >
                Test
              </button>
            </div>
            <div className="col-md-1">
              <button
                className="btn btn-lg btn-success"
                onClick={handleSubmit}
                disabled={!isEditorReady}
              >
                Submit
              </button>
            </div>
            <div className="col-md-1">
              <button
                className="btn btn-lg btn-success"
                onClick={getLines}
                disabled={!isEditorReady}
              >
                Check
              </button>
            </div>
          </div>
          <br />
          <br />
        </div>
      ) : (
        <div>
          <h2>Test Complete</h2>
          <button onClick={() => history.push("/dashboard")}>
            Go back to dashboard
          </button>
        </div>
      )}
    </HomeLayout>
  );
}
