import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Modal, Typography, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, } from "@mui/material";
import "./UserPage.css";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function UserPageJournal () {
  const journalEntries = useSelector((store) => store.journal);
  const dispatch = useDispatch();
  const history = useHistory();
    // Function to format the date
  const formatDate = (dateString) => {
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // State for the modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedEntry, setEditedEntry] = useState({
    journal: "",
    mood: "",
    id: "",
  });

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
    dispatch({ type: "EDIT_JOURNAL_ENTRY", payload: editedEntry });

    // Close the modal
    handleCloseModal();
  };

    return (
        <>
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
            {journalEntries
              .sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date))
              .slice(0, 7)
              .map((entry, index) => (
                <TableRow
                  onClick={() =>
                    handleOpenModal(entry.journal, entry.mood, entry.id)
                  }
                  key={index}
                >
                  <TableCell>{formatDate(entry.entry_date)}</TableCell>
                  <TableCell>{entry.journal}</TableCell>
                  <TableCell className={`mood-cell`}>
                    <span className={`mood-value mood-${parseInt(entry.mood)}`}>
                      {entry.mood}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        
      </TableContainer>

     
      {/* Modal for editing journal entry */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="modal-container">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                Edit Journal Entry
              </Typography>
              <TextField
                multiline
                rows={10}
                value={editedEntry.journal}
                onChange={(event) =>
                  setEditedEntry({
                    ...editedEntry,
                    journal: event.target.value,
                  })
                }
                fullWidth
                variant="outlined"
              />
              <br />
              <br />
              <div className="mood-select-container">
                <div className="mood-select-wrapper">
                  <InputLabel className="mood-label">Mood:</InputLabel>
                  <Select
                    value={editedEntry.mood}
                    onChange={(event) =>
                      setEditedEntry({
                        ...editedEntry,
                        mood: event.target.value,
                      })
                    }
                    className="mood-select-input"
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
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
        </>
    )
};

export default UserPageJournal;