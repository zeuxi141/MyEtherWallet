import { experimental_extendTheme as extendTheme } from '@mui/material/styles';


const theme = extendTheme({
  WebCustom: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#2196f3',
        },
        secondary: {
          main: '#f50057',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#3f51b5',
        },
        secondary: {
          main: '#ff4081',
        },
      },
    },
  },
  // ...other properties
});

export default theme