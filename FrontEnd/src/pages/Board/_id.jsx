//Board detail
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import fetchBoardDetailsAPI from '~/apis/index';
import ModeSelect from '../../components/ModeSelect';
import Board from './_id';


function Board() {
  const [board, setBoard] = useState(null)

  
  useEffect(() => {
    //Lấy id từ URL về 
    const boardId = '615f4b3b7b3b3b1b3b3b3b3b'
    fetchBoardDetailsAPI(boardId).then((data) => {
      setBoard(data)
    })
  }, [])


  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: 'primary.main' }}>
      <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme) => theme.WebCustom.appBarHeight
      }}>
        <ModeSelect />
      </Box>
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.WebCustom.boardBarHeight,
        alignItems: 'center'
      }}>
        Board Bar
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.WebCustom.boardBarHeight} - ${theme.WebCustom.appBarHeight})`,
        alignItems: 'center'
      }}>
        Board Content
      </Box>
    </Container>
  )
}

export default Board