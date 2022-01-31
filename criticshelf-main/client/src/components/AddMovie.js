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

function AddMovie({id, user}) {
    const [movieInfo, setMovieInfo] = useState(false)
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
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=[key]`)
        .then((r) => {
          if (r.ok) {
            r.json()
            .then((data) => {
              if (data) {
                setMovieInfo(data)
                }
                })
            }})}, [id])

            useEffect(() => {
                fetch(`/users/${user.id}/reviews`)
                .then((r) => {
                  if (r.ok) {
                    r.json()
                    .then((data) => {
                        let checkForReview = data.map((givenReview) => {
                            if (givenReview.artwork.identifier === id){
                                setHasReviewed(givenReview)
                                setRating(givenReview.rating)
                                setReview(givenReview.review_text)
                                setReviewDate(givenReview.updated_at)
                            }
                        })
                    })
                    }})}, [id,movieInfo,submitted])

    function handleSubmit(e){
        e.preventDefault()
        let identifier = id
        let title = movieInfo.title
        let discipline = 1
        submitArtwork(discipline,identifier,title,rating,review,user,e)
    }

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
            setSubmitted(reviewInDB)
            e.target.reset()
          });
        } else {
          res.json().then((errors) => console.log(errors));
        }
      });
    }

    function submitArtwork(discipline,identifier,name,rating,review,user,e){
        let artwork = {
            identifier: identifier,
            discipline_id: discipline,
            name: name
        }
        fetch("/artworks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(artwork),
          }).then((res) => {
            if (res.ok) {
              res.json().then((artworkInDB) => {
                let newReview = {
                    rating: rating,
                    review_text: review,
                    user_id: user.id,
                    artwork_id: artworkInDB.id
                }
                submitReview(newReview,e)
              });
            } else {
              res.json().then((errors) => console.log(errors));
            }
          });
    }

    function submitReview(review,e) {
        fetch("/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
          }).then((res) => {
            if (res.ok) {
              res.json().then((reviewInDB) => {
                setSubmitted(reviewInDB)
                e.target.reset();
              });
            } else {
              res.json().then((errors) => console.log(errors));
            }
          })};

    function handleRating(e){
        setRating(e.target.value)
    }

    function handleReview(e){
        setReview(e.target.value)
    }

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
    
    function moviePicture(movieInfo){
        if (movieInfo.poster_path){
            return ("https://image.tmdb.org/t/p/w500" + `${movieInfo.poster_path}`)
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
          return noBRClose
      }

      function shortSummary(movieInfo) {
        if (movieInfo.overview) {
        let splitSummary = movieInfo.overview.split(" ")
        let shortenedSummary = splitSummary.slice(0,100)
        let summary = shortenedSummary.join(" ")
        let cleanSummary = cleanUpSummary(summary)
        return (cleanSummary + "...")
        }
        else {
          return movieInfo.overview
        }
      }

    if (movieInfo && hasReviewed===false) {
            return (<Card sx={{width:"50vw", border: 1, borderColor: "black"}} >
            <CardHeader
                    xs = {12}
                                title={`${movieInfo.title}`}
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
                      image={`${moviePicture(movieInfo)}`}
              alt={`${movieInfo.title} Cover`}
                    />
                      <CardContent sx={{ flex: '1 0 auto' }} style={{ textAlign: 'center' }}>
                      <Typography component="div" variant="h5">
                  {getYear(movieInfo)}
                </Typography>
                <Typography component="div" variant="h7">
                  {shortSummary(movieInfo)}
                </Typography>
                      </CardContent>
                      <Box textAlign='center' component="form" onSubmit={handleSubmit}> 
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
                   <Grid item component={Button}
                          type="submit"
                          variant="contained"
                          sx={{ mt: 1, mb: .1, color: "white", backgroundColor: "black" }}
                        >
                          Add To Shelf
                        </Grid>
                </Grid>
                
              </CardActions>
                      </Box>
                    </Card>
        )
    }
    else if (movieInfo && hasReviewed) {
            return (<Card sx={{width:"50vw", border: 1, borderColor: "black"}} >
            <CardHeader
                    xs = {12}
                                title={`${movieInfo.title}`}
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
                      image={`${moviePicture(movieInfo)}`}
              alt={`${movieInfo.title} Cover`}
                    />
                      <CardContent sx={{ flex: '1 0 auto' }} style={{ textAlign: 'center' }}>
                      <Typography component="div" variant="h5">
                  {getYear(movieInfo)}
                </Typography>
                <Typography component="div" variant="h7">
                  {shortSummary(movieInfo)}
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



export default AddMovie
