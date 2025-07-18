
// 📁 src/routes/adminRoutes.js
import { lazy } from "react";
import CheckAuth from "../components/common/CheckAuth";

const AdminLayout = lazy(() => import("../components/admin-view/Layout"));
const AdminDashboard = lazy(() => import("../pages/admin-view/Dashboard"));
const AdminProducts = lazy(() => import("../pages/admin-view/Products"));
const AdminOrders = lazy(() => import("../pages/admin-view/Orders"));
const AdminFeatures = lazy(() => import("../pages/admin-view/Features"));

const adminRoutes = [
  {
    path: "admin",
    element: (
      <CheckAuth>
        <AdminLayout />
      </CheckAuth>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "features", element: <AdminFeatures /> },
      { path: "orders", element: <AdminOrders /> },
    ],
  },
];

export default adminRoutes;