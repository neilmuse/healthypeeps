import React, { useEffect, useState, useContext } from 'react';
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

import CircularProgress from '@mui/material/CircularProgress';

import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
    name: "Recipes",
    url: "recipes"
  },
  {
    name: "Reviews",
    url: "reviews"
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
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const location = useLocation();

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
        setIsLoading(true); // Show loading icon
        setTimeout(() => {
            logout();
            NAVIGATE('/'); // redirect to home page after logging out
            setIsLoading(false);
        }, 250); // 250ms delay before logging out and redirecting
    } else {
        NAVIGATE('/profile');
    }
  };


  const handleNavigationClick = (url) => {
    setIsLoading(true); // Set loading state to true before navigating
    setTimeout(() => {
      NAVIGATE(url);
    }, 250);
  };
  

  useEffect(() => {
    // This will be called whenever the location changes
    setIsLoading(false);
  }, [location]);
  
  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}

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
                      <MenuItem
                        key={url}
                        onClick={() => {
                          handleNavigationClick(`/${url}`);
                          handleCloseNavMenu();
                      }}
                      >
                        <Typography text={name} />
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
                {pages.map(({name, url}) => (
                  <Box m={2} key={url}>
                    <Link
                      variant="darkBackground"
                      href={`/${url}`}
                      onClick={(event) => {
                        event.preventDefault();
                        handleNavigationClick(`/${url}`);
                      }}
                    >
                      {name}
                    </Link>
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
                  <Link variant="darkBackground" href="/login">Login</Link>
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
