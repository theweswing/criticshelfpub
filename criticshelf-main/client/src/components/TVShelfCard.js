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

function TVShelfCard({reviewData, setMediaInfo, setSelectedMedia}) {
    const [tvInfo,setTVInfo] = useState("")

    function getReviewDate(reviewData){
      let rawDate = reviewData.updated_at
      let year = rawDate.slice(0,4)
      let month = rawDate.slice(5,7)
      let day = rawDate.slice(8,10)
      let date = `${month}-${day}-${year}`
      return date
    }

    function handleUpdate(e){
      setMediaInfo(tvInfo)
      setSelectedMedia("TV")
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${reviewData.artwork.identifier}?api_key=3[key]`)
        .then((r) => {
          if (r.ok) {
            r.json()
            .then((data) => {
              if (data) {
                setTVInfo(data)
                }
                })
            }})}, [])

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
    
    if (reviewData) {
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
    image={"https://image.tmdb.org/t/p/w500" + `${tvInfo.poster_path}`}
    alt={`Poster for ${tvInfo.title} (${getYear(tvInfo)}) not found.`}
    />
    </Grid>
    <Grid xs={12} item component={Box} sx={{display: 'flex', flexDirection: 'column' }}>
    <CardHeader
              
              title={`${tvInfo.name}`}
              subheader={`${getYear(tvInfo)}`}
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
            <Typography component="div" variant="body2" sx={{mt:1}} fontSize=".8vw">
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

export default TVShelfCard