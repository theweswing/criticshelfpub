import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Grid } from "@mui/material";


function TVSearchCard ({tvInfo, theme, handleTVSelect}) {
const [reviews,setReviews] = useState([])

function getYear(tvInfo) {
  if (tvInfo.first_air_date) {
  let first_air_date = tvInfo.first_air_date
  let year = first_air_date.slice(0,4)
  return year
  }
  else {
    return tvInfo.first_air_date
  }
}

// function shortSummary(tvInfo) {
//   if (tvInfo.overview) {
//   let splitSummary = tvInfo.overview.split(" ")
//   let shortenedSummary = splitSummary.slice(0,15)
//   let summary = shortenedSummary.join(" ")
//   return (summary + "...")
//   }
//   else {
//     return tvInfo.overview
//   }
// }

useEffect(() => {
  fetch(`/reviews`)
  .then((r) => {
    if (r.ok) {
      r.json()
      .then((data) => {
        console.log(data)
        console.log(tvInfo.id)
          let checkForReviews = data.filter((givenReview) => {
              return (givenReview.artwork.identifier==tvInfo.id)
          })
          setReviews(checkForReviews)
          console.log(checkForReviews)
      })
      }})}, [tvInfo])

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
    xs={12}
    sx={{ height: 470}}
    image={"https://image.tmdb.org/t/p/w500" + `${tvInfo.poster_path}`}
  alt={`${tvInfo.name} Poster`}
  />
  </Grid>
  <Grid xs={12} item component={Box} sx={{display: 'flex', flexDirection: 'column' }}>
  <CardHeader
              
              title={`${tvInfo.name}`}
              style={{ textAlign: 'center' }}
              sx={{
                  color: "white",
                  backgroundColor: "black",
                  border: 1, borderColor: "#black",
              }}
        >
        </CardHeader>
    <CardContent sx={{ flex: '1 0 auto' }} style={{ textAlign: 'center' }}>
      <Typography component="div" variant="h6">
      {getYear(tvInfo)}
      </Typography>
      {parseReviewData(reviews)}
    </CardContent>
    </Grid>
    <Grid item xs={12} component={Button}
                          variant="contained"
                          sx={{
                            color: "white",
                            backgroundColor: "black",
                            border: 1, borderColor: "#FFD700"
                        }}
                        value={tvInfo.id}
                        onClick={handleTVSelect}
                        >
                          Add To Shelf
                        </Grid>
  </Grid>
  
  </Card>
  )

}

export default TVSearchCard