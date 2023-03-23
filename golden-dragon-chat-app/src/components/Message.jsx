// Component to hold a message
import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function toDateTime(seconds) {
  if (!seconds) return new Date().toISOString();
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(seconds);
  return t.toISOString();
}

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  return (
    <div
      id={message.id}
      className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <div className="d-flex">
          <p className="user-name pr-1">{message.name}</p>
          <p className="message-timestamp">{toDateTime(message.createdAt?.seconds)}</p>
        </div>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
