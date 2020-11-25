import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";

export default function CodeEditor(props) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function handleShowValue() {
    alert(valueGetter.current());
  }

  const handleTest = async () => {
    // let url = "https://api.jdoodle.com/v1/execute";
    // let data = {
    //   script: `print("hi")`,
    //   language: "python3",
    //   versionIndex: "0",
    //   clientId: "7e7642102f3f94520bbdb97de9374678",
    //   clientSecret:
    //     "aa436e0d377b4bdbf3bdc692aa90fc0ff7bea5fd7380576312104846d58af797",
    // };
    // const res = await axios.post(url, data);
    // console.log(res);
  };

  return (
    <HomeLayout>
      <div className="container">
        <div className="row">
          <h3 style={{ fontWeight: "bold" }}>Question: </h3>
          <div className="col-md-12">{props.question}</div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Editor
              height="70vh"
              language="java"
              value={"// write your code here"}
              theme="dark"
              editorDidMount={handleEditorDidMount}
            />
          </div>

          <div style={{ backgroundColor: "#202124" }} className="col-6">
            <h3>Output Screen</h3>
            <p></p>
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
