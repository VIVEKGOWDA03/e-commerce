import React from "react";
import { Outlet } from "react-router-dom";

const Authlayout = () => {
  return (
    <div className="w-full min-h-screen flex bg-white">
      <div className="bg-black hidden lg:flex items-center justify-center  w-1/2 px-12">
        <div className="max-w-md  space-y-6 text-center text-primary-foreground">
          <p className="text-4xl text-[red] font-extrabold tracking-tighter">
            welcome to shop
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Authlayout;
