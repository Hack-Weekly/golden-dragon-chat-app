// The input component to send a message
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import autosize from 'autosize';

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    let el = document.getElementById("messageInput");
    autosize(el);
  })

  function setHeight() {
    let el = document.getElementById("messageInput");
    el.style.height = "20px";
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
    setHeight();
  };
  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <div>
        <textarea
          id="messageInput"
          name="messageInput"
          className="form-input__input"
          rows="2"
          placeholder="your message here..."
          value={message}
          maxLength="300"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          {/* <svg src="../img/send_message.svg"></svg> */}
          <svg
            width="25.773057"
            height="30"
            viewBox="0 0 11.112503 9.5467747"
            version="1.1"
            id="svg5"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="send-message-icon"
              d="m 5.0699417,4.7469107 c -0.38965,0.157972 -0.821184,0.230888 -1.228441,0.332703 l -2.135146,0.533786 c -0.330948,0.08274 -0.663732,0.157942 -0.99445201,0.241419 -0.216825,0.05472 -0.437126,0.113162 -0.577452,0.30199 -0.169352,0.227905 -0.124514,0.545808 -0.124514,0.812994 v 1.374682 c 0,0.235043 -0.03332,0.501204 0.02207,0.731157 0.05162,0.214304 0.237291,0.386666 0.445936,0.448117 0.271863,0.08005 0.54474901,-0.06637 0.78968501,-0.168969 0.507606,-0.212637 1.014692,-0.426619 1.520926,-0.642533 1.99528,-0.850987 3.994303,-1.695101 5.995959,-2.531025 0.546714,-0.228314 1.093049,-0.457974 1.6379193,-0.690676 0.268795,-0.114771 0.570173,-0.232175 0.663504,-0.539021 0.08114,-0.26666 -0.0289,-0.553238 -0.257504,-0.706851 -0.191987,-0.129045 -0.427936,-0.205646 -0.639987,-0.295586 -0.3895333,-0.165225 -0.7799433,-0.328579 -1.1699433,-0.492722 -2.184987,-0.919458 -4.368071,-1.843494 -6.551682,-2.76626298 -0.476927,-0.20154 -0.951313,-0.414181 -1.43318,-0.603465 -0.29811701,-0.117105 -0.61961401,-0.14622 -0.85864201,0.110284 -0.164406,0.176428 -0.164582,0.404117 -0.165009,0.63067 l -5e-5,0.90670598 2.1e-5,1.023701 c 2.1e-4,0.218661 -0.009,0.449667 0.129483,0.633669 0.132137,0.175609 0.340439,0.231942 0.543214,0.28377 0.262889,0.06724 0.52646801,0.131852 0.78971101,0.197663 0.759937,0.189968 1.521102,0.374791 2.281389,0.563122 0.434722,0.107693 0.872397,0.247764 1.316187,0.310678 z"
              id="path965"
              />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
