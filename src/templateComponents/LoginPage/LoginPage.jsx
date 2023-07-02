import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageFooter from "./LoginPageFooter";

function LoginPage() {
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <LoginPageHeader />
      <LoginForm />
      <LoginPageFooter />
    </div>
  );
}

export default LoginPage;
