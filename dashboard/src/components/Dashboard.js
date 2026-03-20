import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    // ⏳ small delay to allow token to be set from URL
    setTimeout(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        window.location.href = "http://localhost:3000"; // go back to login app
      } else {
        setCheckedAuth(true);
      }
    }, 100); // delay is key 🔥
  }, []);

  // ⛔ Don't render until auth is checked
  if (!checkedAuth) return null;

  return (
    <div className="dashboard-container">
      
      {/* Left Watchlist */}
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>

      {/* Right Content */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>

    </div>
  );
};

export default Dashboard;