import React, { useState } from "react";
import AdminSidebar from "./Sidebar";
import Adminheader from "./header";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [openSidebar, setOpenSideBar] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-red-">
      {/* Admin Sidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSideBar} />
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <Adminheader setOpen={setOpenSideBar} />
        <main className="flex flex-1 flex-col bg-muted/40 p-4 md:p-6">
          {/* Main content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
