import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import FocusTrap from '@mui/base/FocusTrap';
import { useState } from 'react';

function ExploreHeader() {
    const [searchText, setSearchText] = useState('');
    const [searchFocus, setSearchFocus] = useState(false);

    const searchChange = (event) => {
        setSearchText(event.target.value);
    }
    const searchContent = () => {
        console.log('Testing search: ' + searchText);
        setSearchFocus(false);
    }

    return(
        <Box sx={{ m: 2, display: 'flex' }}>
            <Typography variant='h4'>Explore</Typography>
            <FocusTrap open={searchFocus} disableRestoreFocus disableAutoFocus>
                { searchFocus ? 
                    <Paper component="form" id="searchBox"
                    sx={{ display: 'flex', alignItems: 'center', width: '93%', height: '5%', mx: 'auto', position: 'absolute' }}>
                        <SearchIcon sx={{ ml: 1 }} />
                        <InputBase placeholder='Search' sx={{ ml: 1, flex: 1 }} value={searchText} onSubmit={searchContent} onChange={searchChange} />
                        <Button variant='contained' onClick={searchContent} sx={{ mr: 1 }}>
                            <ShortcutOutlinedIcon />
                        </Button>
                    </Paper> : 
                    <Paper component="form" id="searchBox" onFocus={() => setSearchFocus(true)} sx={{ ml: 'auto', p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}>
                        <SearchIcon />
                        <InputBase placeholder='Search' sx={{ ml: 1, flex: 1 }} value={searchText} />
                    </Paper>}
            </FocusTrap>
        </Box>
    );
}

export default ExploreHeader;