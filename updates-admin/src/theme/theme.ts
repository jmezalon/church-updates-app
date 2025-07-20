import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', // white
      contrastText: '#000',
    },
    secondary: {
      main: 'rgba(255,184,0,1)', // yellow
      contrastText: '#000',
    },
    error: {
      main: '#e53935', // red
    },
    text: {
      primary: '#000',
      secondary: '#e53935',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  },
});
