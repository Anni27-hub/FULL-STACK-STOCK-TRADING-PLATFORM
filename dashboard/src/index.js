import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

function AppWrapper() {

  useEffect(() => {
    // 🔥 STEP 1: Get token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // 🔥 STEP 2: Save token in localStorage
      localStorage.setItem("token", token);

      // 🔥 STEP 3: Clean URL (remove token)
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);