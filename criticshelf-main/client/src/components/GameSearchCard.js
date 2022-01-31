import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Rating from '@mui/material/Rating';


function GameSearchCard ({gameInfo, theme, handleGameSelect}) {
const [reviews,setReviews]=useState([])

// function getPlatforms(gameInfo) {
//   let platforms = ""
//   let platformMap = gameInfo.parent_platforms.map((givenParentPlatform) => {
//     platforms = platforms + `${givenParentPlatform.platform.name}, `
//   })
//   let display = platforms.slice(0,-2)
//   return display
// }

function getYear(gameInfo) {
  if (gameInfo.released) {
  let release_date = gameInfo.released
  let year = release_date.slice(0,4)
  return year
  }
  else {
    return gameInfo.released
  }
}

useEffect(() => {
  fetch(`/reviews`)
  .then((r) => {
    if (r.ok) {
      r.json()
      .then((data) => {
          let checkForReviews = data.filter((givenReview) => {
              return (givenReview.artwork.identifier==gameInfo.id)
          })
          setReviews(checkForReviews)
      })
      }})}, [gameInfo])

      function parseReviewData(reviews){
        if (reviews.length>0){
          let numberOfReviews = reviews.length
          let cumulativeScore = 0
          for (const eachReview of reviews){
            cumulativeScore=cumulativeScore+eachReview.rating
          }
          let averageRating=parseFloat(cumulativeScore/numberOfReviews)
          return (
            <>
          <Rating label="Average Rating" name="half-rating-read" value={parseFloat(averageRating)} precision={0.5} readOnly />
          <Typography variant="subtitle1">Average Rating:</Typography>
          <Typography variant="subtitle1">{`${parseFloat(averageRating)} ☆ on ${numberOfReviews} reviews`}</Typography>
          </>
          )
        }
        else {
          return (
            <>
          <Rating label="Average Rating" name="half-rating-read" value={0} precision={0.5} readOnly />
          <Typography variant="subtitle1">No reviews yet!</Typography>
          </>
          )
        }
      }

    return (
      <Card sx={{ display: 'flex' }}>
            <Grid container 
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sx={{border: 2, borderColor: "black"}}>
  <Grid item xs={12} component={Box} sx={{ display: 'flex'}}>
  <CardMedia
    component="img"
    // height="100%"
    // width="100%"
    xs={12}
    sx={{ height: 470}}
    image={`${gameInfo.background_image}`}
  alt={`${gameInfo.name} Screenshot`}
  />
  </Grid>
  <Grid xs={12} item component={Box} sx={{display: 'flex', flexDirection: 'column' }}>
  <CardHeader
              
              title={`${gameInfo.name}`}
              // style={{ textAlign: 'center' }}
              sx={{
                  color: "white",
                  // backgroundColor: "blue",
                  backgroundColor: "black",
                  border: 1, borderColor: "#black",
                  // height: 60
              }}
        >
        </CardHeader>
    <CardContent sx={{ flex: '1 0 auto' }} 
    // style={{ textAlign: 'center' }}
    >
      <Typography component="div" variant="h6">
      {getYear(gameInfo)}
      </Typography>
      {parseReviewData(reviews)}
    </CardContent>
    </Grid>
    <Grid item xs={12} component={Button}
                          variant="contained"
                          sx={{
                            color: "white",
                            // backgroundColor: "blue"
                            backgroundColor: "black",
                            border: 1, borderColor: "#FFD700"
                        }}
                        value={gameInfo.id}
                        onClick={handleGameSelect}
                        >
                          Add To Shelf
                        </Grid>
  </Grid>
  
  </Card>
  )


}

export default GameSearchCard