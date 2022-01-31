import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import BookShelfCard from "./BookShelfCard";
import GameShelfCard from "./GameShelfCard";
import MovieShelfCard from "./MovieShelfCard";
import TVShelfCard from "./TVShelfCard";
import AlbumShelfCard from "./AlbumShelfCard";
import { Stack } from "@mui/material";
import UpdateMovie from "./UpdateMovie";
import UpdateBook from "./UpdateBook";
import UpdateTV from "./UpdateTV";
import UpdateAlbum from "./UpdateAlbum";
import UpdateGame from "./UpdateGame";


function MyShelf({user,theme}) {
    const [reviews,setReviews] = useState([])
    const [displayReviews,setDisplayReviews] = useState([])
    const [filters,setFilters] = useState("")
    const [selectedMedia,setSelectedMedia] = useState(false)
    const [mediaInfo,setMediaInfo] = useState(false)

    useEffect(() => {
        fetch(`/users/${user.id}/reviews`)
        .then((r) => {
          if (r.ok) {
            r.json()
            .then((data) => {
              if (data) {
                setReviews(data)
                setDisplayReviews(data)
                }
                })
            }})}, [filters])

    function spawnMovieCards(){
        let onlyMovies = reviews.filter((givenReview) => {
            return (givenReview.artwork.discipline_id===1)
        })
        if(onlyMovies.length===0){
          return(
                        <a href="/search/movies">Add some movies!</a>
          )
        }
        let counter = 1
        let mostRecentFirst = onlyMovies.reverse()
        let cards = mostRecentFirst.map((givenReview) => {
          if(counter<=5){
            counter=counter+1
            return (<MovieShelfCard setSelectedMedia={setSelectedMedia} setMediaInfo={setMediaInfo} reviewData={givenReview} key={givenReview.artwork.identifier} xs={2} lg={2.4}/>)}
        })
        return cards
    }

    function spawnBookCards(){
        let onlyBooks = reviews.filter((givenReview) => {
            return (givenReview.artwork.discipline_id===2)
        })
        if(onlyBooks.length===0){
          return(
                        <a href="/search/books">Add some books!</a>
          )
        }
        let counter = 1
        let mostRecentFirst = onlyBooks.reverse()
        let cards = mostRecentFirst.map((givenReview) => {
          if(counter<=5){
            counter=counter+1
            return (<BookShelfCard setSelectedMedia={setSelectedMedia} setMediaInfo={setMediaInfo} reviewData={givenReview} key={givenReview.artwork.identifier} xs={2} lg={2.4}/>)}
        })
        return cards
    }

    function spawnGameCards(){
        let onlyGames = reviews.filter((givenReview) => {
            return (givenReview.artwork.discipline_id===3)
        })
        if(onlyGames.length===0){
          return(
                        <a href="/search/games">Add some games!</a>
          )
        }
        let counter = 1
        let mostRecentFirst = onlyGames.reverse()
        let cards = mostRecentFirst.map((givenReview) => {
          if(counter<=5){
            counter=counter+1
            return (<GameShelfCard setSelectedMedia={setSelectedMedia} setMediaInfo={setMediaInfo} reviewData={givenReview} key={givenReview.artwork.identifier} xs={2} lg={2.4}/>)}
        })
        return cards
    }

    function spawnTVCards(){
        let onlyTV = reviews.filter((givenReview) => {
            return (givenReview.artwork.discipline_id===4)
        })
        if(onlyTV.length===0){
          return(
                        <a href="/search/TV">Add some TV!</a>
          )
        }
        let counter = 1
        let mostRecentFirst = onlyTV.reverse()
        let cards = mostRecentFirst.map((givenReview) => {
          if(counter<=5){
            counter=counter+1
            return (<TVShelfCard setSelectedMedia={setSelectedMedia} setMediaInfo={setMediaInfo} reviewData={givenReview} key={givenReview.artwork.identifier} xs={2} lg={2.4}/>)}
        })
        return cards
    }

    function spawnAlbumCards(){
        let onlyAlbums = reviews.filter((givenReview) => {
            return (givenReview.artwork.discipline_id===5)
        })
        if(onlyAlbums.length===0){
          return(
                        <a href="/search/music">Add some music!</a>
          )
        }
        let counter = 1
        let mostRecentFirst = onlyAlbums.reverse()
        let cards = mostRecentFirst.map((givenReview) => {
          if(counter<=5){
            counter=counter+1
            return (<AlbumShelfCard setSelectedMedia={setSelectedMedia} setMediaInfo={setMediaInfo} reviewData={givenReview} key={givenReview.artwork.identifier} xs={2} lg={2.4}/>)}
        })
        return cards
    }

    
            if (reviews && selectedMedia==false) {
    return (
      <ThemeProvider theme={theme}>
        <Typography textAlign="center" sx={{mt:2, mb: 2}}>
              MY SHELF:
            </Typography>
        <Grid container spacing={2} style={{ justifyContent: "center", direction: "column", alignItems:"center"}}>
          <Grid item component ={Box} xs={12}>
          <Button variant="contained" href="/myshelf/movies" fullWidth  sx={{mb:2, border: 1, borderColor: "#FFD700"}} >Movies</Button>
            <Stack direction={{xs:"column", sm:"row"}} alignItems="stretch"  spacing={2} justifyContent="center">
              {spawnMovieCards()}
            </Stack>
          </Grid>
          <Grid item component ={Box} xs={12}>
          <Button variant="contained" href="/myshelf/books" fullWidth  sx={{mb:2, border: 1, borderColor: "#FFD700"}} >Books</Button>
            <Stack direction={{xs:"column", sm:"row"}} spacing={2} justifyContent="center">
              {spawnBookCards()}
            </Stack>
          </Grid>
          <Grid item component ={Box} xs={12}>
          <Button variant="contained" href="/myshelf/tv" fullWidth  sx={{mb:2, border: 1, borderColor: "#FFD700"}} >Television</Button>
            <Stack direction={{xs:"column", sm:"row"}} spacing={2} justifyContent="center">
              {spawnTVCards()}
            </Stack>
          </Grid>
          <Grid item component ={Box} xs={12}>
          <Button variant="contained" href="/myshelf/music" fullWidth  sx={{mb:2, border: 1, borderColor: "#FFD700"}} >Music</Button>
            <Stack direction={{xs:"column", sm:"row"}} spacing={2} justifyContent="center">
              {spawnAlbumCards()}
            </Stack>
          </Grid>
          <Grid item component ={Box} xs={12}>
          <Button variant="contained" href="/myshelf/games" fullWidth  sx={{mb:1, border: 1, borderColor: "#FFD700"}} >Video Games</Button>
            <Stack direction={{xs:"column", sm:"row"}} spacing={2} justifyContent="center">
              {spawnGameCards()}
            </Stack>
          </Grid>
          </Grid>
    
      </ThemeProvider>
    )
}
else if (reviews && selectedMedia=="Movie") {
  return (
  <UpdateMovie movieData={mediaInfo} user={user} />
  )
}
else if (reviews && selectedMedia=="TV") {
  return (
    <UpdateTV tvData={mediaInfo} user={user} />
  )
}
else if (reviews && selectedMedia=="Game") {
  return (
  <UpdateGame gameData={mediaInfo} user={user} />
  )
}
else if (reviews && selectedMedia=="Album") {
  return (
    <UpdateAlbum albumData={mediaInfo} user={user} />
  )
}
else if (reviews && selectedMedia=="Book") {
  return (
    <UpdateBook bookData={mediaInfo} user={user} />
  )
}
}

export default MyShelf