import React from "react";
import "./tailwind.css";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
const App = () => {
  return (
    <div
      className="flex flex-col overflow-hidden 
    " >
      <Toaster />
      <Outlet />

    </div>
  );
};

export default App;
