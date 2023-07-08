import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExploreContent from './ExploreContent';

function ExploreList({ contentList, favorites, filter }) {

    const filteredContent = filter === 'favorites'
        ? favorites
        : contentList

    return (
        <Box sx={{ mt: 1 }}>
            <Grid container spacing={2} justifyContent={'center'}>
                {
                    filteredContent.map((content, i) => (
                        <Grid item key={i} xs={5}>
                            <ExploreContent
                                content={content}
                                favorites={favorites}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

export default ExploreList;