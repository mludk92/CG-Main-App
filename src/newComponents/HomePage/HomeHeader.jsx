import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './Home.css';

function HomeHeader() {
    return(
        <Box>
            <Paper sx={{ minWidth: '100%', minHeight: '220px', borderBottomLeftRadius: '6%', borderBottomRightRadius: '6%', backgroundColor: '#3d71b8' }}>
                <Typography variant='h4' sx={{ pt: 5, ml: 3, maxWidth: '80%', color: 'white' }}>This space is reserved for a quote or something</Typography>
            </Paper>
        </Box>
    );
}

export default HomeHeader;