import { useState, useEffect } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ExploreHeader from './ExploreHeader';
import ExploreFilter from './ExploreFilter';
import ExploreList from './ExploreList';

function Explore() {

    const [contentList, setContentList] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('/api/favorites')
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
        <Box sx={{ mb: 10, overflowX: 'hidden' }}>
            <ExploreHeader 
                search={search}
                setSearch={setSearch}
            />
            <ExploreFilter 
                setFilter={setFilter}
            />
            <ExploreList 
                contentList={contentList} 
                favorites={favorites}
                setFavorites={setFavorites}
                filter={filter}
                search={search}
            />
        </Box>
    )
}

export default Explore;