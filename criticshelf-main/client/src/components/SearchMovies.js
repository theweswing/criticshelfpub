import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {ThemeProvider } from "@mui/material/styles";
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import Button from "@mui/material/Button";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MovieSearchContainer from "./MovieSearchContainer";
import { Typography } from "@mui/material";
import AddMovie from "./AddMovie";

function SearchMovies({theme, searchedCategory, setSearchedCategory, user}) {

const [movieQuery, setMovieQuery] = useState("Dune")
const [movieOptions,setMovieOptions] = useState([])
const [movieResults,setMovieResults] = useState([])
const [searched, setSearched] = useState(false)
const [selectedMovie,setSelectedMovie] = useState(false)
const [page,setPage] = useState("1")


function handleMovieQuery(event,value){
    if (searchedCategory !== "Movies"){
        setSearchedCategory("Movies")
    }
    let input
    if (value.includes(" (")){
        let index = value.indexOf(" (")
        input = value.slice(0,index)
    }
    if (input !== movieQuery){
    setMovieQuery(value)
    }
}

useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=[key]&language=en-US&query=${movieQuery}&page=${page}&include_adult=false`)
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((data) => {
          if (data.results) {
            setMovieResults(data.results)
            let titles = data.results.map((givenItem) => {
              return (givenItem.title)
            })
            setMovieOptions(titles)
            }
            })
        }})}, [movieQuery,page])

        function handleMovieLabels(option) {
            let label = option
            for (const givenResult of movieResults){
                if (option===givenResult.title && givenResult.release_date){
                    label = (`${option} (${givenResult.release_date.slice(0,4)})`)
                }
            }
            return label
        }

function handleMovieSubmit(e){
    setSearchedCategory("Movies")
    e.preventDefault()
    setSearched(true)
}

function handleResetSearch(e){
    setSearched(false)
    setMovieQuery("Dune")
    setMovieResults([])
    setMovieOptions([])
}

function handleResetSelection(e){
  setSelectedMovie(false)
  setSearched(false)
  setMovieQuery("Dune")
  setMovieResults([])
  setMovieOptions([])
}
if (searched===false && selectedMovie===false) {
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
                  onSubmit={handleMovieSubmit}
                >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[...movieOptions]}
          onInputChange={handleMovieQuery}
          sx={{ width: 300 }}
          getOptionLabel={option => handleMovieLabels(option)}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {handleMovieLabels(option)}
              </li>
            );
          }}
          renderInput={(params) => <TextField {...params} label="Movies" />}
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
                          href="/search/books"
                          sx={{ mt: 1, mb: 2 }}
                        >
                          Books
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

if (searched===true && searchedCategory==="Movies" && selectedMovie===false){
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
              Results for {`${movieQuery}, Page ${page}`}
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
       
        <MovieSearchContainer theme={theme} data={movieResults} setPage={setPage} page={page} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie}/>
        </ThemeProvider>
        
    )
}
if (searched===true && searchedCategory==="Movies" && selectedMovie){
  return (
      <ThemeProvider theme={theme}>
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
                <AddMovie id={selectedMovie} user={user} />
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


export default SearchMovies