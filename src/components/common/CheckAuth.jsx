import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation(); // Get the current location to check against paths
console.log(location.pathname,isAuthenticated);

  if (
    !isAuthenticated &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/register")
  ) {
    return <Navigate to="/auth/login" />;
  }

  // If the user is authenticated but is trying to access login or register pages, redirect based on role
  if (
    isAuthenticated &&
    (location.pathname.includes("/auth/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home-page" />;
    }
  }

  // If the user is authenticated and not an admin, and they try to access admin pages, redirect to an unauth page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // If the user is authenticated and not an admin, but trying to access shop pages, redirect to the admin dashboard
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // If none of the above conditions are met, render the children
  return <div>{children}</div>;
};

export default CheckAuth;
