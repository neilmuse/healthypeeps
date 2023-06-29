import React, { useContext } from 'react';

import {
    Box as MUIBox,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    TextField as MUITextField,
    useMediaQuery
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import Button from '../components/button.jsx';
import Typography from '../components/typography.jsx';
import TopNavBar from '../components/appbar.jsx';

import logo from '../assets/logo-temp.png';
import bg from '../assets/404bg.jpg';

import { AuthContext } from '../context/auth-context';

const PageNotFound = () => {
    const { user } = useContext(AuthContext);
    const NAVIGATE = useNavigate();

    const handleButtonClick = () => {
        NAVIGATE('/home');
    };

    return (
        <>
            <TopNavBar />
            <MUIBox
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                sx={{
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: `url(${bg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                <Typography variant="title" text="Page Not Found" />
                <Button text="Return to Homepage" primary onClick={handleButtonClick} />
            </MUIBox>
        </>
    );
}

export default PageNotFound;
