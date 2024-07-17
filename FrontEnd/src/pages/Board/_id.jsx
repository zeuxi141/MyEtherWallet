//Board detail
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// import fetchBoardDetailsAPI from '~/apis/index';
import Features from '../../components/Feature/index';


function Board() {
  // const [board, setBoard] = useState(null)

  
  // useEffect(() => {
  //   //Lấy id từ URL về 
  //   const boardId = '615f4b3b7b3b3b1b3b3b3b3b'
  //   fetchBoardDetailsAPI(boardId).then((data) => {
  //     setBoard(data)
  //   })
  // }, [])


  return (
    <Container disableGutters maxWidth={false} 
    sx={{ 
      // minHeight:'100vh', // Set the height to 100vh to cover the entire viewport height
      // backgroundColor: 'primary.main', 
      // marginTop: '5px', 
      }}>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => theme.WebCustom.appBarHeight
      }}>
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => theme.WebCustom.boardBarHeight,
        alignItems: 'center'
      }}>
        {/* Board Bar */}
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        // height: (theme) => `calc(100vh - ${theme.WebCustom.boardBarHeight} - ${theme.WebCustom.appBarHeight})`,
        alignItems: 'center'
      }}>
        <Features/>
      </Box>
    </Container>
  )
}

export default Board