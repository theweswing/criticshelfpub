import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {ThemeProvider } from "@mui/material/styles";
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import Button from "@mui/material/Button";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import GameSearchContainer from "./GameSearchContainer";
import { Typography } from "@mui/material";
import AddGame from "./AddGame";

function SearchGames({theme, searchedCategory, setSearchedCategory, user}) {

const [gameQuery, setGameQuery] = useState("Dune")
const [gameOptions,setGameOptions] = useState([])
const [gameResults,setGameResults] = useState([])
const [searched, setSearched] = useState(false)
const [selectedGame,setSelectedGame] = useState(false)
const [page,setPage] = useState("1")


function handleSearchCheckBox(e){
    setSearchedCategory(e.target.value)
  }
  

function handleGameQuery(event,value){
  if (searchedCategory !== "Video Games"){
    setSearchedCategory("Video Games")
  }
    setGameQuery(value)
}

useEffect(() => {
    fetch(`https://rawg.io/api/games?search=${gameQuery}&page=${page}&page_size=10&key=[key]`)
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((data) => {
          if (data.results) {
            setGameResults(data.results)
            let titles = data.results.map((givenItem) => {
              return (givenItem.name)
            })
            setGameOptions(titles)
            }
            })
        }})}, [gameQuery,page])

function handleGameLabels(option) {
    let label = option
    for (const givenResult of gameResults){
        if (option===givenResult.name && givenResult.released){
            label = (`${option} (${givenResult.released.slice(0,4)})`)
        }
    }
    return label
}

function handleGameSubmit(e){
    e.preventDefault()
    setSearchedCategory("Video Games")
    setSearched(true)
}

function handleResetSearch(e){
    setSearched(false)
    setGameQuery("Dune")
    setGameResults([])
    setGameOptions([])
}

function handleResetSelection(e){
  setSelectedGame(false)
  setSearched(false)
  setGameQuery("Dune")
  setGameResults([])
  setGameOptions([])
}
if (searched===false && selectedGame===false) {
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
                  onSubmit={handleGameSubmit}
                >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[...gameOptions]}
          onInputChange={handleGameQuery}
          sx={{ width: 300 }}
          getOptionLabel={option => handleGameLabels(option)}
          renderInput={(params) => <TextField {...params} label="Video Game" />}
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
                          onClick={handleSearchCheckBox}
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
                          onClick={handleSearchCheckBox}
                          href="/search/books"
                          sx={{ mt: 1, mb: 2 }}
                        >
                          Books
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

if (searched===true && searchedCategory==="Video Games" && selectedGame===false){
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
              Results for {`${gameQuery}, Page ${page}`}
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
       
        <GameSearchContainer selectedGame={selectedGame} setSelectedGame={setSelectedGame} searchedCategory={searchedCategory} theme={theme} data={gameResults} setPage={setPage} page={page}/>
        </ThemeProvider>
        
    )
}
if (searched===true && searchedCategory==="Video Games" && selectedGame){
  return (
      <ThemeProvider theme={theme}>
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
                <AddGame id={selectedGame} user={user} />
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


export default SearchGames