import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Webcam from "react-webcam";
import Countdown from "react-countdown";

const InvigSystem = (props) => {
  const [camStatus, setCamStatus] = useState("pending");
  const [fullScreen, setFullScreen] = useState("pending");
  const [not, setNot] = useState("pending");
  const [storage, setStorage] = useState("pending");
  const picOne = Math.floor(Math.random() * 10000);
  const picTwo = Math.floor(Math.random() * 10000) + picOne;
  const picThree = Math.floor(Math.random() * 10000) + picTwo;

  const history = useHistory();

  const webcamRef = useRef(null);

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

  const handleChange = () => {
    if (
      window.innerHeight !== window.screen.height ||
      window.screen.height - window.innerHeight > 5
    ) {
      history.push("/dashboard");
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

  const makeDecision = () => {
    if (
      camStatus === "✔" &&
      fullScreen === "✔" &&
      not === "✔" &&
      storage === "✔"
    ) {
      return true;
    } else {
      return false;
    }
  };

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

  const handleCheck = () => {
    if (
      window.innerHeight !== window.screen.height ||
      window.screen.height - window.innerHeight > 5
    ) {
      setFullScreen("Pending");
    } else {
      setFullScreen("✔");
    }
    handleCam();
    if (window.localStorage) {
      setStorage("✔");
    } else {
      setStorage("Pending");
    }
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

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <div style={{ backgroundColor: "red" }}>
        <span>
          Remaning time: {minutes}:{seconds}
        </span>
      </div>
    );
  };

  return (
    <>
      <Countdown
        date={Date.now() + 15000}
        onComplete={() => history.push("/dashboard")}
        renderer={renderer}
      />
      <div className="row">{props.children}</div>

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
    </>
  );
};

export default InvigSystem;
