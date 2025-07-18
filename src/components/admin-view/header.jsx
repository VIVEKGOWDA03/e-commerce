
// Adminheader.jsx
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import { Menu, LogOut } from "lucide-react"; // Changed AlignJustify to Menu for a more common icon
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Adminheader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    // dispatch(logoutUser()); // Keep this commented if resetTokenAndCredentials is preferred
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm font-roboto"> {/* Refined styling */}
      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        aria-label="Toggle Menu"
      >
        <Menu className="w-6 h-6 text-gray-700" /> {/* Icon for mobile menu */}
      </button>

      {/* Admin Title/Logo (Optional - can be added here) */}
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>

      {/* Logout Button */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Adminheader;
