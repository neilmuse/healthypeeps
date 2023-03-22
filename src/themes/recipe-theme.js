import { createTheme } from "@mui/material/styles";
import "../index.css";
import COLORS from "../constants/colors.js";

const RECIPE_THEME = createTheme({
  typography: {
    hero: {
      fontSize: "5rem",
      fontFamily: "Quicksand",
      fontWeight: 600,
      color: COLORS.GREEN,
    },
    title: {
      fontSize: "2.5rem",
      fontFamily: "Quicksand",
      fontWeight: 600,
      color: COLORS.GREEN,
    },
    homepagetitle: {
      fontSize: "2.5rem",
      fontFamily: "Quicksand",
      fontWeight: 600,
      color: COLORS.BLACK,
    },
    body1: {
      fontSize: "1.1rem",
      fontFamily: "Roboto",
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
  fontFamily: ["Roboto", "Karla", "Quicksand", "Bebas Neue"].join(","),
});

export default RECIPE_THEME;

