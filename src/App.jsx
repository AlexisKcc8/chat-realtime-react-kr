import { auth } from "./firebase/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomeChat } from "./pages/HomeChat";
import { SingIn } from "./pages/SignIn";
import { Register } from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  // const [user] = useAuthState(auth);
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <HomeChat />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<SingIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <SingIn /> */}
      {/* <>{user ? <HomeChat /> : <SingIn />}</> */}
    </BrowserRouter>
  );
}

export default App;
