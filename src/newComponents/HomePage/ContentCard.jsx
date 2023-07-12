import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import IconButton from '@mui/material/IconButton';
import './Home.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ContentCard({content}) {

    const history = useHistory();

    const toDetails = () => {
        history.push(`/details/${content.id}`)
    }

    return(
        <Card className='cardContent' sx={{ mt: 1, ml: 2, minHeight: 150, minWidth: 250, borderRadius: 5, backgroundColor: '#83c55f' }}>
            <CardContent sx={{ mb: ''}}>
                <Typography variant='h5' sx={{ color: 'white'}}>{content.title}</Typography>
                <Typography variant='body1' sx={{ mt: 1, color: 'white', maxWidth: '80%' }}>{content.author}</Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                <IconButton onClick={toDetails}>
                    <PlayCircleIcon sx={{ color: '#FFFFFF' }}/>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default ContentCard;