import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Typography from '@mui/material/Typography';

function ExploreContent({content}) {
    return(
        <Card className='cardContent' sx={{ borderRadius: 5, backgroundColor: '#83c55f' }}>
            <CardContent>
                <Typography variant='h5' sx={{ color: 'white'}}>{content.name}</Typography>
                <Typography variant='body1' sx={{ mt: 1, color: 'white', maxWidth: '80%' }}>{content.author}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <FavoriteBorderOutlinedIcon sx={{ color: '#3d71b8' }} />
                </Box>
            </CardContent>
        </Card>
    );
}

export default ExploreContent;