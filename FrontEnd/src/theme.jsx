import { experimental_extendTheme as extendTheme } from '@mui/material/styles'


const theme = extendTheme({
  WebCustom: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        // primary: {
        //   main: '#ff5252'
        // }
      }
    },
    dark: {
      palette: {
        // primary: {
        //   main: '#000'
        // }
      }
    }
  }
  // ...other properties
})

export default theme