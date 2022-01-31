import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {ThemeProvider } from "@mui/material/styles";
import GameSearchCard from "./GameSearchCard";


function GameSearchContainer ({data, theme, setPage, page, searchedCategory, selectedGame, setSelectedGame}) {

    function handleNextPage(e){
        let pageNum = parseInt(page)
        let newPage = pageNum+1
        let pageState = String(newPage)
        setPage(pageState)
    }

    function handlePreviousPage(e){
        let pageNum = parseInt(page)
        if (pageNum > 1) {
        let newPage = pageNum-1
        let pageState = String(newPage)
        setPage(pageState)
        }
    }

    function handleGameSelect(e){
      setSelectedGame(e.target.value)
    }

  const spawnGameCards = data.map((givenGame) => {
    if (searchedCategory==="Video Games") {
      return (
        <Grid item xs={12} sm={5} md={5} lg={3}  sx={{ mt: 3, mr: 5, display:"flex",}} key={givenGame.id} align="center">
        <GameSearchCard gameInfo={givenGame} key={givenGame.id} handleGameSelect={handleGameSelect}/>
        </Grid>
      )}
      })
    

      return (
        <ThemeProvider theme={theme}>
            <Grid container 
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="stretch">
            {spawnGameCards}
            </Grid>
            <Grid container
            spacing={1}
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            sx={{mt: 3}}>
        <Grid item component={Button}
            align="center"
            xs={12} sm={6}
            
                          variant="contained"
                          onClick={handlePreviousPage}
                          sx={{ mt: 3, mb: 2,border: 1, borderColor: "#FFD700", borderTop: 1}}
                        >
                          Previous Page
                        </Grid>
          <Grid item component={Button}
          xs={12} sm={6}
                          variant="contained"
                          onClick={handleNextPage}
                          sx={{ mt: 3, mb: 2, border: 1, borderColor: "#FFD700", borderTop: 1}}
                        >
                          Next Page
                        </Grid>
                        </Grid>
      </ThemeProvider>
        )
}



export default GameSearchContainer