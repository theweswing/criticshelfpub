
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {ThemeProvider } from "@mui/material/styles";
import BookSearchCard from "./BookSearchCard";


function BookSearchContainer ({data, theme, setPage, page, searchedCategory, setSelectedBook, selectedBook}) {

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

    function handleBookSelect(e){
      setSelectedBook(e.target.value)
    }

  const spawnBookCards = data.map((givenBook) => {
      let counter = 0
    if (counter <= parseInt(page)*10) {
        counter=counter+1
        return (
          <Grid item xs={12} sm={5} md={5} lg={3}  sx={{ mt: 3, mr: 5, display:"flex",}} key={givenBook.id} align="center">
          <BookSearchCard bookInfo={givenBook} key={givenBook.id} handleBookSelect={handleBookSelect}/>
          </Grid>
        )}
      })

    // function makeBookCards(data){
    //     let counter = 0
    //     const bookCards = data.map((givenBook) => {
    //     if (counter <= parseInt(page)*10) {
    //         counter=counter+1
    //         return (
    //             <Grid item xs={3} sx={{ mt: 3, mr: 5 }} key={givenBook.id} align="center">
    //             <BookSearchCard bookInfo={givenBook} />
    //             </Grid>
    //           )}
    //         })
    //         return bookCards
    //   }
    
    if (data) {
      return (
        <ThemeProvider theme={theme}>
            <Grid container 
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="stretch">
            {spawnBookCards}
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
  //   return (
  //   <ThemeProvider theme={theme}>
  //     <Box
  //     container
  //     noValidate
  //     sx={{ mt: 2, display: 'flex', }}
  //     style={{ justifyContent: "center"}}
  //   >
  //       <Grid container spacing={3} style={{ justifyContent: "center"}}>
  //     {spawnBookCards}
  //     </Grid>
  //     </Box>
  //   {/* <Box
  //     container
  //     noValidate
  //     sx={{ mt: 3, display: 'flex', }}
  //     style={{ justifyContent: "center"}}
  //   >
  //   <Button
  //                     variant="contained"
  //                     onClick={handlePreviousPage}
  //                     sx={{ mt: 3, mb: 2, mr: 1}}
  //                   >
  //                     Previous Page
  //                   </Button>
  //     <Button
  //                     variant="contained"
  //                     onClick={handleNextPage}
  //                     sx={{ mt: 3, mb: 2, ml: 1 }}
  //                   >
  //                     Next Page
  //                   </Button>
  //                   </Box> */}
  // </ThemeProvider>
  //   )
                  }
  else {
    return (
      <Typography gutterBottom variant="h5" component="div">
          Loading...
        </Typography>
    )
  }
}



export default BookSearchContainer