import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Adminheader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <button onClick={() => setOpen(true)}>
        <AlignJustify className="lg:hidden sm:block" />
        <span className="sr-only ">Toggle Menu</span>
      </button>
      <div className="flex flex-1  justify-end">
        <button
          onClick={handleLogout}
          className="inline-flex  gap-2 items-center rounded-md px-4 text-sm font-medium shadow"
        >
          <LogOut absoluteStrokeWidth />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Adminheader;
