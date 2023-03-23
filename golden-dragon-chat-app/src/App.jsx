import NavBar from "./components/NavBar";
import { auth } from "./firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import Welcome from "./components/Welcome"
import ChatBox from "./components/ChatBox"
import SendMessage from "./components/SendMessage"

export default function App() {
  const [user] = useAuthState(auth);
  return (
  <div className="main-wrapper">
    <NavBar />
    {!user ? <Welcome /> : <ChatBox />}
    {!user ? <Welcome /> : <SendMessage />}
  </div>
  );
  }
