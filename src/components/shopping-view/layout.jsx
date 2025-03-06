import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

const Shoppinglayout = () => {
  return (
    <div className="flex flex-col bg-red relative overflow-hidden">
      {/* common header */}
      <div className="fixed z-40 flex justify-center w-full items-center top-6 ">
        <ShoppingHeader />
      </div>
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Shoppinglayout;
