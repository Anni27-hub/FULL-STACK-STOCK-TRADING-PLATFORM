import React, { createContext, useContext, useState } from "react";
import { ClipLoader } from "react-spinners";

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}

      {/* Global Overlay Loader */}
      {loading && (
        <div style={overlayStyle}>
          <ClipLoader color="#ffffff" size={60} />
        </div>
      )}
    </LoaderContext.Provider>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.4)",
  zIndex: 9999,
};
