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
                    <FormControlLabel value="health" control={<Radio />} label="Health" />
                    <FormControlLabel value='wealth' control={<Radio />} label="Wealth" />
                    <FormControlLabel value='favorites' control={<Radio />} label="Favorites" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

export default ExploreFilter;