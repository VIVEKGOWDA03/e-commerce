import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log(data, "formData");

      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        // navigate("/shop");
        console.log(data, "login done");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };
  return (
    <div className="mx-auto bg-red-20 w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-foreground">
          Log in to your account
        </h1>
        <p className="mt-2 ">
          Don't have an account
          <Link
            to="/auth/register"
            className="ml-2 font-medium text-primary hover:underline"
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
  );
};

export default Login;
