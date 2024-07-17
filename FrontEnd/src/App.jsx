import { Box } from '@mui/material'
import AppBar from './components/AppBar/index'
import Board from './pages/Board/_id'

function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') 


  return (
    <Box sx={{minHeight: '100vh'}}>
      <AppBar />
      <Board/>
    </Box>
  )
}

export default App
