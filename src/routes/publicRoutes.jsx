// 📁 src/routes/publicRoutes.js
import Authlayout from "../components/auth/Authlayout";
import Login from "../pages/auth-view/login";
import Register from "../pages/auth-view/register";
import App from "../App";
import CheckAuth from "../components/common/CheckAuth";
import UnauthPage from "../pages/unauth-page/UnauthPage";
import NotFoundPage from "../pages/Not-found";

const publicRoutes = [
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
      <CheckAuth>
        <Authlayout />
      </CheckAuth>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  { path: "/unauth-page", element: <UnauthPage /> },
  { path: "*", element: <NotFoundPage /> },
];

export default publicRoutes;


