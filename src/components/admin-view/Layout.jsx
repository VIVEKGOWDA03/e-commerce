import React from 'react';
import AdminSidebar from './Sidebar';
import Adminheader from './header';
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    // Navigating to the login page
    navigate('/auth/login');
  };

  return (
    <div className='flex min-h-screen w-full'>
      {/* Admin Sidebar */}
      <AdminSidebar />
      <div className='flex flex-1 flex-col bg-red-500'>
        {/* Admin Header */}
        <Adminheader />
        <main className='flex flex-1 bg-muted/40 p-4 md:p-6'>
          {/* Main content */}
        </main>
      </div>

      <div>
        {/* Button to go to Login page */}
        <button onClick={goToLogin}>Go to Login</button>
      </div>
    </div>
  );
};

export default AdminLayout;
