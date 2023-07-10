import Paper from "@mui/material/Paper";
import { Typography, Divider, List, ListItem, ListItemText, ListItemIcon} from "@mui/material";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from "react-router-dom";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDispatch } from 'react-redux';
function SettingsPage() {
    const history = useHistory();
    const dispatch = useDispatch();

    

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
     <List>
     <ListItem button onClick={() => {
            history.push("/fileuploads");
          }} >
            <ListItemIcon>
            <UploadFileIcon />
            </ListItemIcon>
            <ListItemText primary="Upload Content" />
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText primary="Help and Support" />
        </ListItem>
        <Divider/>
        <ListItem button onClick={() => {
            history.push("/about");
          }} >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <Divider/>
        <ListItem button onClick={() => dispatch({ type: 'LOGOUT' })}>
            <ListItemIcon>
            <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem>
        <Divider/>
      </List>
      {/* <Button onClick={() => {
            history.push("/fileuploads");
          }} variant="contained" style={{ marginTop: "10px", marginBottom: "5px", color:  "#3d71b8", backgroundColor: "#83C55F" }}>Upload Content</Button> */}
    </div>
  );
}

export default SettingsPage;
