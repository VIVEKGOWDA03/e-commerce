import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation(); // Get the current location to check against paths
  console.log("Current Path:", location.pathname);
  console.log("Is Authenticated:", isAuthenticated);
  console.log("User Role:", user?.role);

  // If the user is not authenticated and trying to access pages other than login/register, redirect to login
  if (
    !isAuthenticated &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/register")
  ) {
    return <Navigate to="/auth/login" />;
  }

  // If the user is authenticated but trying to access login or register pages, redirect based on role
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    if (user?.role === "user") {
      return <Navigate to="/shop/listing" />;
    }
  }

  // If the user is authenticated but is not an admin and tries to access an admin page, redirect to unauth page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // If the user is authenticated but is not an admin, trying to access shop pages, redirect to admin dashboard
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // If none of the above conditions are met, render the children
  return <>{children}</>;
};

export default CheckAuth;
