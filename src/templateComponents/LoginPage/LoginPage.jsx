import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
function LoginPage() {
  const history = useHistory();

  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <Paper
        sx={{
          borderRadius: "0 0 0 2rem",
          minWidth: "100%",
          minHeight: 85,
          position: "absolute",
          backgroundColor: "#3d71b8",
          top: -30,
        }}
      />

      <Typography
        textAlign="center"
        variant="h3"
        style={{ color: "#3d71b8"}}
      >
        Welcome!
      </Typography>
      <br />
      <center>
        <img
          src="Logo/changegrowerlogo.png"
          alt="ChangeGrower Logo"
          style={{ width: "200px", height: "150px" }}
        />
      </center>
      <LoginForm />

      <center>
        <h5>
          Don't have an account?{" "}
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push("/registration");
            }}
          >
            Signup
          </button>
        </h5>
      </center>
    </div>
  );
}

export default LoginPage;
