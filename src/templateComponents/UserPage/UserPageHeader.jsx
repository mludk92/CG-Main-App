
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
function UserPageHeader () {
    const user = useSelector((store) => store.user);
    return (
        <>
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
      <div style={{ display: "flex", alignItems: "center", marginTop: 40 }}>
        <Typography variant="h4">{user.username}</Typography>
        <img
          src="Logo/cg-smile-icon.png"
          alt="ChangeGrower Logo"
          style={{ width: "100px", height: "50px", marginLeft: "200px" }}
        />
      </div>
        </>
    );
};

export default UserPageHeader;