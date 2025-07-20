// import { createRoot } from "react-dom/client";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { Provider, useDispatch } from "react-redux";
// import store from "./store/store";
// import App from "./App";
// import Register from "./pages/auth-view/register";
// import AdminLayout from "./components/admin-view/Layout";
// import AdminDashboard from "./pages/admin-view/Dashboard";
// import AdminProducts from "./pages/admin-view/Products";
// import AdminOrders from "./pages/admin-view/Orders";
// import Shoppinglayout from "./components/shopping-view/layout";
// import NotFoundPage from "./pages/Not-found";
// import ShoppingHome from "./pages/shopping-view/Home";
// import ShoppingListingPage from "./pages/shopping-view/ListingPage";
// import ShoppingCheckoutPage from "./pages/shopping-view/CheckoutPage";
// import ShoppingAccountPage from "./pages/shopping-view/AccountPage";
// import "./tailwind.css";
// import Authlayout from "./components/auth/Authlayout";
// import CheckAuth from "./components/common/CheckAuth";
// import UnauthPage from "./pages/unauth-page/UnauthPage";
// import Login from "./pages/auth-view/login";
// import { Toaster } from "./components/ui/toaster";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import { checkAuth } from "./store/auth-slice";
// import { Skeleton } from "@/components/ui/skeleton";
// import PaypalReturnPage from "./components/shopping-view/paypal-return";
// import PaymentSuccess from "./components/shopping-view/payment-success";
// import SearchProducts from "./pages/shopping-view/SearchProducts";
// import AdminFeatures from "./pages/admin-view/Features";
// import { Loader } from "lucide-react";

// // This is a functional component that retrieves the authentication state from the store
// const RoutesWithAuth = () => {
//   const { isAuthenticated, user, isLoading } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // const token = JSON.parse(sessionStorage.getItem("token"));
//     const token = sessionStorage.getItem("token");

//     if (
//       token &&
//       location.pathname !== "auth/login" &&
//       location.pathname !== "auth/register"
//     ) {
//       console.log("heelo");

//       dispatch(checkAuth(token));
//     }
//   }, [dispatch, location]);
//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader className="size-10 animate-spin"></Loader>
//       </div>
//     );
//   // console.log("isAuthenticated:", isAuthenticated, "user:", user);

//   const routes = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <CheckAuth>
//           <App />
//         </CheckAuth>
//       ),
//     },
//     {
//       path: "auth",
//       element: (
//         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//           <Authlayout />
//         </CheckAuth>
//       ),
//       children: [
//         {
//           path: "login",
//           element: <Login />,
//         },
//         {
//           path: "register",
//           element: <Register />,
//         },
//       ],
//     },
//     {
//       path: "admin",
//       element: (
//         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//           <AdminLayout />
//         </CheckAuth>
//       ),
//       children: [
//         {
//           path: "dashboard",
//           element: <AdminDashboard />,
//         },
//         {
//           path: "products",
//           element: <AdminProducts />,
//         },
//         {
//           path: "features",
//           element: <AdminFeatures />,
//         },
//         {
//           path: "orders",
//           element: <AdminOrders />,
//         },
//       ],
//     },
//     {
//       path: "shop",
//       element: (
//         <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//           <Shoppinglayout />
//         </CheckAuth>
//       ),
//       children: [
//         {
//           path: "home",
//           element: <ShoppingHome />,
//         },
//         {
//           path: "listing",
//           element: <ShoppingListingPage />,
//         },
//         {
//           path: "checkout",
//           element: <ShoppingCheckoutPage />,
//         },
//         {
//           path: "account",
//           element: <ShoppingAccountPage />,
//         },
//         {
//           path: "search",
//           element: <SearchProducts />,
//         },
//         {
//           path: "paypal-return",
//           element: <PaypalReturnPage />,
//         },
//         {
//           path: "payment-success",
//           element: <PaymentSuccess />,
//         },
//       ],
//     },
//     // Not found page
//     { path: "/unauth-page", element: <UnauthPage /> },
//     { path: "*", element: <NotFoundPage /> },
//   ]);

//   return <RouterProvider router={routes} />;
// };

// // Render the app with RouterProvider
// createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <Toaster />
//     <RoutesWithAuth />
//   </Provider>
// );

import React, { Suspense, lazy, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useSelector, useDispatch } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Navigate,
} from "react-router-dom";
import store from "./store/store";
import "./tailwind.css";

import { Toaster } from "./components/ui/toaster";
import { Skeleton } from "@/components/ui/skeleton";
import { checkAuth } from "./store/auth-slice";
import { Loader } from "lucide-react";

// Lazy loaded components
const App = lazy(() => import("./App"));
const Login = lazy(() => import("./pages/auth-view/login"));
const Register = lazy(() => import("./pages/auth-view/register"));

const AdminLayout = lazy(() => import("./components/admin-view/Layout"));
const AdminDashboard = lazy(() => import("./pages/admin-view/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin-view/Products"));
const AdminOrders = lazy(() => import("./pages/admin-view/Orders"));
const AdminFeatures = lazy(() => import("./pages/admin-view/Features"));

const ShoppingLayout = lazy(() => import("./components/shopping-view/layout"));
const ShoppingHome = lazy(() => import("./pages/shopping-view/Home"));
const ShoppingListingPage = lazy(() =>
  import("./pages/shopping-view/ListingPage")
);
const ShoppingCheckoutPage = lazy(() =>
  import("./pages/shopping-view/CheckoutPage")
);
const ShoppingAccountPage = lazy(() =>
  import("./pages/shopping-view/AccountPage")
);
const SearchProducts = lazy(() =>
  import("./pages/shopping-view/SearchProducts")
);
const PaypalReturnPage = lazy(() =>
  import("./components/shopping-view/paypal-return")
);
const PaymentSuccess = lazy(() =>
  import("./components/shopping-view/payment-success")
);

const AuthLayout = lazy(() => import("./components/auth/Authlayout"));
const UnauthPage = lazy(() => import("./pages/unauth-page/UnauthPage"));
const NotFoundPage = lazy(() => import("./pages/Not-found"));

// --- New ProtectedRoute Component ---
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Optional: Role-based access control
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/unauth-page" replace />; // Redirect to unauthorized page
  }

  return children;
};

// --- Define Router outside of component ---
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute roles={["admin"]}>
        {" "}
        {/* Example: only admin can access */}
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "features", element: <AdminFeatures /> },
      { path: "orders", element: <AdminOrders /> },
    ],
  },
  {
    path: "shop",
    element: <ShoppingLayout />, // Shopping routes might not need authentication for all parts
    children: [
      { path: "home", element: <ShoppingHome /> },
      { path: "listing", element: <ShoppingListingPage /> },
      // Protect checkout and account pages
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <ShoppingCheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <ShoppingAccountPage />
          </ProtectedRoute>
        ),
      },
      { path: "search", element: <SearchProducts /> },
      { path: "paypal-return", element: <PaypalReturnPage /> },
      { path: "payment-success", element: <PaymentSuccess /> },
    ],
  },
  { path: "/unauth-page", element: <UnauthPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

// This component handles the initial auth check and renders the RouterProvider
const RootContainer = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(checkAuth(token));
    }
  }, [dispatch]);

  // We only show a global spinner for the *initial* auth loading.
  // Route-specific loading (like Suspense fallback) or protected route loading
  // is handled elsewhere.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

// Render the app with RouterProvider
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Skeleton className="w-full h-full" />
          </div>
        }
      >
        <RootContainer />
        <Toaster />
      </Suspense>
    </Provider>
  </React.StrictMode>
);
