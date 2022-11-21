import { createTheme, responsiveFontSizes } from '@mui/material';
import { orange } from '@mui/material/colors';

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      cb: 700,
      md: 900,
      lg: 1200,
      xl: 1320,
      xxl: 1536,
    },
  },

  typography: {
    fontFamily: ['Poppins', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', '"Open Sans"', '"Helvetica Neue"', 'sans-serif'].join(','),
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'normal',
          borderRadius: '0.25rem 1rem 0.25rem 1rem',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {},
    },
    MuiTypography: {
      variants: [
        {
          props: { color: 'portfolioOrange' },
          style: {
            color: orange[400],
          },
        },
      ],
    },
  },
  palette: {
    customBlack: {
      main: '#111',
    },

    tonalOffset: 0.3,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
