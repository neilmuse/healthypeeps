import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from "../components/link.jsx";

import { Outlet, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppBarText from './appbar-text.jsx';
import Typography from './typography.jsx';

import { AuthContext } from '../context/auth-context';

const pages = [
  {
    name: "Discussions",
    url: "discussions"
  },
  {
    name: "Recipe",
    url: "recipes"
  },
  {
    name: "Listings",
    url: "listings"
  },
  {
    name: "About",
    url: "about"
  },
];

const settings = ['Profile', 'Logout'];

const TopNavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const NAVIGATE = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    handleCloseUserMenu();
  
    if (setting === 'Logout') {
      logout();
    } else {
      NAVIGATE('/profile');
    }
  };
  
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
            <Toolbar disableGutters>

              <Box
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                  <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map(({name, url}) => (
                        <MenuItem key={url} value={url} onClick={handleCloseNavMenu} component="a" href={`/${url}`}>
                        <Typography text={name} />
                        </MenuItem>
                    ))}
                  </Menu>
              </Box>

              <AppBarText
                variant="h5"
                text="Healthy Peeps"
                href="/home"
              />

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map(({name, url}) => (
                  <Box m={2}>
                    <Link variant="darkBackground" key={url} href={url}>{name}</Link>
                  </Box>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                  
              {user ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Profile Icon" src="/src/assets/user.png" />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Box m={2}>
                  <Link variant="darkBackground" href="login">Login</Link>
                </Box>
              )}

                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      
                    {settings.map((setting) => (
                      <MenuItem key={setting} component="a" onClick={() => handleMenuItemClick(setting)}>
                          <Typography text={setting} />
                      </MenuItem>
                    ))}
                  </Menu>
              </Box>
            </Toolbar>
        </Container>
      </AppBar>
      <Outlet/>
    </>
  );
}
export default TopNavBar;
