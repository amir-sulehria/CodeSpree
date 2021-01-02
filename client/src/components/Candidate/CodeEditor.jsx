import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import "./CodeEditor.css";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import Webcam from "react-webcam";
import Countdown from "react-countdown";

export default function CodeEditor(props) {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const valueGetter = useRef();
  const history = useHistory();
  const webcamRef = useRef(null);

  const [camStatus, setCamStatus] = useState("pending");
  const [fullScreen, setFullScreen] = useState("pending");
  const [not, setNot] = useState("pending");
  const [storage, setStorage] = useState("pending");
  const picOne = Math.floor(Math.random() * 10000);
  const picTwo = Math.floor(Math.random() * 10000) + picOne;
  const picThree = Math.floor(Math.random() * 10000) + picTwo;

  const [output, setOutput] = useState("");
  const [lang, setLang] = useState("python3");
  const [stdin, setStdin] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStart, setCurrentStart] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [currentEnd, setCurrentEnd] = useState(new Date());
  const [obtainedScore, setObtainedScore] = useState(0);

  const { testid } = useParams();

  //invig sys
  const handleFullScreen = () => {
    if (
      window.innerHeight === window.screen.height ||
      window.screen.height - window.innerHeight < 5
    ) {
      setFullScreen("✔");
    } else {
      setFullScreen("Pending");
      new Notification("Turn on full screen mode or test will be cancelled");
      setTimeout(handleChange, 10000);
    }
  };

  const handleChange = async () => {
    const token = Cookie.get("token");
    const obj = jwt_decode(token);
    const id = obj.id;

    if (
      window.innerHeight !== window.screen.height ||
      window.screen.height - window.innerHeight > 5
    ) {
      axios
        .patch(`http://localhost:4000/api/submission/updatestatus/${testid}`, {
          status: "violated",
          userId: id,
        })
        .then((res) => history.push("/dashboard"));
    }
  };

  const handleBlur = () => {
    if (document.visibilityState === "hidden") {
      new Notification("Go back to the test screen or it'll be cancelled");
      setTimeout(() => {
        if (document.visibilityState === "hidden") {
          history.push("/dashboard");
        }
      }, 10000);
    }
  };
  const camTimeOut = () => {
    const img1 = handleCam();
    if (img1 !== null) {
      console.log(img1);
    } else {
      new Notification("Your camera not working properly");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleFullScreen);
    document.addEventListener("visibilitychange", handleBlur);

    return () => {
      window.removeEventListener("resize", handleFullScreen);
      document.removeEventListener("visibilitychange", handleBlur);
    };
  }, []);

  const handleCam = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (
      imageSrc === null ||
      imageSrc ===
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAGQAfQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k="
    ) {
      return null;
    } else {
      return imageSrc;
    }
  }, [webcamRef]);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <div style={{ backgroundColor: "red" }}>
        <span>
          Remaning time: {minutes}:{seconds}
        </span>
      </div>
    );
  };
  //

  const getLines = () => {
    let a = valueGetter.current();
    a = a.split(/\r\n|\r|\n/).length;
    return a;
  };

  const handleTest = () => {
    const img = handleCam();
    console.log(img);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/tests/test/${testid}`)
      .then((response) => {
        setQuestions(response.data.data.questions);
        setDeadline(response.data.data.submissionDeadline);
        setLoading(false);
        setCurrentStart(new Date(Date.now()));
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

  const setTime = () => {
    setCurrentEnd(new Date(Date.now()));
  };

  const getMarks = (t1out, t2out, t3out, loc, a) => {
    let locM = parseFloat(questions[0].locW) * parseInt(questions[0].marks);
    let socM = parseFloat(questions[0].socW) * parseInt(questions[0].marks);
    let total = 0;
    if (
      t1out === questions[0].testC1Out.toString() &&
      t2out === questions[0].testC2Out.toString() &&
      t3out === questions[0].testC3Out.toString()
    ) {
      total = parseFloat(questions[0].solW) * parseInt(questions[0].marks);
      let socMObt, locMObt;
      if (total !== 0) {
        let timeTaken = (a.getTime() - currentStart.getTime()) / 1000;
        if (parseInt(questions[0].locT) - loc >= 0) {
          locMObt =
            ((100 - (parseInt(loc) / parseInt(questions[0].locT)) * 100) /
              100) *
            locM;
        }
        locMObt = locMObt ? locMObt : 0;
        if (parseInt(questions[0].subT) - timeTaken >= 0) {
          socMObt =
            ((100 - (parseInt(timeTaken) / parseInt(questions[0].subT)) * 100) /
              100) *
            socM;
        }
        socMObt = socMObt ? socMObt : 0;
        total = total + locMObt + socMObt;
      }
    }
    return total;
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
    setTime();
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
    axios
      .patch(`http://localhost:4000/api/submission/addanswer`, {
        userId: id,
        testId: testid,
        questionId: questions[0].id,
        statement: questions[0].statement,
        startedAt: currentStart,
        submittedAt: new Date(Date.now()),
        lineOfCode: getLines(),
        code: valueGetter.current() ? valueGetter.current() : "",
        tcOneOut: t1,
        tcTwoOut: t2,
        tcThreeOut: t3,
        marksObtained: getMarks(t1, t2, t3, getLines(), new Date(Date.now())),
      })
      .then((response) => {
        setQuestions(questions.filter((d, i) => i !== 0));
        setCurrentStart(new Date(Date.now()));
        setObtainedScore(response.data.totalScore);
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
      <Countdown
        date={deadline}
        onComplete={() => history.push("/dashboard")}
        renderer={renderer}
      />
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
          <div className="row">
            <Webcam
              audio={false}
              height={400}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={500}
              videoConstraints={{
                width: 500,
                height: 400,
                facingMode: "user",
              }}
            />
          </div>
          <br />
          <br />
        </div>
      ) : (
        <div>
          <h2>Test Completed, you got {obtainedScore}</h2>
          <button onClick={() => history.push("/dashboard")}>
            Go back to dashboard
          </button>
        </div>
      )}
    </HomeLayout>
  );
}
