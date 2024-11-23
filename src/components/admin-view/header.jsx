import { AlignJustify, LogOut } from "lucide-react";
import React from "react";

const Adminheader = ({ setOpen }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <button onClick={() => setOpen(true)}>
        <AlignJustify className="lg:hidden sm:block" />
        <span className="sr-only ">Toggle Menu</span>
      </button>
      <div className="flex flex-1  justify-end">
        <button className="inline-flex  gap-2 items-center rounded-md px-4 text-sm font-medium shadow">
          <LogOut absoluteStrokeWidth />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Adminheader;
