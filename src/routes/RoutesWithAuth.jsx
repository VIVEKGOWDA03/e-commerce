import React, { Suspense, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { checkAuth } from "./store/auth-slice";
import { Loader } from "lucide-react";
import NotFoundPage from "./pages/Not-found";
import UnauthPage from "./pages/unauth-page/UnauthPage";

const AuthLayout = React.lazy(() => import("./components/auth/Authlayout"));
const Login = React.lazy(() => import("./pages/auth-view/login"));
const Register = React.lazy(() => import("./pages/auth-view/register"));

const AdminLayout = React.lazy(() => import("./components/admin-view/Layout"));
const AdminDashboard = React.lazy(() => import("./pages/admin-view/Dashboard"));
const AdminProducts = React.lazy(() => import("./pages/admin-view/Products"));
const AdminOrders = React.lazy(() => import("./pages/admin-view/Orders"));
const AdminFeatures = React.lazy(() => import("./pages/admin-view/Features"));

const ShoppingLayout = React.lazy(() =>
  import("./components/shopping-view/layout")
);
const ShoppingHome = React.lazy(() => import("./pages/shopping-view/Home"));
const ShoppingListingPage = React.lazy(() =>
  import("./pages/shopping-view/ListingPage")
);
const ShoppingCheckoutPage = React.lazy(() =>
  import("./pages/shopping-view/CheckoutPage")
);
const ShoppingAccountPage = React.lazy(() =>
  import("./pages/shopping-view/AccountPage")
);
const SearchProducts = React.lazy(() =>
  import("./pages/shopping-view/SearchProducts")
);
const PaypalReturnPage = React.lazy(() =>
  import("./components/shopping-view/paypal-return")
);
const PaymentSuccess = React.lazy(() =>
  import("./components/shopping-view/payment-success")
);

const RoutesWithAuth = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(checkAuth(token));
    }
  }, [dispatch]);

  const routes = useMemo(() => {
    if (!isAuthenticated) {
      return createBrowserRouter([
        {
          path: "auth",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AuthLayout />
            </Suspense>
          ),
          children: [
            {
              path: "login",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              ),
            },
            {
              path: "register",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Register />
                </Suspense>
              ),
            },
          ],
        },
        { path: "/unauth-page", element: <UnauthPage /> },
        { path: "*", element: <NotFoundPage /> },
      ]);
    } else if (user?.role === "admin") {
      return createBrowserRouter([
        {
          path: "/",
          element: <Navigate to="/admin/dashboard" replace />,
        },
        {
          path: "admin",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminLayout />
            </Suspense>
          ),
          children: [
            {
              path: "dashboard",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminDashboard />
                </Suspense>
              ),
            },
            // Other Admin Routes
          ],
        },
        { path: "*", element: <NotFoundPage /> },
      ]);
    } else if (user?.role === "user") {
      return createBrowserRouter([
        {
          path: "shop",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ShoppingLayout />
            </Suspense>
          ),
          children: [
            {
              path: "home",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <ShoppingHome />
                </Suspense>
              ),
            },
            {
              path: "listing",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <ShoppingListingPage />
                </Suspense>
              ),
            },
            {
              path: "checkout",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <ShoppingCheckoutPage />
                </Suspense>
              ),
            },
            {
              path: "account",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <ShoppingAccountPage />
                </Suspense>
              ),
            },
            {
              path: "search",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <SearchProducts />
                </Suspense>
              ),
            },
            {
              path: "paypal-return",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <PaypalReturnPage />
                </Suspense>
              ),
            },
            {
              path: "payment-success",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <PaymentSuccess />
                </Suspense>
              ),
            },
          ],
        },
        { path: "*", element: <NotFoundPage /> },
      ]);
    }
  }, [isAuthenticated, user?.role]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return <RouterProvider router={routes} />;
};

export default RoutesWithAuth;
