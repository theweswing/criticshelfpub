import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import Rating from '@mui/material/Rating';

function BookShelfCard({reviewData, setMediaInfo, setSelectedMedia}) {
    const [bookInfo,setBookInfo] = useState(false)

    function getReviewDate(reviewData){
        let rawDate = reviewData.updated_at
        let year = rawDate.slice(0,4)
        let month = rawDate.slice(5,7)
        let day = rawDate.slice(8,10)
        let date = `${month}-${day}-${year}`
        return date
      }

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

      function handleUpdate(e){
        setMediaInfo(bookInfo)
        setSelectedMedia("Book")
      }

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${reviewData.artwork.identifier}`)
        .then((r) => {
          if (r.ok) {
            r.json()
            .then((data) => {
              if (data.volumeInfo) {
                setBookInfo(data)
                }
                else {
                    console.log("something went wrong fetching a book")
                }
                })
            }})}, [])

            function bookPicture(vi){
                if (bookInfo){
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
                else {
                    return ("https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg")
                }
            }
    
    if (reviewData && bookInfo) {
    return (
        <Card sx={{ display: 'flex' }} style={{width:"15vw", height:"34vw"}} xs={12}>
              <Grid container 
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            sx={{border: 2, borderColor: "black"}}>
      <Grid item xs={12} component={Box} sx={{ display: 'flex'}}>
      <CardMedia
      component="img"
      style={{height:"20vw"}}
      image={bookPicture(bookInfo.volumeInfo)}
      alt={`Poster for ${bookInfo.volumeInfo.title} not found.`}
      />
      </Grid>
      <Grid xs={12} item component={Box} sx={{display: 'flex', flexDirection: 'column' }}>
      <CardHeader
                
                title={`${bookInfo.volumeInfo.title}`}
                subheader={`${getYear(bookInfo)}`}
                titleTypographyProps={{fontSize:"1vw"}}
                subheaderTypographyProps={{color: "white", fontSize:".7vw"}}
                style={{ textAlign: 'center', height:"5vw" }}
                sx={{
                    color: "white",
                    backgroundColor: "black",
                    border: 2, borderColor: "black",
                }}
          >
          </CardHeader>
          <CardContent sx={{ flex: '1 0 auto' }} style={{overflow:"scroll", textAlign: 'center', height: "7vw"}}>
            <Rating label="Average Rating" name="half-rating-read" defaultValue={parseFloat(reviewData.rating)} precision={0.5} readOnly />
      <Typography variant="subtitle1" fontSize=".75vw">
      {`${reviewData.rating} ☆`}
          </Typography>
              <Typography component="div" variant="body2" sx={{mt:1}} fontSize=".8vw" >
                {`${reviewData.review_text}`}
              </Typography>
              <Typography variant="subtitle1" sx={{mt:1}} fontSize=".75vw">
              {`Reviewed on: ${getReviewDate(reviewData)}`}
          </Typography>
            </CardContent>
            
      </Grid>
      <Button  onClick={handleUpdate} variant="contained" fullWidth sx={{mt:.4}} style={{height: "1.5vw"}}>
                Update
              </Button>
      </Grid>
      
      </Card>
      )
    }
    else {
        return (
            <Typography>
                Loading...
            </Typography>
        )
    }
}


export default BookShelfCard