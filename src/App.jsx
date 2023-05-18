import { auth } from "./firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeChat } from "./pages/HomeChat";
import { SingIn } from "./pages/SignIn";
import { Register } from "./pages/Register";
function App() {
  // const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomeChat />} />
        <Route path="/login" element={<SingIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <SingIn /> */}
      {/* <>{user ? <HomeChat /> : <SingIn />}</> */}
    </BrowserRouter>
  );
}

export default App;
