import { Chat } from "./components/Chat";
import { SingIn } from "./components/SignIn";
import { auth } from "./firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";

function App() {
  const [user] = useAuthState(auth);

  return (
    <main className="App">
      <>{user ? <Chat /> : <SingIn />}</>
    </main>
  );
}

export default App;
