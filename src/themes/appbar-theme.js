import { createTheme } from "@mui/material/styles";
import '../index.css'
import COLORS from '../constants/colors.js'

const APPBAR_THEME = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
            'Karla',
            'Quicksand',
        ].join(','),
        title: {
            fontSize: '3rem',
            fontFamily: 'Quicksand',
            fontWeight: 600,
            color: COLORS.GREEN,
        },
        body2: {
            fontSize: '1rem',
            fontFamily: 'Roboto',
        },
        button: {
            fontFamily: 'Quicksand',
            fontSize: '1rem'
        }
    },
    palette: {
        primary: {
            main: COLORS.GREEN,
          },
        secondary: {
            main: COLORS.DARK_ORANGE,
          },
    },
});

export default APPBAR_THEME;
  