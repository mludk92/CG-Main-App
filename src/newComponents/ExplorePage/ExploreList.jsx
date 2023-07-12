import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExploreContent from './ExploreContent';

function ExploreList({ contentList, favorites, setFavorites, filter, search }) {

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
            <Grid container spacing={2} justifyContent={'center'}>
                {
                    filteredBySearch.map((content, i) => {
                        const isFavorite = favorites.some(item => item.content_id === content.id);
                        return (
                            <Grid item key={i} xs={5}>
                                <ExploreContent
                                    content={content}
                                    isFavorite={isFavorite}
                                    setFavorites={setFavorites}
                                />
                            </Grid>
                        );
                    })}
            </Grid>
        </Box>
    );
}

export default ExploreList;