import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExploreContent from './ExploreContent';

function ExploreList({ contentList, favorites, filter }) {

    const filteredContent = filter === 'favorites'
        ? favorites
        : contentList

    const filteredByCategory = filter === 'health' || filter === 'wealth'
        ? filteredContent.filter(content => content.category === filter)
        : filteredContent;

    return (
        <Box sx={{ mt: 1 }}>
            <Grid container spacing={2} justifyContent={'center'}>
                {
                    filteredByCategory.map((content, i) => {
                        const isFavorite = favorites.some(item => item.content_id === content.id);
                        return (
                            <Grid item key={i} xs={5}>
                                <ExploreContent
                                    content={content}
                                    isFavorite={isFavorite}
                                />
                            </Grid>
                        );
                    })}
            </Grid>
        </Box>
    );
}

export default ExploreList;