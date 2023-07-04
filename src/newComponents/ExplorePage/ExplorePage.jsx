import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ExploreHeader from './ExploreHeader';
import ExploreFilter from './ExploreFilter';
import ExploreList from './ExploreList';

function Explore() {

    return (
        <Box>
            <ExploreHeader />
            <Divider variant='middle' sx={{ mt: 2 }} />
            <ExploreFilter />
            <ExploreList />
        </Box>
    )
}

export default Explore;