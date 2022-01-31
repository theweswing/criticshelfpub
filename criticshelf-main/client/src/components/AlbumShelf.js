import {ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import AlbumShelfCard from "./AlbumShelfCard";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import Chip from '@mui/material/Chip';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import UpdateAlbum from "./UpdateAlbum";

function AlbumShelf({user,theme}){
    const [reviews,setReviews] = useState([])
    const [displayReviews,setDisplayReviews] = useState([])
    const [filter,setFilter] = useState("Organize By")
    const [viewOrganizers,setViewOrganizers]=useState(false)
    const [selectedMedia,setSelectedMedia] = useState(false)
    const [mediaInfo,setMediaInfo] = useState(false)

    function filterReviewDesc(e){
      setFilter("Newest -> Oldest Reviews")
      setViewOrganizers(false)
    }

    function filterReviewAsc(e){
      setFilter("Oldest -> Newest Reviews")
      setViewOrganizers(false)
    }

    function getReviewDate(reviewData){
      let rawDate = reviewData.updated_at
      let year = rawDate.slice(0,4)
      let month = rawDate.slice(5,7)
      let day = rawDate.slice(8,10)
      let date = `${month}-${day}-${year}`
      return date
    }

    function filterRatingDesc(e){
      setFilter("Rating 5 -> 1")
      setViewOrganizers(false)
    }

    function filterRatingAsc(e){
      setFilter("Rating 1 -> 5")
      setViewOrganizers(false)
    }

    function filterAlphabetDesc(e){
      setFilter("A-Z")
      setViewOrganizers(false)
    }

    function filterAlphabetAsc(e){
      setFilter("Z-A")
      setViewOrganizers(false)
    }

    function sortByFilter(reviews){
      if(filter=="Organize By"){
        return reviews
      }
      else if (filter=="A-Z"){
        console.log("it's A through Z filter")
        let byName = reviews.sort((a,b) => {
          if(a.artwork.name < b.artwork.name) { return -1; }
          if(a.artwork.name > b.artwork.name) { return 1; }
          return 0;
      })
      return byName
      }
      else if (filter=="Z-A"){
        console.log("it's Z through A filter")
        let byName = reviews.sort((a, b) => {
          if(a.artwork.name < b.artwork.name) { return 1; }
          if(a.artwork.name > b.artwork.name) { return -1; }
          return 0;
      })
      return byName
      }
      else if (filter=="Rating 1 -> 5"){
        console.log("it's by rating ascended")
        let byRating = reviews.sort((a, b) => {
          if(a.rating < b.rating) { return -1; }
          if(a.rating > b.rating) { return 1; }
          return 0;
      })
      console.log(byRating)
      return byRating
      }
      else if (filter=="Rating 5 -> 1"){
        console.log("it's by rating ascended")
        let byRating = reviews.sort((a, b) => {
          if(a.rating < b.rating) { return 1; }
          if(a.rating > b.rating) { return -1; }
          return 0;
      })
      return byRating
      }
      else if (filter=="Newest -> Oldest Reviews"){
        console.log("it's by newest to oldest review")
        let byReviewDate = reviews.sort((a, b) => {
          let reviewDateA = Date.parse(getReviewDate(a))
          let reviewDateB = Date.parse(getReviewDate(b))
          if(reviewDateA < reviewDateB) { return 1; }
          if(reviewDateA > reviewDateB) { return -1; }
          return 0;
      })
      return byReviewDate
      }
      else if (filter=="Oldest -> Newest Reviews"){
        console.log("it's by oldest to newest review")
        let byReviewDate = reviews.sort((a, b) => {
          let reviewDateA = Date.parse(getReviewDate(a))
          let reviewDateB = Date.parse(getReviewDate(b))
          if(reviewDateA < reviewDateB) { return -1; }
          if(reviewDateA > reviewDateB) { return 1; }
          return 0;
      })
      return byReviewDate
      }
    }

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
            }})}, [])

            function spawnAlbumCards(){
                let onlyAlbums = reviews.filter((givenReview) => {
                    return (givenReview.artwork.discipline_id===5)
                })
                if(onlyAlbums.length===0){
                  return(
                                <a href="/search/music">Add some music!</a>
                  )
                }
                let filtered = sortByFilter(onlyAlbums)
                let cards = filtered.map((givenReview) => {
                    return (<AlbumShelfCard setSelectedMedia={setSelectedMedia} setMediaInfo={setMediaInfo} reviewData={givenReview} key={givenReview.artwork.identifier} xs={2} lg={2.4}/>)}
                )
                return cards
            }

if(mediaInfo===false){
return (
    <ThemeProvider theme={theme}>
    {viewOrganizers ? 
      <Stack alignItems="center" justifyContent="center" direction="row" sx={{mt:2, mb: 2}} spacing={1}>
      <Chip label="x" variant="outlined" onClick={(e) => setViewOrganizers(false)} /> 
      <Chip icon={<ArrowDownwardIcon/>}label="Rating" variant="outlined" onClick={filterRatingDesc} />
      <Chip icon={<ArrowDownwardIcon/>}label="Alphabetical" variant="outlined" onClick={filterAlphabetDesc} />
      <Chip icon={<ArrowDownwardIcon/>}label="Review Date" variant="outlined" onClick={filterReviewDesc} />
      <Chip icon={<ArrowUpwardIcon/>}label="Review Date" variant="outlined" onClick={filterReviewAsc} />
      <Chip icon={<ArrowUpwardIcon/>}label="Alphabetical" variant="outlined" onClick={filterAlphabetAsc} />
      <Chip icon={<ArrowUpwardIcon/>}label="Rating" variant="outlined" onClick={filterRatingAsc} />
      </Stack>
      : 
      <Stack alignItems="center" justifyContent="center" direction="row" sx={{mt:2, mb: 2}} spacing={1}>
      <Chip label={filter} variant="outlined" onClick={(e) => setViewOrganizers(true)} />
      </Stack>}
    <Stack direction={{xs:"column", sm:"row"}} alignItems="stretch"  spacing={2} justifyContent="center">
    {spawnAlbumCards()}
  </Stack>
  <Grid container width="100%" justifyContent="center" sx={{mt:2}}>
  <Grid item component={Button} variant="contained" href="/myshelf">Return</Grid>
  </Grid>
  </ThemeProvider>
)
    }
else if(mediaInfo){
  return (
    <UpdateAlbum albumData={mediaInfo} user={user} />
  )
}
}

export default AlbumShelf