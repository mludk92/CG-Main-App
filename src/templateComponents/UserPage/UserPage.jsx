import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Divider, Typography } from "@mui/material";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';

import "./UserPage.css";
import UserPageJournal from "./UserPageJournal";
import UserPageHeader from "./UserPageHeader";
import LogOutButton from "../LogOutButton/LogOutButton";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const badges = useSelector((store) => store.badges);

  const dispatch = useDispatch();
  const history = useHistory();

  // Filter the badges earned by the logged-in user --Mitch
  console.log(badges);
  const userBadges = badges.filter(
    (badge) => badge.user_id !== null && badge.user_id === user.id
  );
  console.log(userBadges, "userBadges");
  useEffect(() => {
    dispatch({ type: "FETCH_BADGES" });
    dispatch({ type: "FETCH_JOURNAL" });
  }, [dispatch]);

  const latestBadge = userBadges[userBadges.length - 1];
  console.log(latestBadge);
  // console.log(latestBadge.badge_id)

  const getBadgeImage = (badgeName) => {
    switch (badgeName) {
      case "First Meditation":
        return "badges/FirstMeditation.png";
      case "On Fire":
        return "badges/OnFire.png";
      case "Reflection Time":
        return "badges/ReflectionTime.png";
      case "Meditation Scholar":
        return "badges/MeditationScholar.png";
      case "Namaste":
        return "badges/namaste.png"
      default:
        return "";
    }
  };
  const latestBadgeImage = latestBadge
    ? getBadgeImage(latestBadge.badge_name)
    : "";

  return (
    <div className="user-container">

      {/* Banner / Username / Logo */}
      <UserPageHeader />

      <Divider sx={{ marginTop: "10px", borderTopWidth: "4px", marginBottom: "20px"}} />

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <Typography variant="h5">Total Badges</Typography>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              <EmojiEventsTwoToneIcon
                style={{ boxShadow: "0px 0px 25px rgba(131, 197, 95, 0.5)" }}
                fontSize="large"
                className="event-icon"
              />
            </div>
            <div>
              <h2 style={{ color: "#3d71b8" }}>{userBadges.length}</h2>{" "}
              {/* Mitch Update*/}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Typography variant="h5">Latest Badge:</Typography>
          {latestBadge ? <Typography>{latestBadge.summary}</Typography> : "Loading..."}
          {latestBadge && (
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
              }}
            >
              <img
                src={latestBadgeImage}
                alt="Latest Badge"
                style={{ width: "50px", height: "50px" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography style={{textAlign: "center"}}>{latestBadge.badge_name}</Typography>
              </div>
            </Card>
          )}
        </div>
      </div>
      <center>
        <Button
          variant="text"
          style={{ marginTop: "10px", marginBottom: "5px", color: "#3d71b8" }}
          onClick={() => {
            history.push("/badges");
          }}
        >
          View all badges
        </Button>
      </center>
      <Divider sx={{ marginTop: "10px", marginBottom: "20px", borderTopWidth: "4px" }}/>
      {/* Journal Table */}
      <UserPageJournal />

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
