import { createTheme } from "@mui/material/styles";
import "../index.css";
import COLORS from "../constants/colors.js";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.GREEN,
    },
    secondary: {
      main: COLORS.GREEN,
    },
  },
  typography: {
    hero: {
      fontSize: "5rem",
      fontFamily: "Quicksand",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1.2rem",
      fontFamily: "Roboto",
    },
    darkBackground: {
      color: "white !important",
      fontFamily: "Roboto",
    },
    small: {
      fontSize: "0.8em",
    },
    body_bold: {
      fontSize: "1.1rem",
      fontFamily: "Roboto",
      fontWeight: 600,
    },
    cardtitle: {
      fontSize: "1.5rem",
      fontFamily: "Bebas Neue",
    },
    cardsubheader: {
      fontSize: "1rem",
      fontFamily: "Quicksand",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            fontSize: '1rem',
          },
          '& .MuiInputBase-root': {
            fontSize: '1rem',
          },
        },
      },
    },
  },
  fontFamily: ["Roboto", "Karla", "Quicksand", "Bebas Neue"].join(","),
});

theme.components.MuiTextField.styleOverrides.root = {
  '& .MuiInputLabel-root': {
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
    },
  },
  '& .MuiInputBase-root': {
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
    },
  },
};

theme.typography.hero_title = {
  component: "h1",
  display: "block",
  fontSize: "3.5rem",
  marginBottom: "0.5em",
  fontWeight: 600,
  fontFamily: "Quicksand",
  color: COLORS.GREEN,
  [theme.breakpoints.down('sm')]: {
    fontSize: "2.5em",
  },
};

theme.typography.title = {
  component: "h2",
  display: "block",
  fontSize: "2rem",
  marginBottom: "0.5em",
  fontWeight: 600,
  fontFamily: "Quicksand",
  color: COLORS.GREEN,
  [theme.breakpoints.down('sm')]: {
    fontSize: "1.5em",
  },
};

export default theme;
