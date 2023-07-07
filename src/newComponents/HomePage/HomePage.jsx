import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import HomeHeader from './HomeHeader';
import NewSection from './NewSection';
import RecommendedSection from './RecommendedSection';
import './Home.css';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "POST_BADGES_IN_BACKGROUND" });
  }, [dispatch]);

  return (
    <Box>
      <HomeHeader />
      <NewSection />
      <RecommendedSection />
    </Box>
  );
}

export default HomePage;
