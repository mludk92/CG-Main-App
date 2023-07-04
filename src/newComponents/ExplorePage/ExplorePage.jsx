import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ExploreHeader from './ExploreHeader';
import ExploreFilter from './ExploreFilter';

function Explore() {

    return (
        <Box>
            <ExploreHeader />
            <Divider variant='middle' sx={{ mt: 2 }} />
            <ExploreFilter />
        </Box>
    )
}

export default Explore;