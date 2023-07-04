import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExploreContent from './ExploreContent';

function ExploreList() {
    const exampleContent = [
        { 
            name: 'Content 1',
            author: 'author'
        }, 
        { 
            name: 'Content 2',
            author: 'author'
        }, 
        { 
            name: 'Content 3',
            author: 'author'
        }, 
        { 
            name: 'Content 4',
            author: 'author'
        }, 
        { 
            name: 'Content 5',
            author: 'author'
        }, 
        { 
            name: 'Content 6',
            author: 'author'
        }, 
        { 
            name: 'Content 7',
            author: 'author'
        }, 
        { 
            name: 'Content 8',
            author: 'author'
        }
    ]

    return(
        <Box sx={{ mt: 1 }}>
            <Grid container spacing={2} justifyContent={'center'}>
                {
                    exampleContent.map((content, i) => (
                        <Grid item key={i} xs={5}>
                            <ExploreContent
                                content = {content}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}

export default ExploreList;