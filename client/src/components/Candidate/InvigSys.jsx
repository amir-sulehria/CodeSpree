import React, { useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";

export default function InvigSys() {
  const [camera, setCamera] = useState(false);
  const [fscreen, setFScreen] = useState(false);
  const [dnoti, setDNoti] = useState(false);

  const handleSystemCheck = () => {
    // navigator.mediaDevices
    //   .getUserMedia({ audio: false, video: true })
    //   .then(function (stream) {
    //     alert("Access granted");
    //   })
    //   .catch(function (err) {
    //     alert("Access not granted");
    //   });
    if (window.innerHeight === window.screen.height) {
      alert("full screen");
    } else {
      alert("not full screen");
    }
    // document.addEventListener("visibilitychange", () => alert(document.hidden));
  };

  return (
    <HomeLayout>
      <div className="container">
        <div className="row">
          <h4>Make Sure to</h4>
          <br />
          <ul>
            <li>grant camera access</li>
            <li>set the screen to Full Screen Mode</li>
            <li>to allow desktop notifications</li>
          </ul>
        </div>
        <button className="btn btn-warning" onClick={handleSystemCheck}>
          Start Checking
        </button>
      </div>
    </HomeLayout>
  );
}
