import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './Home.css';

function HomeHeader() {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        fetch('https://quote-garden.onrender.com/api/v3/quotes?genre=motivational')
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.data.length);
                setQuote(data.data[randomIndex].quoteText);
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
            });
    }, []);
    

    rreturn(
        <Box>
            <Paper sx={{ minWidth: '100%', minHeight: '220px', borderBottomLeftRadius: '6%', borderBottomRightRadius: '6%', backgroundColor: '#3d71b8' }}>
                <Typography variant='h4' sx={{ pt: 5, ml: 3, maxWidth: '80%', color: 'white' }}>{quote || 'Loading quote...'}</Typography>
            </Paper>
        </Box>
    );
}

export default HomeHeader;