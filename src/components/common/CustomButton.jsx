import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // Example end icon, you can replace it with any other icon.

const CustomButton = ({ text, icon, endIcon, onClick, navigateTo }) => {
  const navigate = useNavigate();

  // Handle navigation if `navigateTo` is provided
  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
    if (onClick) {
      onClick(); // Call the custom onClick function if provided
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex w-full justify-between items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out"
    >
      <span className="flex items-center gap-0.5">
      
        {icon}
        {text}
      </span>
      <span>{endIcon}</span>
    </button>
  );
};

export default CustomButton;
