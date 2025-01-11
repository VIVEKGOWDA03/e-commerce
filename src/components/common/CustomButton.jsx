import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // Example end icon, you can replace it with any other icon.
import { resetTokenAndCredentials } from "@/store/auth-slice";
import { useDispatch } from "react-redux";

const CustomButton = ({ text, icon, endIcon, onClick, navigateTo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Handle navigation if `navigateTo` is provided
  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
    if (text === "logout") {
      dispatch(resetTokenAndCredentials());
      sessionStorage.clear();
      navigate("/auth/login");
      return;
    }
    if (onClick) {
      onClick(); // Call the custom onClick function if provided
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex w-full justify-between items-center font-roboto gap-2 px-2 py-2 rounded-md  text-black hover:bg-blue-600 transition duration-300 ease-in-out"
    >
      <span className="flex items-center justify-center gap-1">
        {icon}
        {text}
      </span>
      <span>{endIcon}</span>
    </button>
  );
};

export default CustomButton;
