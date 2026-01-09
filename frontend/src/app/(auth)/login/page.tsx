import { ButtonForgotPassword } from "@/components/auth/ButtonForgotPassword";
import { LoginForm } from "@/components/auth/LoginForm";
import React from "react";

const Login = () => {
  return (
    <div className="bg-white   space-y-4 p-4">
      <h1 className="text-2xl font-semibold">Login</h1>

      <LoginForm />
      <ButtonForgotPassword />
    </div>
  );
};

export default Login;
