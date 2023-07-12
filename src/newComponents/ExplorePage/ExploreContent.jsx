import { useHistory } from 'react-router-dom';
import axios from 'axios';

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

function ExploreContent({ content, isFavorite, setFavorites }) {

    const history = useHistory();

    const toDetails = () => {
        history.push(`/details/${content.id}`)
    }

    const refreshFavorites = () => {
        axios.get('/api/favorites')
            .then(response => {
                setFavorites(response.data);
            })
            .catch(error => {
                console.log('Error retrieving favorites:', error);
            })
    }

    const addFavorite = () => {
        axios.post('/api/favorites', { id: content.id })
            .then(response => {
                refreshFavorites();
            })
            .catch(error => {
                alert('Error adding content to favorites.', error);
            });
    }

    const removeFavorite = () => {
        axios.delete('/api/favorites', { data: { id: content.id } })
            .then(response => {
                refreshFavorites();
            })
            .catch(error => {
                alert('Error deleteing content from favorites.', error)
            });
    }

    return (
        <Card
            className='cardContent'
            sx={{
                borderRadius: 5,
                backgroundColor: '#83c55f',
                height: '130px',
                position: "relative"
            }}
        >
            <CardContent>
                <Typography
                    onClick={toDetails}
                    variant='body1'
                    sx={{
                        color: 'white'
                    }}
                >
                    {content.title}
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        mt: 1,
                        color: 'white',
                        maxWidth: '80%'
                    }}
                >
                    By {content.author}
                </Typography>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%"
                    }}
                >
                    {isFavorite ? (
                        <FavoriteIcon
                            onClick={() => removeFavorite()}
                            sx={{
                                color: '#3d71b8'
                            }}
                        />
                    ) : (
                        <FavoriteBorderOutlinedIcon
                            onClick={() => addFavorite()}
                            sx={{
                                color: '#3d71b8'
                            }}
                        />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}

export default ExploreContent;