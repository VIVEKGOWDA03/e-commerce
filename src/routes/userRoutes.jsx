// 📁 src/routes/userRoutes.js
import { lazy } from "react";
import CheckAuth from "../components/common/CheckAuth";

const Shoppinglayout = lazy(() => import("../components/shopping-view/layout"));
const ShoppingHome = lazy(() => import("../pages/shopping-view/Home"));
const ShoppingListingPage = lazy(() =>
  import("../pages/shopping-view/ListingPage")
);
const ShoppingCheckoutPage = lazy(() =>
  import("../pages/shopping-view/CheckoutPage")
);
const ShoppingAccountPage = lazy(() =>
  import("../pages/shopping-view/AccountPage")
);
const PaypalReturnPage = lazy(() =>
  import("../components/shopping-view/paypal-return")
);
const PaymentSuccess = lazy(() =>
  import("../components/shopping-view/payment-success")
);
const SearchProducts = lazy(() =>
  import("../pages/shopping-view/SearchProducts")
);

const userRoutes = [
  {
    path: "shop",
    element: (
      <CheckAuth>
        <Shoppinglayout />
      </CheckAuth>
    ),
    children: [
      { path: "home", element: <ShoppingHome /> },
      { path: "listing", element: <ShoppingListingPage /> },
      { path: "checkout", element: <ShoppingCheckoutPage /> },
      { path: "account", element: <ShoppingAccountPage /> },
      { path: "search", element: <SearchProducts /> },
      { path: "paypal-return", element: <PaypalReturnPage /> },
      { path: "payment-success", element: <PaymentSuccess /> },
    ],
  },
];

export default userRoutes;
