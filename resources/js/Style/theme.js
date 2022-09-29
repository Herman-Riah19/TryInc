import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920
    }
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px'
          }
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6'
        },
        subheaderTypographyProps: {
          variant: 'body2'
        }
      },
      styleOverrides: {
        root: {
          padding: '32px 24px'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%'
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%'
        },
        '#__next': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%'
        }
      }
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#05043D',
      contrastText: '#ffffff',
      dark: '#19174B',
      light: '#19174B',
    },
    secondary: {
      main: '#f50057',
      light: '#e22266',
      dark: '#bd0445',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
    },
    text: {
      primary: '#201f1f',
      secondary: 'rgba(0,0,0,0.57)',
      disabled: 'rgba(0,0,0,0.38)',
      hint: 'rgba(0,0,0,0.38)',
    },
    success: {
      main: '#00d65f',
      light: '#40c17a',
      dark: '#037f3a',
    },
    error: {
      main: '#ec3224',
      light: '#ec5a4e',
      dark: '#a6261c',
      contrastText: '#ffffff',
    },
    info: {
      main: '#08A8B1',
      light: '#3abcc3',
      dark: '#057379',
    },
    divider: 'rgba(53,48,48,0.12)',
    fontFamily: 'Poppins, sans-serif',
    neutral: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    action: {
      active: '#6B7280',
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)'
    },
  },
  
});

export default theme;