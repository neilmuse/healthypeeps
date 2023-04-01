import * as React from 'react';
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

import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AppBarText from './appbar-text.jsx';
import Typography from './typography.jsx';

const pages = [
  {
    name: "Feed",
    url: "home"
  },
  {
    name: "Recipe",
    url: "recipe"
  },
  {
    name: "About",
    url: "about"
  },
];

const settings = ['Profile', 'Dashboard', 'Logout'];

const TopNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);

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
                        <Link variant="darkBackground" href={url}>{name}</Link>
                      </Box>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                    
                {loggedIn ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                        <MenuItem key={setting} component="a" href="/${setting}" onClick={handleCloseUserMenu}>
                            <Typography text={setting} />
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
