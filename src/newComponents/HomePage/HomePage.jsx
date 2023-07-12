import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import HomeHeader from './HomeHeader';
import NewSection from './NewSection';
import RecommendedSection from './RecommendedSection';
import axios from 'axios';
import './Home.css';

function HomePage() {
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState();
  const [recommendedContent, setRecommendedContent] = useState();
  const userId = useSelector(state => state.user.userId); 
  useEffect(() => {
    axios.get('/api/audio/new')
      .then(response => {
        setNewContent(response.data);
      })
      .catch(error => {
        console.log('Error retrieving audio files:', error);
    });
    axios.get('/api/audio/recommended')
        .then(response => {
            setRecommendedContent(response.data);
        })
        .catch(error => {
            console.log('Error retrieving audio files:', error);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch({ type: "FETCH_USER", payload: userId });
    }
  }, [dispatch, userId]);

  return (
    <Box sx={{ mb: 10 }}>
      <HomeHeader />
      <NewSection 
        newContent={newContent}
      />
      <RecommendedSection
        recommendedContent={recommendedContent}
      />
    </Box>
  );
}

export default HomePage;
