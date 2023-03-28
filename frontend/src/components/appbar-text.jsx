import { Box, Typography } from '@mui/material';

const AppBarText = ({
    variant,
    href,
    text
}) => (
    <Typography
        variant={variant}
        noWrap
        component="a"
        href={href}
        sx={{
        mr: 2,
        fontWeight: 700,
        letterSpacing: '.1rem',
        color: 'inherit',
        flexGrow: {xs: 1, md: 0},
        textDecoration: 'none',
        }}
    >
        {text}
    </Typography>
);

export default AppBarText;
