
// AdminLayout.jsx
import React, { useState } from "react";
import AdminSidebar from "./Sidebar"; // Assuming this component is functional
import Adminheader from "./header"; // Assuming this component is functional
import { Outlet } from "react-router-dom"; // Removed useNavigate as it's not used here

const AdminLayout = () => {
  const [openSidebar, setOpenSideBar] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-gray-100 font-roboto"> {/* Changed background to gray-100 */}
      {/* Admin Sidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSideBar} />
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <Adminheader setOpen={setOpenSideBar} />
        <main className="flex flex-1 flex-col bg-gray-50 p-4 md:p-6 lg:p-8"> {/* Adjusted padding and background */}
          {/* Main content */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;