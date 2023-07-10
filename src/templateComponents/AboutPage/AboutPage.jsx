import React from "react";
import { Typography, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="user-container">
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
    <Grid container justifyContent="center" alignItems="center" spacing={4}>
      <Grid style={{marginTop: "60px"}}item xs={12} md={6} lg={4}>
        <center>
          <img
            src="Logo/changegrowerlogo.png"
            alt="ChangeGrower Logo"
            style={{ width: "200px", height: "150px" }}
          />
        </center>
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to ChangeGrower!
        </Typography>
        <Typography variant="body1" align="justify">
          ChangeGrower is a meditation app focused on money and mental health,
          designed to help people navigate challenging situations. It addresses
          topics such as relationships, addictions, financial anxiety, and
          various human experiences. The app promotes self-awareness and
          mindfulness around financial habits, thinking patterns, and overall
          health behaviors. It aims to foster a healthy relationship with
          ourselves, others, and technology. What sets this app apart is its
          unique approach of teaching financial literacy through meditation. Our
          ambitious vision is to integrate banking products and services within
          the meditation app, offering a distinctive fintech experience.
        </Typography>
      </Grid>
    </Grid>
  </div>
);

}

export default AboutPage;
