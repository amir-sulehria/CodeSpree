import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";

export default function Practice(props) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();
  const history = useHistory();

  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("python3");
  const [stdin, setStdin] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTest = () => {
    console.log("test button clicked");
  };

  useEffect(() => {
    const token = Cookie.get("token");
    const obj = jwt_decode(token);
    const id = obj.id;
    axios.get(`http://localhost:4000/api/practice`).then((res) => {
      axios
        .get(`http://localhost:4000/api/user/solvedquestions/${id}`)
        .then((response) => {
          const questions = res.data.data;
          const solvedQues = response.data.data;
          const arQues = solvedQues.solvedQuestions;
          if (arQues.length >= 1) {
            const filteredQues = questions.filter(
              (d, i) => !arQues.includes(d.id)
            );
            setQuestions(filteredQues);
            console.log(filteredQues);
          } else {
            setQuestions(questions);
          }
          console.log(questions);
          console.log(solvedQues);
          setLoading(false);
        });
    });
  }, []);

  const prepareStdin = () => {
    let a = stdin.split(",");
    a = a.join("\n");
    return a;
  };
  const prepareStdinIn = (a) => {
    console.log("---------");
    console.log(a);
    a = a.split(",");
    a = a.join("\n");
    console.log(a);
    console.log("---------");
    return a;
  };
  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);

    valueGetter.current = _valueGetter;
  }

  const getLines = () => {
    let a = valueGetter.current();
    a = a.split(/\r\n|\r|\n/).length;
    return a;
  };

  const getComment = () => {
    if (lang === "python3") {
      return "#comment";
    } else {
      return "//comment";
    }
  };

  const handleSubmit = async () => {
    let t1in = prepareStdinIn(questions[0].testC1In.toString());
    let t2in = prepareStdinIn(questions[0].testC2In.toString());
    let t3in = prepareStdinIn(questions[0].testC3In.toString());

    const token = Cookie.get("token");
    const obj = jwt_decode(token);
    const id = obj.id;

    let url = "http://localhost:4000/api/run";
    let data = {
      script: valueGetter.current() ? valueGetter.current() : getComment(),
      language: lang,
      stdin: t1in,
      versionIndex: "0",
      clientId: "7e7642102f3f94520bbdb97de9374678",
      clientSecret:
        "6d8f21bd22164605af37871acba14b50041682fb8f060fab6355737b1cff19b9",
    };
    let res = await axios.post(url, data);
    let t1 = res.data.data.output.toString();
    t1 = t1.trim();
    url = "http://localhost:4000/api/run";
    data = {
      script: valueGetter.current() ? valueGetter.current() : getComment(),
      language: lang,
      stdin: t2in,
      versionIndex: "0",
      clientId: "7e7642102f3f94520bbdb97de9374678",
      clientSecret:
        "6d8f21bd22164605af37871acba14b50041682fb8f060fab6355737b1cff19b9",
    };
    res = await axios.post(url, data);
    let t2 = res.data.data.output.toString();
    t2 = t2.trim();
    url = "http://localhost:4000/api/run";
    data = {
      script: valueGetter.current() ? valueGetter.current() : getComment(),
      language: lang,
      stdin: t3in,
      versionIndex: "0",
      clientId: "7e7642102f3f94520bbdb97de9374678",
      clientSecret:
        "6d8f21bd22164605af37871acba14b50041682fb8f060fab6355737b1cff19b9",
    };
    res = await axios.post(url, data);
    let t3 = res.data.data.output.toString();
    t3 = t3.trim();
    if (
      t1 === questions[0].testC1Out.toString() &&
      t2 === questions[0].testC2Out.toString() &&
      t3 === questions[0].testC3Out.toString()
    ) {
      axios
        .patch(`http://localhost:4000/api/practice/${id}`, {
          ques: questions[0].id,
        })
        .then((res) => {
          setQuestions(questions.filter((d, i) => i !== 0));
        });
    } else {
      alert("Try again");
    }
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
    console.log(questions);
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
          <h2>Wait for more questions.</h2>
          <button onClick={() => history.push("/dashboard")}>
            Go back to dashboard
          </button>
        </div>
      )}
    </HomeLayout>
  );
}
