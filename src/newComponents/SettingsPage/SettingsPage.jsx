import Paper from "@mui/material/Paper";
import { Typography, Divider } from "@mui/material";

function SettingsPage () {

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
      <div style={{ display: "flex", alignItems: "center", marginTop: 40, position: "relative" }}>
  <Typography variant="h4">Settings</Typography>
  <img
    src="Logo/cg-smile-icon.png"
    alt="ChangeGrower Logo"
    style={{ width: "60px", height: "50px", position: "absolute", right: 0, top: 0 }}
  />
</div>
     
      <Divider sx={{ marginTop: "10px", borderTopWidth: "4px", marginBottom: "20px"}} />
        </div>
    );
};

export default SettingsPage;