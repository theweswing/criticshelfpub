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

function UpdateGame({gameData, user}) {
    const [gameInfo, setGameInfo] = useState(false)
    const [rating,setRating] = useState(2.5)
    const [review,setReview] = useState("It stinks! -Jay Sherman, The Critic")
    const [hasReviewed,setHasReviewed] = useState(false)
    const [submitted,setSubmitted] = useState(false)
    const [reviewDate,setReviewDate] = useState("")
    
    function getReviewDate(reviewData){
      let year = reviewData.slice(0,4)
      let month = reviewData.slice(5,7)
      let day = reviewData.slice(8,10)
      let date = `${month}-${day}-${year}`
      return date
    }

    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${gameData.id}?key=[key]`)
        .then((r) => {
          if (r.ok) {
            r.json()
            .then((data) => {
              if (data) {
                setGameInfo(data)
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
                            if (givenReview.artwork.identifier == gameData.id){
                                setHasReviewed(givenReview)
                                setRating(givenReview.rating)
                                setReview(givenReview.review_text)
                                setReviewDate(givenReview.updated_at)
                            }
                        })
                    })
                    }})}, [gameInfo,submitted])


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
          res.json().then((reviewInDB) => {
            setSubmitted(reviewInDB);
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
    
    function gamePicture(gameInfo){
        if (gameInfo.background_image){
            return gameInfo.background_image
        }
        else {
            return ("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg")
        }
    }

      function cleanUpSummary(summary){
          let noBold = summary.replaceAll("<b>","")
          let noBoldClose = noBold.replaceAll("</b>","")
          let noItalic = noBoldClose.replaceAll("<i>","")
          let noItalicClose = noItalic.replaceAll("</i>","")
          let noP = noItalicClose.replaceAll("<p>","")
          let noPClose = noP.replaceAll("</p>","")
          let noBR = noPClose.replaceAll("<br>","-")
          let noBRClose = noBR.replaceAll("</br>","")
          let moreClean = noBRClose.replaceAll("<br />","")
          let wowWhat = moreClean.replaceAll("&#39;","'")
          return wowWhat
      }

      function shortSummary(gameInfo) {
        if (gameInfo.description) {
        let splitSummary = gameInfo.description.split(" ")
        let shortenedSummary = splitSummary.slice(0,100)
        let summary = shortenedSummary.join(" ")
        let cleanSummary = cleanUpSummary(summary)
        return (cleanSummary + "...")
        }
        else {
          return gameInfo.description
        }
      }
    if (gameInfo) {
            return (
                <Grid container justifyContent="center">
            <Card sx={{width:"50vw", border: 1, borderColor: "black"}} >
            <CardHeader
                    xs = {12}
                                title={`${gameInfo.name}`}
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
                      image={`${gamePicture(gameInfo)}`}
              alt={`${gameInfo.name} Cover`}
                    />
                      <CardContent sx={{ flex: '1 0 auto' }} style={{ textAlign: 'center' }}>
                      <Typography component="div" variant="h5">
                  {getYear(gameInfo)}
                </Typography>
                        <Typography component="div" variant="h7">
                          {shortSummary(gameInfo)}
                        </Typography>
                      </CardContent>
                      <Box textAlign='center' component="form" onSubmit={handleUpdate}> 
                      <CardActions style={{justifyContent: 'center'}} sx={{alignItems: 'center', width:"29.8vw"}}>
                      <Grid container spacing={1} style={{ justifyContent: "center"}}>
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



export default UpdateGame
