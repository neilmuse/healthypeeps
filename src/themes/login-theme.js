import { createTheme } from "@mui/material/styles";
import '../index.css'
import COLORS from '../constants/colors.js'

const LOGIN_THEME = createTheme({
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
            main: COLORS.DARK_ORANGE,
          },
        secondary: {
            main: COLORS.GREEN,
          },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: 10,
                    paddingBlock: 10,
                    paddingInline: 18,
                }
            }
        },
    },
});

export default LOGIN_THEME;
  