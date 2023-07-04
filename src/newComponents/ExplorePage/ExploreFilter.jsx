import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ExploreFilter() {

    return(
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <FormControl>
                <RadioGroup row>
                    <FormControlLabel value="mental" control={<Radio />} label="Mental" />
                    <FormControlLabel value='financial' control={<Radio />} label="Financial" />
                    <FormControlLabel value='favorites' control={<Radio />} label="Favorites" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

export default ExploreFilter;