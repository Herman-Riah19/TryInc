import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';

const theme = createTheme ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    primary: {
      main: '#00ccff',
    },
    secondary: {
      main: '#00cdff',
    },
    warning: {
      main: '#F34040',
    },
    success: {
      main: '#3D50FF',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa'
    },
    error: {
      main: red.A400,
    },
    divider: '#19174b',
    text: {
      primary: '#000',
      secondary: '#5EC6B8',
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: [
      'Poppins',
      'Nunito',
    ].join(','),
    color: '#ffffff',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800,
    htmlFontSize: 16,
    button: {
      fontSize: '1rem',
    },
    h1: {
      fontSize: 72, //theme.spacing(9)
      fontWeight: 900
    },
    h2: {
      fontSize: 64, //theme.spacing(8)
      fontWeight: 900
    },
    h3: {
      fontSize: 48, //theme.spacing(6)
      fontWeight: 900
    },
    h4: {
      fontSize: 40, //theme.spacing(5)
      fontWeight: 900
    },
    h5: {
      fontSize: 28, //theme.spacing(3.5)
      fontWeight: 900
    },
    h6: {
      fontSize: 24, //theme.spacing(3)
      fontWeight: 900
    },
    body1: {
      fontWeight: 'normal',
      fontSize: 16,
    },
    body2: {
      fontWeight: 'normal',
      fontSize: 14,
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;