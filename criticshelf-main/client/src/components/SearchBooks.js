import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {ThemeProvider } from "@mui/material/styles";
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import Button from "@mui/material/Button";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import BookSearchContainer from "./BookSearchContainer";
import { Typography } from "@mui/material";
import AddBook from "./AddBook";

function SearchBooks({theme, searchedCategory, setSearchedCategory, user}) {

const [bookQuery, setBookQuery] = useState("Dune")
const [bookOptions,setBookOptions] = useState([])
const [bookResults,setBookResults] = useState([])
const [searched, setSearched] = useState(false)
const [selectedBook,setSelectedBook] = useState(false)
const [page,setPage] = useState("1")


function handleBookQuery(event,value){
    if (searchedCategory !== "Books"){
        setSearchedCategory("Books")
    }
    let input
    if (value.includes(" // ")){
        let index = value.indexOf(" // ")
        input = value.slice(0,index)
    }
    if (input !== bookQuery){
    setBookQuery(value)
    }
}

useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookQuery}&key=[key]`)
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((data) => {
          if (data.items) {
            setBookResults(data.items)
            let titles = data.items.map((givenItem) => {
              return (givenItem.volumeInfo.title)
            })
            setBookOptions(titles)
            }
            })
        }})}, [bookQuery])

        function handleBookLabels(option) {
            let label = option
            for (const givenResult of bookResults){
                if (option===givenResult.volumeInfo.title && givenResult.volumeInfo.authors){
                    label = (`${option} // (${givenResult.volumeInfo.authors[0]})`)
                }
            }
            return label
        }

function handleBookSubmit(e){
    setSearchedCategory("Books")
    e.preventDefault()
    setSearched(true)
}

function handleResetSearch(e){
    setSearched(false)
    setBookQuery("Dune")
    setBookResults([])
    setBookOptions([])
}

function handleResetSelection(e){
    setSelectedBook(false)
    setSearched(false)
    setBookQuery("Dune")
    setBookResults([])
    setBookOptions([])
}
if (searched===false && selectedBook===false) {
        return (
            <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  component="form"
                  onSubmit={handleBookSubmit}
                >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[...bookOptions]}
          onInputChange={handleBookQuery}
          sx={{ width: 300 }}
          getOptionLabel={option => handleBookLabels(option)}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {handleBookLabels(option)}
              </li>
            );
          }}
          renderInput={(params) => <TextField {...params} label="Books" />}
        />
        
    <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 1, mb: 2 }}
                        >
                          Search
                        </Button>
            <FormGroup>
            <Typography component="div" variant="h7" align="center" sx={{mt:2}}>
      Or search for...
    </Typography>
            <List sx={{display: "flex"}}>
              <ListItem>
              <Button
                          variant="contained"
                          value="Books"
                          label="Books"
                          href="/search/movies"
                          sx={{ mt: 1, mb: 2 }}
                        >
                          Movies
                        </Button>
              </ListItem>
              <ListItem>
              <Button
                          variant="contained"
                          value="Video Games"
                          label="Video Games"
                          href="/search/games"
                          sx={{ mt: 1, mb: 2 }}
                        >
                          Games
                        </Button>
                        </ListItem>
                        <ListItem>
                        <Button
                          variant="contained"
                          value="TV"
                          label="TV"
                          href="/search/TV"
                          sx={{ mt: 1, mb: 2 }}
                        >
                          TV
                        </Button>
                        </ListItem>
                        <ListItem>
                        <Button
                          variant="contained"
                          value="Music"
                          label="Music"
                          href="/search/music"
                          sx={{ mt: 1, mb: 2 }}
                        >
                          Music
                        </Button>

              </ListItem>
              </List>
            </FormGroup>
            
            </Box>
            </ThemeProvider>
        )
                }

if (searched===true && searchedCategory==="Books" && selectedBook===false){
    return (
        <ThemeProvider theme={theme}>
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
                 <Typography variant="h5" component="div">
              Results for {`${bookQuery}, Page ${page}`}
            </Typography>
        <Button
                      type="submit"
                      variant="contained"
                      onClick={handleResetSearch}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Reset
                    </Button>
        </Box>
       
        <BookSearchContainer theme={theme} data={bookResults} setPage={setPage} page={page} setSelectedBook={setSelectedBook} selectedBook={selectedBook}/>
        </ThemeProvider>
        
    )
}
if (searched===true && searchedCategory==="Books" && selectedBook){
    return (
        <ThemeProvider theme={theme}>
            <Box
              sx={{
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
                  <AddBook id={selectedBook} user={user} />
                  <Button
                      type="submit"
                      variant="contained"
                      onClick={handleResetSelection}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Reset
                    </Button>
              </Box>
        </ThemeProvider>
        
    )
}
}


export default SearchBooks