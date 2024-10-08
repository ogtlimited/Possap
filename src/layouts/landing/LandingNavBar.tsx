import { useState } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';

const LandingNavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href="/" underline="none">
            <img
              src="/assets/images/Logo.png"
              alt="Logo"
              style={{ width: '100px', height: 'auto' }}
            />
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" component={Link} href="/select-service">
              Request Service
            </Button>
            <Button color="inherit" component={Link} href="/validate-document">
              Validate Document
            </Button>
            <Button color="inherit" component={Link} href="/about">
              About
            </Button>
            <Button color="inherit" component={Link} href="/contact">
              Contact
            </Button>
          </Box>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <Avatar src="/assets/images/user.svg" alt="User" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} href="/request-list">
              Requests
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} href="/p/change-password">
              Settings
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} href="/p/sign-out">
              Sign Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LandingNavBar;
