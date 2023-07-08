import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ExploreFilter({ setFilter }) {

    const handleFilterChange = event => {
        setFilter(event.target.value);
    }

    return(
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <FormControl>
                <RadioGroup row>
                    <FormControlLabel 
                        value="health" 
                        control={<Radio />} 
                        label="Health" 
                        onChange={handleFilterChange}
                    />
                    <FormControlLabel 
                        value='wealth' 
                        control={<Radio />} 
                        label="Wealth" 
                        onChange={handleFilterChange}
                    />
                    <FormControlLabel 
                        value='favorites' 
                        control={<Radio />} 
                        label="Favorites" 
                        onChange={handleFilterChange}
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

export default ExploreFilter;