import { useState } from 'react';
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

function ExploreContent({ content }) {

    // Remove the last 4 characters (file extension)
    const trimExtension = (filename) => {
        return filename.slice(0, -4);
    };

    const [isFavorite, setIsFavorite] = useState(false);

    const addFavorite = () => {
        setIsFavorite(true);
        axios.post('favorites', { id: content.id })
            .then(response => {
                alert(`Added ${content.name} to favorites.`);
            })
            .catch(error => {
                alert('Error adding content to favorites.', error);
            });
    }

    const removeFavorite = () => {
        setIsFavorite(false);
        axios.delete('/favorites', { data: { id: content.id } })
            .then(response => {
                alert(`Removed ${content.name} from favorites.`);
            })
            .catch(error => {
                alert('Error deleteing content from favorites.', error)
            })
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
                    sx={{
                        color: 'white'
                    }}
                >
                    {trimExtension(content.name)}
                </Typography>
                <Typography
                    variant='body1'
                    sx={{
                        mt: 1,
                        color: 'white',
                        maxWidth: '80%'
                    }}
                >
                    {content.author}
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