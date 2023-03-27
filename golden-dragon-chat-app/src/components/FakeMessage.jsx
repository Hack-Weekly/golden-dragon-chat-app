export default function FakeMessage(props) {
  const own = props.own;

  return (
    <div className={`chat-bubble ${own === true ? "own-chat-bubble" : ""}`}>
      <img
        className={`chat-bubble__left ${
          own === true ? "own-chat-bubble__left" : ""
        }`}
        src={props.img}
        alt="profile pic"
      />
      <div className="chat-bubble__right">
        <p
          className={`user-message ${
            own === true ? "own-message" : ""
          }`}
        >
          {props.message}
        </p>
        <p
          className={`message-timestamp ${
            own === true ? "own-message-timestamp" : ""
          }`}
        >
          {props.time}
        </p>
        <p className={`user-name pr-1  ${own === true ? "own-user-name" : ""}`}>
          {props.user}
        </p>
      </div>
    </div>
  );
}
