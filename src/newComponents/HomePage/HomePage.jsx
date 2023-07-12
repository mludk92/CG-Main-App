import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import HomeHeader from './HomeHeader';
import NewSection from './NewSection';
import RecommendedSection from './RecommendedSection';
import axios from 'axios';
import './Home.css';

function HomePage() {
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState();

  useEffect(() => {
    axios.get('/api/audio/new')
        .then(response => {
            setNewContent(response.data);
        })
        .catch(error => {
            console.log('Error retrieving audio files:', error);
        });
  }, []);

  useEffect(() => {
    dispatch({ type: "POST_BADGES_IN_BACKGROUND" });
  }, [dispatch]);

  return (
    <Box sx={{ mb: 10 }}>
      <HomeHeader />
      <NewSection 
        newContent = {newContent}
      />
      <RecommendedSection />
    </Box>
  );
}

export default HomePage;
