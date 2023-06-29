import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './Home.css';

function HomeHeader() {
    return(
        <Box>
            <Paper sx={{ minWidth: '100%', minHeight: 300, borderRadius: 3, position: 'absolute', backgroundColor: '#3d71b8', top: -30 }}>
                <Typography variant='h4' sx={{ mt: 12, ml: 3, maxWidth: '80%', color: 'white' }}>This space is reserved for a quote or something</Typography>
            </Paper>
        </Box>
    );
}

export default HomeHeader;