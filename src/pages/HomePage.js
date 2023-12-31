import React, { useState, useEffect } from "react";

import handleGetLocation from "../service/geoLocation";
import sendNotification, { showNotification } from "../service/notification";
import handleVibrate from "../service/vibrate";
import { useNavigate } from "react-router";

const HomePage = () => {
  const [isLoactionLoaded, setisLoactionLoaded] = useState();
  const [setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          setOTP(otp.code);
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  const handleNotification = () => {
    //from browser
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        sendNotification(
          "Did you make a $1,000,000 purchase at Dr. Evil..",
          "Test Notification"
        );
      }
    });
    // from PWA
    showNotification("Test Notification");
  };

 
  return (
    <div className="App">
      <h2>PI - PWA</h2>
      <button className="btn" onClick={handleNotification}>
        Send Custom notification (PWA)
      </button>
      <button
        className="btn"
        onClick={() => handleGetLocation(setisLoactionLoaded)}
      >
        Get Location
      </button>
      {isLoactionLoaded ? (
        <p>
          Your current location is (Latitude: {isLoactionLoaded.coords.latitude}{" "}
          , Longitude: {isLoactionLoaded.coords.longitude} )
        </p>
      ) : null}

      <button disabled className="btn" onClick={handleVibrate}>
        Reading Otp ( only in chrome android )
      </button>
      <button className="btn" onClick={handleVibrate}>
        Vibrate (only Mobile)
      </button>
      <button onClick={() => navigate("/stream")} className="btn">
        Stream (Record)
      </button>
      <label htmlFor="input-file">
        <button className="btn">Storage</button>
        <input id="input-file" type="file" />
      </label>
      <button className="btn" style={{ backgroundColor: "gray" }}>
        Plateform = {navigator.platform}{" "}
      </button>
      <button onClick={() => navigate("/scanner")} className="btn">
        Scan QR
      </button>
    </div>
  );
};

export default HomePage;
