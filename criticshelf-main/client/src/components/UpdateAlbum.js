import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField'
import { List } from "@mui/material";
import { ListItem } from "@mui/material";

function UpdateAlbum({albumData, user}) {
    console.log(albumData)
    const [albumInfo, setAlbumInfo] = useState(false)
    const [rating,setRating] = useState(2.5)
    const [review,setReview] = useState("It stinks! -Jay Sherman, The Critic")
    const [reviewDate,setReviewDate] = useState("")
    const [hasReviewed,setHasReviewed] = useState(false)
    const [submitted,setSubmitted] = useState(false)

    function getReviewDate(reviewData){
      let year = reviewData.slice(0,4)
      let month = reviewData.slice(5,7)
      let day = reviewData.slice(8,10)
      let date = `${month}-${day}-${year}`
      return date
    }
  

    useEffect(() => {
        fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=[key]&mbid=${albumData.identifier}&format=json`)
        .then((r) => {
          if (r.ok) {
            r.json()
            .then((data) => {
              if (data) {
                setAlbumInfo(data.album)
                console.log(albumInfo)
                }
                })
            }})}, [])

            useEffect(() => {
                fetch(`/users/${user.id}/reviews`)
                .then((r) => {
                  if (r.ok) {
                    r.json()
                    .then((data) => {
                        let checkForReview = data.map((givenReview) => {
                            if (givenReview.artwork.identifier === albumData.identifier){
                                setHasReviewed(givenReview)
                                setRating(givenReview.rating)
                                setReview(givenReview.review_text)
                                setReviewDate(givenReview.updated_at)
                            }
                        })
                    })
                    }})}, [albumInfo,submitted])



    function handleUpdate(e){
        e.preventDefault()
       let new_review = {
           id: hasReviewed.id,
           artwork_id: hasReviewed.artwork_id,
           user_id: hasReviewed.user_id,
           rating: rating,
           review_text: review
       } 
       fetch(`/reviews/${hasReviewed.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(new_review),
      }).then((res) => {
        if (res.ok) {
          res.json().then((reviewInDB) => {;
            setSubmitted(reviewInDB)
            e.target.reset()
          });
        } else {
          res.json().then((errors) => console.log(errors));
        }
      });
    }

    function handleRating(e){
        setRating(e.target.value)
    }

    function handleReview(e){
        setReview(e.target.value)
    }
    
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

    function spawnTracks(albumDetails){
      if (albumDetails.tracks.track) {
      let tracks = albumDetails.tracks.track
      let counter = 0
      let listedTracks = tracks.map((givenTrack) => {
        counter = counter+1
        return (
          <ListItem>
            <Typography variant="subtitle1" fontSize=".75vw">
            {`${counter}. ${givenTrack.name}`}
                        </Typography>
          </ListItem>
        )
      })
      return listedTracks
    }
    else {
      return (
        <Typography variant="body2" sx={{mt:1}} fontSize=".8vw">
                Loading...
              </Typography>
      )
    }
  }
    if (albumInfo) {
            return (
                <Grid container justifyContent="center">
            <Card sx={{width:"50vw", border: 1, borderColor: "black"}} >
            <CardHeader
                    xs = {12}
                                title={`${albumInfo.name}`}
                                subheader={`${albumInfo.artist}`}
                    subheaderTypographyProps={{color: "white"}}
                                style={{ textAlign: 'center' }}
                                sx={{
                                    color: "white",
                                    backgroundColor: "black",
                                    border: 1,
                                    borderColor: "#FFD700"
                                }}
                          >
                          </CardHeader>
                          <CardMedia
                      component="img"
                      height="100%"
                      width="100%"
                      sx={{ width: "20vw", height: "30vw", float:"right" }}
                      image={`${albumPicture(albumInfo)}`}
              alt={`${albumInfo.title} Cover`}
                    />
                      <CardContent sx={{ flex: '1 0 auto', width: "29vw", height:"14vw", mb:2}} style={{ textAlign: 'center' }}>
                      <Typography variant="subtitle1" fontSize=".75vw">
                        Track List:
                        </Typography>
                        <List dense={true} style={{overflow:"scroll"}} sx={{width:"28.6vw", height:"12vw"}}>
                          {spawnTracks(albumInfo)}
                        </List>
                      </CardContent>
                      <Box textAlign='center' component="form" onSubmit={handleUpdate}> 
                      <CardActions style={{justifyContent: 'center'}} sx={{alignItems: 'center', width:"29.8vw"}}>
                      <Grid container spacing={1} style={{ justifyContent: "center", textAlign:"center"}}>
                      <Rating label = "Rating" sx={{ mt: 1, mr: 1,}} name="half-rating" value={rating} precision={0.5} onChange={handleRating}/>
                      <TextField
                  id="filled-multiline-static"
                  label="Your Review"
                  multiline
                  rows={4}
                  fullWidth
                  value={review}
                  variant="filled"
                  onChange={handleReview}
        
                />
                <Grid item xs={12} component={Typography} variant="subtitle1" sx={{mt:1}} fontSize=".75vw" textAlign="center">
              {`Previous Review on: ${getReviewDate(reviewDate)}`}
          </Grid>
                   <Grid item component={Button}
                          type="submit"
                          variant="contained"
                          sx={{ mt: 1, mb: .1, color: "white", backgroundColor: "black" }}
                        >
                          Update Review
                        </Grid>
                </Grid>
                
              </CardActions>
                      </Box>
                    </Card>
                    </Grid>
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



export default UpdateAlbum
