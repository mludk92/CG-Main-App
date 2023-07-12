import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ContentCard from './ContentCard';
import './Home.css';

function RecommendedSection({recommendedContent}) {
    return(
        recommendedContent === undefined
            ? <h3>Loading</h3>
            :
            <Box sx={{ mt: 3 }}>
                <Typography variant='h5' sx={{ ml: 2 }}>Recommended</Typography>
                <Box sx={{ maxHeight: 200, overflow: 'scroll' }}>
                    <Stack direction="row" className='cardList' sx={{ pr: 16 }}>
                        {
                            recommendedContent.map((content, i) => (
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