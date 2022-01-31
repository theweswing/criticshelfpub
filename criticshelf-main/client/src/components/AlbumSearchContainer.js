import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {ThemeProvider} from "@mui/material/styles";
import AlbumSearchCard from "./AlbumSearchCard"


function AlbumSearchContainer ({data, theme, setPage, page, searchedCategory, setSelectedAlbum, selectedAlbum}) {

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

    function handleAlbumSelect(e){
      setSelectedAlbum(e.target.value)
    }

    const spawnAlbumCards = data.map((givenAlbum) => {
        if (givenAlbum.mbid.length>0){
          return (
            <Grid item xs={12} sm={5} md={5} lg={3}  sx={{ mt: 3, mr: 5, display:"flex",}} key={givenAlbum.id} align="center">
            <AlbumSearchCard albumInfo={givenAlbum} key={givenAlbum.id} handleAlbumSelect={handleAlbumSelect}/>
            </Grid>
          )
                }
      })
    
    if (data) {
      return (
        <ThemeProvider theme={theme}>
            <Grid container 
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="stretch">
            {spawnAlbumCards}
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
  else {
    return (
      <Typography gutterBottom variant="h5" component="div">
          Loading...
        </Typography>
    )
  }
}



export default AlbumSearchContainer