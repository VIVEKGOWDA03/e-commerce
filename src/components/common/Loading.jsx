import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium w-full font-roboto h-[60px] text-white">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;
