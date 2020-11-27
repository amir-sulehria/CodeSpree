import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

export default function CodeEditor(props) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("python3");

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function handleShowValue() {
    alert(valueGetter.current());
  }

  const handleTest = async () => {
    let url = "http://localhost:4000/api/run";
    let data = {
      script: valueGetter.current(),
      language: lang,
      versionIndex: "0",
      clientId: "7e7642102f3f94520bbdb97de9374678",
      clientSecret:
        "6d8f21bd22164605af37871acba14b50041682fb8f060fab6355737b1cff19b9",
    };
    const res = await axios.post(url, data);
    setOutput(res.data.data.output);
  };

  return (
    <HomeLayout>
      <div className="container">
        <div className="row">
          <h3 style={{ fontWeight: "bold" }}>Question: </h3>
          <div className="col-md-12">{props.question}</div>
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
            <h3>Output Screen</h3>
            <hr /> {">>>"}
            <p>{output}</p>
            <label htmlFor="lang">Choose Lang</label>
            <br />
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
              <option value="nodejs">nodejs</option>
            </select>
          </div>
        </div>
        <br />
        <div className="row">
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
              onClick={handleShowValue}
              disabled={!isEditorReady}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
