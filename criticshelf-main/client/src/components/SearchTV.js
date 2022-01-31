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
import TVSearchContainer from "./TVSearchContainer";
import AddTV from "./AddTV";

function SearchTV({theme, searchedCategory, setSearchedCategory, user}) {

const [tvQuery, setTVQuery] = useState("Dune")
const [tvOptions,setTVOptions] = useState([])
const [tvResults,setTVResults] = useState([])
// const [tvLabels, setTVLabels] = useState([])
const [searched, setSearched] = useState(false)
const [selectedTV,setSelectedTV] = useState(false)
const [page,setPage] = useState("1")


function handleTVQuery(event,value){
    if (searchedCategory !== "TV"){
        setSearchedCategory("TV")
    }
    let input
    if (value.includes(" (")){
        let index = value.indexOf(" (")
        input = value.slice(0,index)
    }
    if (input !== tvQuery){
    setTVQuery(value)
    }
}

useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=[key]&language=en-US&query=${tvQuery}&page=${page}&include_adult=false`)
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((data) => {
          if (data.results) {
            setTVResults(data.results)
            let titles = data.results.map((givenItem) => {
              return (givenItem.name)
            })
            setTVOptions(titles)
            }
            })
        }})}, [tvQuery,page])

        function handleTVLabels(option) {
            let label = option
            for (const givenResult of tvResults){
                if (option===givenResult.name && givenResult.first_air_date){
                    label = (`${option} (${givenResult.first_air_date.slice(0,4)})`)
                }
            }
            return label
        }

function handleTVSubmit(e){
    setSearchedCategory("TV")
    e.preventDefault()
    setSearched(true)
}

function handleResetSearch(e){
    setSearched(false)
    setTVQuery("Dune")
    setTVResults([])
    setTVOptions([])
}

function handleResetSelection(e){
  setSelectedTV(false)
  setSearched(false)
  setTVQuery("Dune")
  setTVResults([])
  setTVOptions([])
}
if (searched===false && selectedTV===false) {
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
                  onSubmit={handleTVSubmit}
                >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[...tvOptions]}
          onInputChange={handleTVQuery}
          sx={{ width: 300 }}
          getOptionLabel={option => handleTVLabels(option)}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                {handleTVLabels(option)}
              </li>
            );
          }}
          renderInput={(params) => <TextField {...params} label="TV Shows" />}
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

if (searched===true && searchedCategory==="TV" && selectedTV===false){
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
              Results for {`${tvQuery}, Page ${page}`}
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
       
        <TVSearchContainer theme={theme} data={tvResults} setPage={setPage} page={page} selectedTV={selectedTV} setSelectedTV={setSelectedTV}/>
        </ThemeProvider>
        
    )
}
if (searched===true && searchedCategory==="TV" && selectedTV){
  return (
      <ThemeProvider theme={theme}>
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
                <AddTV id={selectedTV} user={user} />
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


export default SearchTV