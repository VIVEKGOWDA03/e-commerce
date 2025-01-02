import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import App from "./App";
import Register from "./pages/auth-view/register";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminProducts from "./pages/admin-view/Products";
import AdminOrders from "./pages/admin-view/Orders";
import Shoppinglayout from "./components/shopping-view/layout";
import NotFoundPage from "./pages/Not-found";
import ShoppingHome from "./pages/shopping-view/Home";
import ShoppingListingPage from "./pages/shopping-view/ListingPage";
import ShoppingCheckoutPage from "./pages/shopping-view/CheckoutPage";
import ShoppingAccountPage from "./pages/shopping-view/AccountPage";
import "./tailwind.css";
import Authlayout from "./components/auth/Authlayout";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./pages/unauth-page/UnauthPage";
import Login from "./pages/auth-view/login";
import { Toaster } from "./components/ui/toaster";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./components/shopping-view/paypal-return";
import PaymentSuccess from "./components/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/SearchProducts";
import AdminFeatures from "./pages/admin-view/Features";

// This is a functional component that retrieves the authentication state from the store
const RoutesWithAuth = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      try {
        const token = JSON.parse(storedToken);
        dispatch(checkAuth(token));
      } catch (err) {
        console.error("Invalid token in sessionStorage:", err);
      }
    } else {
      console.warn("No token found in sessionStorage.");
    }
  }, [dispatch]);

  if (isLoading)
    return (
      <div>
        <Skeleton className="w-full  h-full " />
      </div>
    );
  // console.log("isAuthenticated:", isAuthenticated, "user:", user);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <CheckAuth>
          <App />
        </CheckAuth>
      ),
    },
    {
      path: "auth",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <Authlayout />
        </CheckAuth>
      ),
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "admin",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>
      ),
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },
        {
          path: "products",
          element: <AdminProducts />,
        },
        {
          path: "features",
          element: <AdminFeatures />,
        },
        {
          path: "orders",
          element: <AdminOrders />,
        },
      ],
    },
    {
      path: "shop",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <Shoppinglayout />
        </CheckAuth>
      ),
      children: [
        {
          path: "home",
          element: <ShoppingHome />,
        },
        {
          path: "listing",
          element: <ShoppingListingPage />,
        },
        {
          path: "checkout",
          element: <ShoppingCheckoutPage />,
        },
        {
          path: "account",
          element: <ShoppingAccountPage />,
        },
        {
          path: "search",
          element: <SearchProducts />,
        },
        {
          path: "paypal-return",
          element: <PaypalReturnPage />,
        },
        {
          path: "payment-success",
          element: <PaymentSuccess />,
        },
      ],
    },
    // Not found page
    { path: "/unauth-page", element: <UnauthPage /> },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return <RouterProvider router={routes} />;
};

// Render the app with RouterProvider
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster />
    <RoutesWithAuth />
  </Provider>
);
