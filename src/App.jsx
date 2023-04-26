import { SingIn } from "./components/SignIn";
import { auth } from "./firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import { HomeChat } from "./components/HomeChat";

function App() {
  const [user] = useAuthState(auth);

  return (
    <main className="App">
      <>{user ? <HomeChat /> : <SingIn />}</>
    </main>
  );
}

export default App;
