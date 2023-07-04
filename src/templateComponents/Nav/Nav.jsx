import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <Box>
      {/* If a user is logged in, show these links */}
      {user.id && (
        <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigation sx={{ display: 'flex', alignItems: 'center' }}>
            <BottomNavigationAction 
              component={Link}
              to='/home'
              icon={<HomeIcon />}
            />
            <BottomNavigationAction 
              component={Link}
              to='/explore'
              icon={<ExploreIcon />}
            />
            <BottomNavigationAction 
              component={Link}
              to='/user'
              icon={<PersonIcon />}
            />
            <BottomNavigationAction 
              component={Link}
              to='/settings'
              icon={<SettingsIcon />}
            />
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  );
}

export default Nav;
