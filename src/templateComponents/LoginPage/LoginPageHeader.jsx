import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

function LoginPageHeader () {

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
        </>
    );
};

export default LoginPageHeader;