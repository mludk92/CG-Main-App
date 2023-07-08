import React, { useEffect, useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import Card from "@mui/material/Card";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {
  Modal,
  Typography,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import "./UserPage.css";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const badges = useSelector((store) => store.badges);
  const journalEntries = useSelector((store) => store.journal);
  const dispatch = useDispatch();
  const history = useHistory();

 

  // Filter the badges earned by the logged-in user --Mitch
  console.log(badges)
  const userBadges = badges.filter(
    (badge) => badge.user_id !== null && badge.user_id === user.id
  );
  console.log(userBadges, 'userBadges')
  useEffect(() => {
    dispatch({ type: "FETCH_BADGES" });
    dispatch({ type: "FETCH_JOURNAL" });
  }, [dispatch]);


  const latestBadge = userBadges[userBadges.length - 1];
  console.log(latestBadge)
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
        return "badges/MeditationScholar.png"
      default:
        return "";
    }
  };
  const latestBadgeImage = latestBadge ? getBadgeImage(latestBadge.badge_name) : "";
 //latestBadge.Id

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Get current date
  const currentDate = formatDate(new Date().toISOString());

    // State for the modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [editedEntry, setEditedEntry] = useState({ journal: '', mood: '', id: '' });
    // Storing new journal entry and mood in useState
    const [newEntry, setEntry] = useState({ journal: '', mood: 1, date: currentDate });
  
    // Function to open the modal and set the edited entry
    const handleOpenModal = (entry, mood, id) => {
      setEditedEntry({ journal: entry, mood: mood, id: id });
      setModalOpen(true);
    };
  
    // Function to close the modal
    const handleCloseModal = () => {
      setModalOpen(false);
    };
  
    // Function to handle the submit of the edited entry
    const handleEditSubmit = () => {
      dispatch({ type: 'EDIT_JOURNAL_ENTRY', payload: editedEntry });
  
      // Close the modal
      handleCloseModal();
    };
  
    // Handle change for journal entry
    const handleEntryChange = (event) => {
      setEntry({ ...newEntry, journal: event.target.value });
    }
  
    // Handle change for mood
    const handleMoodChange = (event) => {
      setEntry({ ...newEntry, mood: event.target.value });
    }

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
              <h2 style={{ color: "#3d71b8" }}>{userBadges.length}</h2> {/* Mitch Update*/}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h5>Latest Badge:</h5>
          {latestBadge ? <p>{latestBadge.summary}</p> : "Loading..."}
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
                style={{ width: "50px",
                height: "50px", }}
              />
              {/* <EmojiEventsTwoToneIcon
                style={{ boxShadow: "0px 0px 25px rgba(131, 197, 95, 0.5)" }}
                fontSize="small"
                className="event-icon"
              /> */}
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
          )}
        </div>
      </div>
      <center>
        <button
          style={{ marginTop: "10px", marginBottom: "5px", color: "#3d71b8" }}
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
            {journalEntries.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date)).slice(0, 7).map((entry, index) => (
              <TableRow  onClick={() => handleOpenModal(entry.journal, entry.mood, entry.id)} key={index}>
                <TableCell>{formatDate(entry.entry_date)}</TableCell>
                <TableCell>{entry.journal}</TableCell>
                <TableCell className={`mood-cell`}>
                  <span className={`mood-value mood-${parseInt(entry.mood)}`}>{entry.mood}</span>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <LogOutButton className="btn" />
      <p>Your ID is {user.id}</p>


      {/* Modal for editing journal entry */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-container">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" style={{ textAlign: 'center' }}>
                Edit Journal Entry
              </Typography>
              <TextField
                multiline
                rows={10}
                value={editedEntry.journal}
                onChange={(event) => setEditedEntry({ ...editedEntry, journal: event.target.value })}
                fullWidth
                variant="outlined"
              />
              <br /><br />
              <div className="mood-select-container">
                <div className="mood-select-wrapper">
                  <InputLabel className="mood-label">Mood:</InputLabel>
                  <Select
                    value={editedEntry.mood}
                    onChange={(event) => setEditedEntry({ ...editedEntry, mood: event.target.value })}
                    className="mood-select-input"
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                      }
                    }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </div>
                <button
                  className="submit-button"
                  type="submit"
                  onClick={handleEditSubmit}
                >
                  Submit
                </button>
              </div>




            </CardContent>
          </Card>
        </div>
      </Modal>

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
