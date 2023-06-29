import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import HomeHeader from './HomeHeader';
import NewSection from './NewSection';
import RecommendedSection from './RecommendedSection';
import './Home.css';

function HomePage() {

    return (
        <Box>
            <HomeHeader />
            <NewSection />
            <RecommendedSection />
        </Box>
    );
};

export default HomePage;