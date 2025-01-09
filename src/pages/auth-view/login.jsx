import CommonForm from "@/components/common/Form";
import Loading from "@/components/common/Loading";
import CustomToast from "@/components/ui/CustomToast";
import RippleButton from "@/components/ui/ripple-button";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const { isLoading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        setToast({
          isVisible: true,
          message: data?.payload?.message,
          type: "success",
        });

        // Redirect based on user role
        const role = data.payload.user?.role;
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "user") {
          navigate("/shop/home");
        }
      } else {
        setToast({
          isVisible: true,
          message: data?.payload?.message || "Login failed",
          type: "error",
        });
      }
    });
  };

  return (
    <div className="relative">
      {isLoading && <Loading />}
      <div className="mx-auto p-[4%] bg-red-20 shadow-lg rounded-lg z-20 border border-white/20 backdrop-blur-md:  backdrop-blur-sm ">
        <div className="text-center">
          <h1 className="text-3xl font-cairoPlay font-bold tracking-tighter text-foreground">
            Log in to your account
          </h1>
          <p className="mt-2 font-cairoPlay ">
            Don't have an account
            <Link
              to="/auth/register"
              className="ml-2 font-medium font-cairoPlay text-primary hover:underline"
            >
              {" "}
              Sign Up
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"log in"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
      <CustomToast
        className="z-10"
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

export default Login;
