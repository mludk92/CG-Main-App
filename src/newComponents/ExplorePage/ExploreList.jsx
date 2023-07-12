import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExploreContent from './ExploreContent';

function ExploreList({ contentList, favorites, filter, search }) {

    const filteredContent = filter === 'favorites'
        ? favorites
        : contentList

    const filteredByCategory = filter === 'health' || filter === 'wealth'
        ? filteredContent.filter(content => content.category === filter)
        : filteredContent;

    const filteredBySearch = filteredByCategory.filter(content =>
        content.title.toLowerCase().includes(search.toLowerCase()) ||
        content.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ mt: 1 }}>
            <Grid columns={36} container spacing={2} justifyContent={'flex-start'} alignItems={'flex-start'} sx={{ mx: 'auto' }}>
                {
                    filteredBySearch.map((content, i) => {
                        const isFavorite = favorites.some(item => item.content_id === content.id);
                        return (
                            <Grid item key={i} xs={16.5}>
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