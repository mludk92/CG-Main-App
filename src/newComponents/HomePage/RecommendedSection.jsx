import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ContentCard from './ContentCard';
import './Home.css';

function RecommendedSection() {
    const exampleCards = [
        {
            title: 'Title 1',
            description: 'This is a description'
        },
        {
            title: 'Title 2',
            description: 'This is a description'
        },
        {
            title: 'Title 3',
            description: 'This is a description'
        },
        {
            title: 'Title 4',
            description: 'This is a description'
        },
        {
            title: 'Title 5',
            description: 'This is a description'
        },
        {
            title: 'Title 6',
            description: 'This is a description'
        }
    ]
    return(
        <Box sx={{ mt: 3}}>
            <Typography variant='h5' sx={{ ml: 2 }}>Recommended</Typography>
            <Box sx={{ maxHeight: 200, overflow: 'scroll' }}>
                <Stack direction="row" className='cardList'>
                    {
                        exampleCards.map((content, i) => (
                            <ContentCard className='cardContent' 
                                key={i}
                                content = {content}
                            />
                        ))
                    }
                </Stack>
            </Box>
        </Box>
    );
}

export default RecommendedSection;