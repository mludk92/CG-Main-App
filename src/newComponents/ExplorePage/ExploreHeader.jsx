import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import FocusTrap from '@mui/base/FocusTrap';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

function ExploreHeader({ search, setSearch }) {

    const searchChange = (event) => {
        setSearch(event.target.value);
    }

    return(
        <Paper elevation={3} sx={{ backgroundColor: '#3d71b8', minWidth: '100%', minHeight: '10%', position: 'sticky', top: 0, zIndex: 9 }}>
            <Box sx={{ mx: 2, py: 2, display: 'flex' }}>
                <Typography variant='h4' sx={{ color: 'white' }}>Explore</Typography>
                <Paper component="form" id="searchBox" sx={{ mt: 0.5, ml: 'auto', p: '2px 4px', display: 'flex', alignItems: 'center', width: 190 }}>
                    <Stack direction={'row'}>
                        <SearchIcon sx={{ mt: 0.3 }}/>
                        <InputBase placeholder='Search' sx={{ ml: 1, flex: 1, maxHeight: 32, pt: 1 }} onChange={searchChange} value={search} />
                    </Stack>
                </Paper>
            </Box>
        </Paper>
    );
}

export default ExploreHeader;