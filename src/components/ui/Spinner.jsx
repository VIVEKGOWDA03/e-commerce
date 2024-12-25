// ui/spinner.js
import React from "react";

const Spinner = ({ size = "medium", color = "gray" }) => {
  const spinnerSize =
    size === "small" ? "w-6 h-6" : size === "large" ? "w-12 h-12" : "w-8 h-8";

  return (
    <div
      className={`animate-spin rounded-full border-t-4 border-b-4 border-${color}-500 ${spinnerSize}`}
    ></div>
  );
};

export default Spinner;
