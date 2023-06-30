import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import './Journals.css'

function Journals() {
  const dispatch = useDispatch();
  const journalEntries = useSelector((store) => store.journal);

  useEffect(() => {
    dispatch({ type: "FETCH_JOURNAL" });
  }, [dispatch]);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Storing new journal entry and mood in useState
  const [newEntry, setEntry] = useState({ journal: '', mood: 1 })

  // Handle change for journal entry
  const handleEntryChange = (event) => {
    setEntry({ ...newEntry, journal: event.target.value })
  }

  // Handle change for mood
  const handleMoodChange = (event) => {
    setEntry({ ...newEntry, mood: event.target.value })
  }

  // Handle change for insert journal entry
  const handleCreateEntry = () => {
    dispatch({ type: 'INSERT_JOURNAL_ENTRY', payload: newEntry })
  }

  // Handle change for delete journal entry
  const handleDeleteEntry = (entryId) => {
    dispatch({ type: 'DELETE_JOURNAL_ENTRY', payload: entryId });
  }

  return (
    <div className="container" style={{
      height: '100vh',
      overflowY: 'auto',
      textAlign: 'center'
    }}>
      <Typography variant="h5">Journal</Typography>
      <br />

      {/* Text area to type journal entry */}
      <TextField
        multiline
        rows={5}
        placeholder='Create a journal entry'
        onChange={handleEntryChange}
        style={{
          width: '100%',
        }}
      />

      <br /><br />

      {/* Mood select and submit button */}
      <div className="mood-select-container">
        <div className="mood-select-wrapper">
          <InputLabel className="mood-label">Mood:</InputLabel>
          <Select
            value={newEntry.mood}
            onChange={handleMoodChange}
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
        <button className="submit-button" onClick={handleCreateEntry}>Submit</button>
      </div>

      <br /><br />

      <div className="journal-cards" style={{ textAlign: 'left' }}>

        {/* Mapping journalEntries to be displayed on cards */}
        {journalEntries.map((entry, index) => (
          <Card key={index} variant="outlined" style={{ marginBottom: '10px' }}>
            <CardContent>

              <Box display="flex" justifyContent="space-between" alignItems="center">

                {/* Date and Mood from entry */}
                <Typography variant="subtitle2" style={{ marginTop: '-13px' }}>
                  <span>{formatDate(entry.entry_date)}</span> - <span>Mood: {entry.mood}</span>
                </Typography>

                <div>
                  {/* Edit journal entry icon */}
                  <IconButton aria-label="Edit" style={{
                    marginTop: '-15px',
                    marginRight: '-5px'
                  }}>
                    <EditIcon />
                  </IconButton>

                  {/* Delete journal entry icon */}
                  <IconButton aria-label="Delete" onClick={() => handleDeleteEntry(entry.id)}
                    style={{
                      marginTop: '-15px',
                      marginRight: '-15px'
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Box>

              {/* Journal entry text */}
              <Typography variant="body1">
                {entry.journal}
              </Typography>

            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  );
}

export default Journals;
