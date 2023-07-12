import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import './Home.css';

function ContentCard({content}) {
    return(
        <Card className='cardContent' sx={{ mt: 1, ml: 2, minHeight: 150, minWidth: 250, borderRadius: 5, backgroundColor: '#83c55f' }}>
            <CardContent>
                <Typography variant='h5' sx={{ color: 'white'}}>{content.title}</Typography>
                <Typography variant='body1' sx={{ mt: 1, color: 'white', maxWidth: '80%' }}>{content.author}</Typography>
            </CardContent>
        </Card>
    );
}

export default ContentCard;