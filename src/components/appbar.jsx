import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuIcon, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'

import { Link, Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import APPBAR_THEME from "../themes/appbar-theme";
import COLORS from '../constants/colors.js';

import AppBarText from './appbar-text.jsx';
import SimpleText from './simple-text.jsx';

const pages = ['Feed', 'Recipe', 'About'];
const settings = ['Profile', 'Dashboard', 'Logout'];

const TopNavBar = () => {
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

  return (
    <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                <AppBarText
                    variant="h6"
                    text="Healthy Peeps"
                    href="/"
                />

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    {pages.map((page) => (
                        <MenuItem key={page} value={page} onClick={handleCloseNavMenu} component="a" href="/${page}">
                        <SimpleText text={page} />
                        {/* <a href="/"> {page} </a> */}
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>

                <AppBarText
                    variant="h5"
                    text="Healthy Peeps"
                    href="/"
                />

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                    </Tooltip>

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
                        <MenuItem key={setting} component="a" href="/${setting}" onClick={handleCloseUserMenu}>
                            <SimpleText text={setting} />
                            {/* <a href="/">{setting}</a> */}
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