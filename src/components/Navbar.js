import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useGlobalContext } from '../context';

const Navbar = () => {
  const { user, logoutUser } = useGlobalContext();

  return (
    <Container maxWidth={false} disableGutters>
      <AppBar position='static' variant='elevation' sx={{ p: 1 }}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
            Projects Manager
          </Typography>

          {user && (
            <Box>
              <Typography variant='button' component='span' sx={{ mr: 2 }}>
                {user.name}
              </Typography>
              <Button variant='contained' size='large' color='warning' onClick={logoutUser}>
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Navbar;
