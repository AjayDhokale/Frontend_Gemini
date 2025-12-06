import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";


const MainLayout = () => {
  return (
    <div className="h-screen flex bg-[#111111] text-white">
      {/* Sidebar (left) */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        {/* outlet area should fill remaining height */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout
