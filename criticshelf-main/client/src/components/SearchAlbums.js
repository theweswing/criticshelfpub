import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {ThemeProvider } from "@mui/material/styles";
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import Button from "@mui/material/Button";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { Typography } from "@mui/material";
import AlbumSearchContainer from "./AlbumSearchContainer";
import AddAlbum from "./AddAlbum";

function SearchAlbums({theme, searchedCategory, setSearchedCategory, user}) {

const [albumQuery, setAlbumQuery] = useState("Abbey Road")
const [albumOptions,setAlbumOptions] = useState([])
const [albumResults,setAlbumResults] = useState([])
const [searched, setSearched] = useState(false)
const [selectedAlbum,setSelectedAlbum] = useState(false)
const [page,setPage] = useState("1")

  function handleAlbumQuery(event,value){
    if (searchedCategory !== "Albums"){
        setSearchedCategory("Albums")
    }
    let input
    if (value.includes(" // ")){
        let index = value.indexOf(" // ")
        input = value.slice(0,index)
        console.log(`input: ${input}`)
    }
    if (input !== albumQuery){
    setAlbumQuery(value)
    }

}

useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumQuery}&limit=10&page=${page}&api_key=[key]&format=json`)
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((data) => {
          if (data.results.albummatches) {
            setAlbumResults(data.results.albummatches.album)
            if (data.results.albummatches.album) {
            let titles = [...albumResults].map((givenItem) => {
              return (givenItem.name)
            })
            setAlbumOptions(titles)
        }
            
            
            }
            })
        }})}, [albumQuery,page])

        function handleAlbumLabels(option) {
            let label = option
            for (const givenResult of albumResults){
                if (option===givenResult.name && givenResult.artist){
                    label = (`${option} // (${givenResult.artist})`)
                }
            }
            return label
        
        }

function handleAlbumSubmit(e){
    setSearchedCategory("Albums")
    e.preventDefault()
    setSearched(true)
}

function handleResetSearch(e){
    setSearched(false)
    setAlbumQuery("Dune")
    setAlbumResults([])
    setAlbumOptions([])
}

function handleResetSelection(e){
  setSelectedAlbum(false)
  setSearched(false)
  setAlbumQuery("Dune")
  setAlbumResults([])
  setAlbumOptions([])
}
if (searched===false && selectedAlbum===false) {
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
                  onSubmit={handleAlbumSubmit}
                >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[...albumOptions]}
          onInputChange={handleAlbumQuery}
          sx={{ width: 300 }}
          getOptionLabel={option => handleAlbumLabels(option)}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.mbid}>
                {handleAlbumLabels(option)}
              </li>
            );
          }}
          renderInput={(params) => <TextField {...params} label="Albums" />}
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
              </List>
            </FormGroup>
            </Box>
            </ThemeProvider>
        )
                }

if (searched===true && searchedCategory==="Albums" && selectedAlbum===false){
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
              Results for {`${albumQuery}, Page ${page}`}
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
       
        <AlbumSearchContainer theme={theme} data={albumResults} setPage={setPage} page={page} selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum}/>
        </ThemeProvider>
        
    )
}
if (searched===true && searchedCategory==="Albums" && selectedAlbum){
  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        marginTop: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
          <AddAlbum id={selectedAlbum} user={user} />
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


export default SearchAlbums