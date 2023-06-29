import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

  return (
    <div className="container">
      <center>
        <Typography variant="h5">Journal</Typography>
        <br />
        <textarea
          placeholder='Create a journal entry'
          style={{ 
            width: '90%', 
            height: '100px', 
            resize: 'none', 
          }}
        />
        <br />
        <button>Submit</button>
      </center>

      <br /><br />

      <div className="journal-cards">

        {/* Mapping journalEntries to be displayed on cards */}
        {journalEntries.map((entry, index) => (
          <Card key={index} variant="outlined" style={{ 
            marginBottom: '10px',

          }}>
            <CardContent>

              <Box display="flex" justifyContent="space-between" alignItems="center">
                
                {/* Date and Mood from entry */}
                <Typography variant="subtitle2" style={{ marginTop: '-13px'}}>
                  <span>{formatDate(entry.entry_date)}</span> - <span>Mood: {entry.mood}</span>
                </Typography>

                <div>
                  {/* Edit journal entry icon */}
                  <IconButton aria-label="Edit" style={{ marginTop: '-15px'}}>
                    <EditIcon />
                  </IconButton>

                  {/* Delete journal entry icon */}
                  <IconButton aria-label="Delete" style={{ marginTop: '-15px'}}>
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
