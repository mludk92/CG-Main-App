import { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ExploreHeader from './ExploreHeader';
import ExploreFilter from './ExploreFilter';
import ExploreList from './ExploreList';

function Explore() {

    const [contentList, setContentList] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.get('/favorites')
            .then(response => {
                setFavorites(response.data);
            })
            .catch(error => {
                console.log('Error retrieving favorites:', error);
            })
    }, []);

    useEffect(() => {
        axios.get('/api/audio')
            .then(response => {
                setContentList(response.data);
            })
            .catch(error => {
                console.log('Error retrieving audio files:', error);
            })
    }, []);

    return (
        <Box>
            <ExploreHeader />
            <Divider variant='middle' sx={{ mt: 2 }} />
            <ExploreFilter />
            <ExploreList 
                contentList={contentList} 
                favorites={favorites} 
            />
        </Box>
    )
}

export default Explore;