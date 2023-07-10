import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Typography, Divider, List, ListItem, ListItemText, ListItemIcon} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from "react-router-dom";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import LogOutButton from "../../templateComponents/LogOutButton/LogOutButton";
function SettingsPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const [accountOpen, setAccountOpen] = useState(false);
   
    const handleAccountClick = () => {
      setAccountOpen(!accountOpen);
    };
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
      <div  style={{
          display: "flex",
          alignItems: "center",
          marginTop: 10,
          position: "relative",
        }}>
      <Avatar  sx={{ marginRight:"20px", width: 56, height: 56 }}></Avatar> <Typography  variant="h5">{user.first_name} {user.last_name}</Typography>
      </div>
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
        <ListItem button onClick={handleAccountClick}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
          {accountOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {accountOpen && (
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItem button>
              <ListItemIcon>
                <MonetizationOnIcon/>
              </ListItemIcon>
              <ListItemText primary="Subscription" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LockIcon/>
              </ListItemIcon>
              <ListItemText primary="Security" />
            </ListItem>
          </List>
        )}
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
        {/* <ListItem button onClick={() => dispatch({ type: 'LOGOUT' })}>
            <ListItemIcon>
            <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem> */}
        {/* <Divider/> */}
      </List>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "auto", marginBottom: "20px" }}>
      <Typography variant="h8">Logged in as</Typography>
      <Typography variant="h8">{user.email}</Typography>
    </div>
     
      <div style={{ display: "flex", justifyContent: "center", marginTop: "auto", marginBottom: "20px" }}>
       
      <Button
        variant="contained"
        sx={{ marginTop:"20px", width: "100%", borderRadius: "20px", background:"#83C55F" }}
        startIcon={<LogoutIcon />}
        onClick={() => dispatch({ type: 'LOGOUT' })}
      >
        Log Out
      </Button>
    </div>
    </div>
  );
}

export default SettingsPage;
