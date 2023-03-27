// Shows all current messages
import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  getCountFromServer
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";

const ChatBox = () => {
  const [messages, setMessages] = useState();
  const [showNoMoreMessages, setshowNoMoreMessages] = useState(false);
  const [messageLimit, setMessageLimit] = useState(15);
  const messagesCount = useRef(messages);
  const chatBoxElement = useRef();
  const firstMessage = useRef(messages);
  // Set dataFetched to true after initial connection to firestore db so it doesn't connect twice.
  const dataFetched = useRef(false);
  const initialScroll = useRef(false);
  const isThrottled = useRef(false);
  const maxMessageLimit = useRef(1000);
  const totalMessageCount = useRef(1000);

  function scrollToBottom() {
    chatBoxElement.current.scrollTop = chatBoxElement.current.scrollHeight;
  };

  // Throttles the increase of the message limit by 3 seconds to avoid spamming this method.
  function increaseLimit() {
    if (messageLimit >= maxMessageLimit || messageLimit >= totalMessageCount.current) {
      setshowNoMoreMessages(true);
      return;
    };
    dataFetched.current = false;
    const newLimit = messageLimit + 15;
    setMessageLimit(newLimit);
    setTimeout(() => isThrottled.current = false, 750);
  };

  async function getTotalMessageCount() {
    const coll = collection(db, "messages");
    const snapshot = await getCountFromServer(coll);
    totalMessageCount.current = snapshot.data().count;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isThrottled.current && firstMessage.current?.id == entries[0].target.id) {
      observer.unobserve(entries[0].target)
      isThrottled.current = true;
      increaseLimit();
    }
  })

  useEffect(() => {
    if (dataFetched.current) return;
    dataFetched.current = true;
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(messageLimit)
    );
    getTotalMessageCount();
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages.reverse());
      messagesCount.current = messages.length;
    });
    return () => unsubscribe;
  }, [messageLimit]);

  useEffect(() => {
    // Scroll to bottom the first time messages loads
    if (messagesCount.current) {
      if (firstMessage.current) {
        observer.unobserve(firstMessage.current);
        try {
          if (firstMessage.current.id !== messages[0].id) {
            firstMessage.current.scrollIntoView();
          }
        } catch {}
      }
      firstMessage.current = document.getElementById(messages[0].id);
      observer.observe(firstMessage.current);
    }
    if (initialScroll.current || !messagesCount.current) return;
    initialScroll.current = true;
    scrollToBottom();
  }, [messages]);

  return (
    <main ref={chatBoxElement} className="chat-box custom-scroll">
      <div className="messages-wrapper">
        {showNoMoreMessages ? <div className="no-more-messages">
          You've reached the end of the messages, go send some more!</div> : null}
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </main>
  );
};

export default ChatBox;
