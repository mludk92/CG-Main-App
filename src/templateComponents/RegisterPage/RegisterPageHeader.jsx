import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

import { useHistory } from "react-router-dom";

function RegisterPageHeader() {
  const history = useHistory();
  return (
    <>
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
      <Typography textAlign="center" variant="h3" style={{marginTop: 80, color: "#3d71b8" }}>
        Sign Up!
      </Typography>
      <br />
      <center>
        <img
          src="Logo/changegrowerlogo.png"
          alt="ChangeGrower Logo"
          style={{ width: "200px", height: "150px" }}
        />
      </center>
      <center>
        <h5>
          Already have an account?{" "}
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push("/login");
            }}
            color="#83C55F"
          >
            Login
          </button>
        </h5>
      </center>
    </>
  );
}

export default RegisterPageHeader;
