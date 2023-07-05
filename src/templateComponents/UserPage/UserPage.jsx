import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import Card from "@mui/material/Card";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const badges = useSelector((store) => store.badges);
  const journalEntries = useSelector((store) => store.journal);
  const dispatch = useDispatch();
  const history = useHistory();



  useEffect(() => {
    dispatch({ type: "FETCH_BADGES" });
    dispatch({ type: "FETCH_JOURNAL" });
  }, [dispatch]);

  const latestBadge = badges[badges.length - 1];
  console.log(latestBadge)


  const formatDate = (dateString) => {
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
      <div style={{ display: "flex", alignItems: "center", marginTop: 40 }}>
        <h2>{user.username}!</h2>
        <img
          src="Logo/cg-smile-icon.png"
          alt="ChangeGrower Logo"
          style={{ width: "100px", height: "50px", marginLeft: "200px" }}
        />
      </div>
      <Divider sx={{ marginTop: "10px", borderTopWidth: "4px" }} />
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <h5>Total Badges</h5>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div>
              <EmojiEventsTwoToneIcon
                style={{ boxShadow: "0px 0px 25px rgba(131, 197, 95, 0.5)" }}
                fontSize="large"
                className="event-icon"
              />
            </div>
            <div>
              <h2 style={{ color: "#3d71b8" }}>{badges.length}</h2>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h5>Latest Badge:</h5>
          {latestBadge.summary}
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
            }}
          >
            <EmojiEventsTwoToneIcon
              style={{ boxShadow: "0px 0px 25px rgba(131, 197, 95, 0.5)" }}
              fontSize="small"
              className="event-icon"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p>{latestBadge.badge_name}</p>
            </div>
          </Card>
        </div>
      </div>
      <center>
        <button
          style={{ marginTop: "10px", marginBottom:"5px", color: "#3d71b8" }}
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push("/badges");
          }}
        >
          View all badges
        </button>
      </center>
      <Divider
        sx={{ marginTop: "10px", marginBottom: "20px", borderTopWidth: "4px" }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => {
            history.push("/journal");
          }}
        >
          <PostAddIcon sx={{ marginBottom: "10px" }} />
        </Button>
      </div>
      <TableContainer
        component={Card}
        variant="outlined"
        style={{ marginBottom: "10px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Journal Entry</TableCell>
              <TableCell>Mood</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {journalEntries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{formatDate(entry.entry_date)}</TableCell>
                <TableCell>{entry.journal}</TableCell>
                <TableCell>{entry.mood}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <LogOutButton className="btn" />
      <p>Your ID is {user.id}</p>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
