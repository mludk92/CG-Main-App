import Paper from "@mui/material/Paper";
import { Typography, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
function SettingsPage() {
    const history = useHistory();

  return (
    <div className="container">
      <Paper
        sx={{
          minWidth: "100%",
          minHeight: 85,
          position: "absolute",
          backgroundColor: "#3d71b8",
          top: -30,
          right: 0,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 40,
          position: "relative",
        }}
      >
        <Typography variant="h4">Settings</Typography>
        <img
          src="Logo/cg-smile-icon.png"
          alt="ChangeGrower Logo"
          style={{
            width: "60px",
            height: "50px",
            position: "absolute",
            right: 0,
            top: 0,
          }}
        />
      </div>

      <Divider
        sx={{ marginTop: "10px", borderTopWidth: "4px", marginBottom: "20px" }}
      />
      <Button onClick={() => {
            history.push("/fileuploads");
          }} variant="contained" style={{ marginTop: "10px", marginBottom: "5px", color: "#ffffff", backgroundColor: "#3d71b8" }}>Upload Content</Button>
    </div>
  );
}

export default SettingsPage;
