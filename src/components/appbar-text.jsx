import { Typography } from "@mui/material";

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
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.1rem',
        color: 'inherit',
        textDecoration: 'none',
        }}
    >
        {text}
    </Typography>
);

export default AppBarText;
