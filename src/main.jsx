import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { ReferenceContextProvider } from "./context/ReferenceContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <ReferenceContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ReferenceContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
