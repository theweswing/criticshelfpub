
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {ThemeProvider } from "@mui/material/styles";
import MovieSearchCard from "./MovieSearchCard";


function MovieSearchContainer ({data, theme, setPage, page, setSelectedMovie, selectedMovie}) {

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

    function handleMovieSelect(e){
      setSelectedMovie(e.target.value)
    }

  const spawnMovieCards = data.map((givenMovie) => {
    return (
      <Grid item xs={12} sm={5} md={5} lg={3}  sx={{ mt: 3, mr: 5, display:"flex",}} key={givenMovie.id} align="center">
      <MovieSearchCard movieInfo={givenMovie} key={givenMovie.id} handleMovieSelect={handleMovieSelect}/>
      </Grid>
    )
      })
    

      return (
        <ThemeProvider theme={theme}>
            <Grid container 
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="stretch">
            {spawnMovieCards}
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



export default MovieSearchContainer