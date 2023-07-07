import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExploreContent from './ExploreContent';

function ExploreList() {

    const [contentList, setContentList] = useState([]);

    useEffect(() => {
        axios.get('/api/audio')
            .then(response => {
                setContentList(response.data);
            })
            .catch(error => {
                console.log('Error retrieving audio files:', error);
            });
    }, []);

    return (
        <Box sx={{ mt: 1 }}>
            <Grid container spacing={2} justifyContent={'center'}>
                {
                    contentList.map((content, i) => (
                        <Grid item key={i} xs={5}>
                            <ExploreContent
                                content={content}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

export default ExploreList;