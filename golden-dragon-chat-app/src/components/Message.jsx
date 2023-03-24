// Component to hold a message
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, deleteDoc } from "firebase/firestore";

function toDateTime(seconds) {
  if (!seconds) return new Date();
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(seconds);
  return t;
}

const Message = ({ message }) => {
  const [showMenu, setShowMenu] = useState(false);
  const timestamp = toDateTime(message.createdAt?.seconds);
  const formatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  const formattedTimestamp = new Intl.DateTimeFormat(
    "en-US",
    formatOptions
  ).format(timestamp);

  const deleteMessage = async (id, uid) => {
    if (uid === user.uid) {
      try {
        const messageDeleted = await deleteDoc(doc(db, "messages", id));
        return messageDeleted;
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const handleClick = () => setShowMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const [user] = useAuthState(auth);

  return (
    <div
      id={message.id}
      className={`chat-bubble ${
        message.uid === user.uid ? "own-chat-bubble" : ""
      }`}
    >
      <img
        className={`chat-bubble__left ${
          message.uid === user.uid ? "own-chat-bubble__left" : ""
        }`}
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <div className="d-flex">
          <p
            className={`user-name pr-1  ${
              message.uid === user.uid ? "own-user-name" : ""
            }`}
          >
            {message.name}
          </p>
          <p
            className={`message-timestamp ${
              message.uid === user.uid ? "own-message-timestamp" : ""
            }`}
          >
            {formattedTimestamp}
          </p>
        </div>
        <p
          className={`user-message ${
            message.uid == user.uid ? "own-message" : ""
          }`}
          onContextMenu={(e) => {
            if (message.uid === user.uid) {
              setShowMenu(true);
            }

            e.preventDefault();
          }}
        >
          {message.text}
        </p>
        {showMenu && (
          <button
            className="delete-message-btn"
            onClick={() => deleteMessage(message.id, message.uid)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="delete-svg"
            >
              <path
                fill="currentColor"
                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;
