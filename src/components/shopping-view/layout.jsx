import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

const Shoppinglayout = () => {
  return (
    <div className="flex flex-col bg-red overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Shoppinglayout;
