import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import FocusTrap from '@mui/base/FocusTrap';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { useState } from 'react';

function ExploreHeader() {
    const [searchText, setSearchText] = useState('');
    const [searchFocus, setSearchFocus] = useState(false);

    const searchChange = (event) => {
        setSearchText(event.target.value);
    }
    const searchContent = () => {
        console.log('Testing search: ' + searchText);
    }

    return(
        <Box sx={{ m: 2, display: 'flex' }}>
            <Typography variant='h4'>Explore</Typography>
            <FocusTrap>
                <Paper component="form" onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)}
                sx={{ ml: 'auto', p: '2px 4px', display: 'flex', alignItems: 'center', width: 200, '&:focus-within':{ width: '90%', height: '5%', mx: 'auto', position: 'absolute' } }}>
                    <SearchIcon />
                    <InputBase placeholder='Search' sx={{ ml: 1, flex: 1 }} value={searchText} onSubmit={searchContent} onChange={searchChange} />
                    {searchFocus && (
                        <Button variant='contained' onClick={searchContent}>
                            <ShortcutOutlinedIcon />
                        </Button>
                    )}
                </Paper>
            </FocusTrap>
        </Box>
    );
}

export default ExploreHeader;