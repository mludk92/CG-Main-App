import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
function UserPageHeader() {
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 40,
          position: "relative",
        }}
      >
        <Typography variant="h4">{user.username}</Typography>
        <img
          src="Logo/cg-smile-icon.png"
          alt="ChangeGrower Logo"
          style={{
            width: "50px",
            height: "50px",
            position: "absolute",
            right: 0,
            top: 0,
          }}
        />
      </div>
    </>
  );
}

export default UserPageHeader;
