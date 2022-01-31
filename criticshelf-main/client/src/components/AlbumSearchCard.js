import React, { useState,useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Grid } from "@mui/material";


function AlbumSearchCard ({albumInfo, theme, handleAlbumSelect}) {
const [reviews,setReviews] = useState([])
const [albumDetails,setAlbumDetails] = useState(false)

useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=[key]&mbid=${albumInfo.mbid}&format=json`)
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((data) => {
          if (data) {
            setAlbumDetails(data.album)
            }
            })
        }})}, [albumInfo])

function albumPicture(details){
    if (details.image){
        if (details.image[4]){
            return details.image[4]["#text"]
        }
        else if (details.image[3]){
            return details.image[3]["#text"]
        }
        else if (details.image[0]){
            return details.image[0]["#text"]
        }
    }
    else {
        return ("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg")
    }
}

useEffect(() => {
  fetch(`/reviews`)
  .then((r) => {
    if (r.ok) {
      r.json()
      .then((data) => {
          let checkForReviews = data.filter((givenReview) => {
              return (givenReview.artwork.identifier==albumInfo.mbid)
          })
          setReviews(checkForReviews)
      })
      }})}, [albumInfo])

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

if (albumInfo && albumDetails) { 
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
    image={`${albumPicture(albumDetails)}`}
  alt={`${albumDetails.name} Cover`}
  />
  </Grid>
  <Grid xs={12} item component={Box} sx={{display: 'flex', flexDirection: 'column' }}>
  <CardHeader
              
              title={`${albumDetails.name}`}
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
      {albumDetails.artist}
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
                        value={albumInfo.mbid}
                        onClick={handleAlbumSelect}
                        >
                          Add To Shelf
                        </Grid>
  </Grid>
  
  </Card>
  )
          }
else {
  return (
    <Typography gutterBottom variant="h5" component="div">
          Loading...
        </Typography>
  )
}


}

export default AlbumSearchCard