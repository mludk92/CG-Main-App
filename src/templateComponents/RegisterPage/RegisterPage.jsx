import React from "react";
import RegisterPageHeader from "./RegisterPageHeader";

import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <RegisterPageHeader />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
