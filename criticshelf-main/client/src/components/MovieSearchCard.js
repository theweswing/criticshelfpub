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


function MovieSearchCard ({movieInfo, theme, handleMovieSelect}) {
const [reviews,setReviews] = useState([])

function getYear(movieInfo) {
  if (movieInfo.release_date) {
  let release_date = movieInfo.release_date
  let year = release_date.slice(0,4)
  return year
  }
  else {
    return movieInfo.release_date
  }
}

// function shortSummary(movieInfo) {
//   if (movieInfo.overview) {
//   let splitSummary = movieInfo.overview.split(" ")
//   let shortenedSummary = splitSummary.slice(0,15)
//   let summary = shortenedSummary.join(" ")
//   return (summary + "...")
//   }
//   else {
//     return movieInfo.overview
//   }
// }

useEffect(() => {
  fetch(`/reviews`)
  .then((r) => {
    if (r.ok) {
      r.json()
      .then((data) => {
          let checkForReviews = data.filter((givenReview) => {
              return (givenReview.artwork.identifier==movieInfo.id)
          })
          setReviews(checkForReviews)
      })
      }})}, [movieInfo])

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
image={"https://image.tmdb.org/t/p/w500" + `${movieInfo.poster_path}`}
alt={`Poster for ${movieInfo.title} (${getYear(movieInfo)}) not found.`}
/>
</Grid>
<Grid xs={12} item component={Box} sx={{display: 'flex', flexDirection: 'column' }}>
<CardHeader
          
          title={`${movieInfo.title}`}
          style={{ textAlign: 'center' }}
          sx={{
              color: "white",
              // backgroundColor: "blue",
              backgroundColor: "black",
              border: 1, borderColor: "#black",
              // height: 60
          }}
    >
    </CardHeader>
<CardContent sx={{ flex: '1 0 auto' }} style={{ textAlign: 'center' }}>
  <Typography component="div" variant="h6">
    {getYear(movieInfo)}
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
                    value={movieInfo.id}
                    onClick={handleMovieSelect}
                    >
                      Add To Shelf
                    </Grid>
</Grid>

</Card>
)


}

export default MovieSearchCard

// return (
//   <Card sx={{ display: 'flex' }}>
// <Box sx={{ display: 'flex', flexDirection: 'column' }}>
// <CardHeader
// xs = {12}
//       title={`${bookInfo.volumeInfo.title}`}
//       style={{ textAlign: 'center' }}
//       sx={{
//           color: "white",
//           backgroundColor: "green"
//       }}
// >
// </CardHeader>
// <CardContent sx={{ flex: '1 0 auto' }} style={{ textAlign: 'center' }}>
// <Typography component="div" variant="h5" sx={{pb: 1}}>
// {bookInfo.volumeInfo.authors[0]}
// </Typography>
// <Typography component="div" variant="h5">
// {getYear(bookInfo)}
// </Typography>
// </CardContent>
// <Box sx={{ display: 'flex', alignItems: 'center'}}>
// </Box>
// </Box>
// <CardMedia
// component="img"
// height="100%"
// width="100%"
// sx={{ width: 201, height: 302 }}
// image={`${bookPicture(bookInfo.volumeInfo)}`}
// alt={`${bookInfo.volumeInfo.title} Cover`}
// />
// </Card>
// )