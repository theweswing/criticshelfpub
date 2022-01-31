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


function BookSearchCard ({bookInfo, theme, handleBookSelect}) {
const [reviews,setReviews] = useState([])

function getYear(bookInfo) {
    if (bookInfo.volumeInfo.publishedDate) {
    let release_date = bookInfo.volumeInfo.publishedDate
    let year = release_date.slice(0,4)
    return year
    }
    else {
      return bookInfo.volumeInfo.publishedDate
    }
  }

function bookPicture(vi){
    if (vi.imageLinks){
        if (vi.imageLinks.thumbnail){
            return vi.imageLinks.thumbnail
        }
        else if (vi.imageLinks.smallThumbnail){
            return vi.imageLinks.smallThumbnail
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
              return (givenReview.artwork.identifier==bookInfo.id)
          })
          setReviews(checkForReviews)
      })
      }})}, [bookInfo])

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


if (bookInfo) { 
//     return (
//         <Card sx={{ display: 'flex' }} >
// <Box sx={{ display: 'flex', flexDirection: 'column' }}>
// <CardHeader
// xs={12}
//             title={`${bookInfo.volumeInfo.title}`}
//             style={{ textAlign: 'center' }}
//             sx={{
//                 color: "white",
//                 backgroundColor: "black",
//                 // backgroundColor: "green",
//                 height: 100
//             }}
//       >
//       </CardHeader>
//   <CardContent sx={{ flex: '1 0 auto' }} style={{ textAlign: 'center' }}>
//     <Typography component="div" variant="h6" sx={{pb:1, height:60}}>
//       {bookInfo.volumeInfo.authors[0]}
//     </Typography>
//     <Typography component="div" variant="h6">
//       {getYear(bookInfo)}
//     </Typography>
//     {/* <Typography component="div" variant="h7">
//       {shortSummary(bookInfo)}
//     </Typography> */}
//     {parseReviewData(reviews)}
//     {/* <Rating label="Average Rating" name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
//     <Typography variant="subtitle1">Average Rating</Typography>
//     <Typography variant="subtitle1">x on y Reviews</Typography> */}
//   </CardContent>
// </Box>
// <Box sx={{ display: 'flex', alignItems: 'right'}}>
// <CardMedia
//   component="img"
//   height="100%"
//   width="100%"
//   sx={{ width: 201, height: 302 }}
//   image={`${bookPicture(bookInfo.volumeInfo)}`}
//   alt={`${bookInfo.volumeInfo.title} Cover`}
// />
// </Box>
// </Card>
//     )
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
  image={`${bookPicture(bookInfo.volumeInfo)}`}
  alt={`${bookInfo.volumeInfo.title} Cover`}
/>
</Grid>
<Grid xs={12} item component={Box} sx={{display: 'flex', flexDirection: 'column' }}>
<CardHeader
            
            title={`${bookInfo.volumeInfo.title}`}
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
    <Typography component="div" variant="h6" sx={{height:30}}>
       {bookInfo.volumeInfo.authors[0]}
     </Typography>
    <Typography component="div" variant="h6">
    {getYear(bookInfo)}
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
                      value={bookInfo.id}
                      onClick={handleBookSelect}
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

export default BookSearchCard