import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import axios from "axios";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";

const Invigilation = () => {
  const [camStatus, setCamStatus] = useState("pending");
  const [fullScreen, setFullScreen] = useState("pending");
  const [not, setNot] = useState("pending");
  const [storage, setStorage] = useState("pending");
  const [timeMatch, setTimeMatch] = useState("pending");
  const [internetSpeed, setInternetSpeed] = useState("pending");

  const history = useHistory();
  const { testid } = useParams();

  const webcamRef = useRef(null);

  const makeDecision = () => {
    if (
      camStatus === "✔" &&
      fullScreen === "✔" &&
      not === "✔" &&
      storage === "✔" &&
      internetSpeed === "✔"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleStart = () => {
    const token = Cookie.get("token");

    const obj = jwt_decode(token);
    const userid = obj.id;
    const imgcam = handleCam();
    if (imgcam !== null) {
      if (makeDecision() === true) {
        axios
          .patch("http://localhost:4000/api/submission/testimg", {
            userID: userid,
            testID: testid,
            num: "1",
            img1: imgcam,
          })
          .then((res) => history.push(`/test/${testid}`))
          .catch((err) => setCamStatus("pending"));
      }
    } else {
      setCamStatus("pending");
    }
  };

  const handleCam = React.useCallback(() => {
    let imageSrc = webcamRef.current.getScreenshot();
    if (
      imageSrc === null ||
      imageSrc ===
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAGQAfQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k="
    ) {
      imageSrc = null;
    }
    return imageSrc;
  }, [webcamRef]);

  const handleTime = async () => {
    const res = await axios.get("http://localhost:4000/api/servertime");
    let serverTime = res.data.data;
    let clientTime = new Date(Date.now()).toUTCString();
    if (serverTime === clientTime) {
      setTimeMatch("✔");
    } else {
      setTimeMatch("pending");
    }
  };

  const handleSpeed = () => {
    axios
      .get("http://localhost:4000/api/test/netspeed")
      .then((res) => {
        if (res.data.data >= 1) {
          setInternetSpeed("✔");
        } else {
          setInternetSpeed(`Slow speed ${res.data.data}`);
        }
      })
      .catch((err) => alert("Check your connection"));
  };

  const handleCheck = async () => {
    var isFirefox = typeof InstallTrigger !== "undefined";
    if (!isFirefox) {
      if (
        window.innerHeight !== window.screen.height ||
        window.screen.height - window.innerHeight > 5
      ) {
        alert("Press F11 to enter full screen mode");
        setFullScreen("Pending");
      } else {
        setFullScreen("✔");
      }
    } else {
      if (!window.fullScreen) {
        alert("Press F11 to enter full screen mode");
        setFullScreen("Pending");
      } else {
        setFullScreen("✔");
      }
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(function (stream) {
        setCamStatus("✔");
      })
      .catch(function (err) {
        console.log(err);
        setCamStatus("Pending");
        alert("Permission for webcam required");
      });
    if (window.localStorage) {
      setStorage("✔");
    } else {
      setStorage("Pending");
    }
    handleTime();
    await handleSpeed();
    if (Notification.permission === "granted") {
      setNot("✔");
    } else {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        } else {
          alert("Permission not granted");
        }
      });
    }
  };

  return (
    <div className="contaienr">
      <div className="row">
        <div className="col-md-4">
          <ul>
            <li>Camera {camStatus}</li>
            <li>FullScreen {fullScreen}</li>
            <li>Notification {not}</li>
            <li>Storage {storage}</li>
            <li>Time Match {timeMatch}</li>
            <li>Internet Speed {internetSpeed} (should be above 1Mbps)</li>
          </ul>
          <button onClick={handleStart}>Start</button>
          <button onClick={handleCheck}>Check</button>
          <button onClick={handleCam}>Camera</button>
        </div>
        <div className="col-md-4">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              width: 500,
              height: 400,
              facingMode: "user",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Invigilation;
