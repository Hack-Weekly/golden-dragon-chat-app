import NavBar from "./components/NavBar";
import { auth } from "./firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import Welcome from "./components/Welcome"
import ChatBox from "./components/ChatBox"

export default function App() {
  const [user] = useAuthState(auth);
  return (
  <>
    <NavBar />
    {!user ? <Welcome /> : <ChatBox />}
  </>
  );
  }
