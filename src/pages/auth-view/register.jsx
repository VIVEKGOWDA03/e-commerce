import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const initialState = {
    userName: "",
    email: "",
    password: "",
  };

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
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          // title:"registeration done",
        });
        navigate("/auth/login");
        console.log(data, "registerantion done");
      } else {
        setToast({
          isVisible: true,
          message: data?.payload?.message,
          type: "success",
        });
      }
    });
    console.log(formData, "formData");
  };

  return (
    <div className="mx-auto p-[4%] bg-red-20 shadow-lg rounded-lg z-20 border border-white/20 backdrop-blur-md:  backdrop-blur-sm w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            to="/auth/login"
            className="ml-2 font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Register;
