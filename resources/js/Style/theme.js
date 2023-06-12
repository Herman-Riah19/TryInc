import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';

const theme = createTheme ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#0094FF',
    },
    warning: {
      main: '#f87070',
    },
    success: {
      main: '#00cd5c',
    },
    background: {
      default: '#181A2D',
      paper: '#212439',
    },
    error: {
      main: red.A400,
    },
    divider: '#fff',
    text: {
      primary: '#fff',
      secondary: '#c7d4e1',
      thirdy: '#c7d4e1'
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: ['roboto-regular','Roboto'
    ].join(','),
    color: '#fff',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800,
    htmlFontSize: 16,
    button: {
      fontSize: '1rem',
    },
    h1: {
      fontFamily: 'Roboto',
      fontSize: 66, //theme.spacing(9)
      fontWeight: 900
    },
    h2: {
      fontFamily: 'Roboto',
      fontSize: 60, //theme.spacing(8)
      fontWeight: 900
    },
    h3: {
      fontFamily: 'Roboto',
      fontSize: 51, //theme.spacing(6)
      fontWeight: 800
    },
    h4: {
      fontFamily: 'Roboto',
      fontSize: 32, //theme.spacing(5)
      fontWeight: 800
    },
    h5: {
      fontFamily: 'Roboto',
      fontSize: 25, //theme.spacing(3.5)
      fontWeight: 800
    },
    h6: {
      fontFamily: 'Roboto',
      fontSize: 20, //theme.spacing(3)
      fontWeight: 800
    },
    body1: {
      fontFamily: 'Roboto',
      fontWeight: 'normal',
      fontSize: 18,
    },
    body2: {
      fontFamily: 'Roboto',
      fontWeight: 'normal',
      fontSize: 20,
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;