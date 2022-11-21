import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useGlobalContext } from '../context';

const Navbar = () => {
  const { user } = useGlobalContext();

  return (
    <Container maxWidth={false} disableGutters>
      <AppBar position='static' variant='elevation' sx={{ p: 1 }}>
        <Toolbar>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Projects Manager
          </Typography>

          <Button variant='text' size='large' color='inherit' sx={{ mr: 1 }}>
            {user?.name}
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Navbar;
