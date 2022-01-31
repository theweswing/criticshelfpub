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

function GameShelfCard({reviewData, setMediaInfo, setSelectedMedia}) {
    const [gameInfo,setGameInfo] = useState(false)

    function getReviewDate(reviewData){
      let rawDate = reviewData.updated_at
      let year = rawDate.slice(0,4)
      let month = rawDate.slice(5,7)
      let day = rawDate.slice(8,10)
      let date = `${month}-${day}-${year}`
      return date
    }

    function handleUpdate(e){
      setMediaInfo(gameInfo)
      setSelectedMedia("Game")
    }

    useEffect(() => {
        fetch(`https://api.rawg.io/api/games/${reviewData.artwork.identifier}?key=[key]`)
        .then((r) => {
          if (r.ok) {
            r.json()
            .then((data) => {
              if (data) {
                setGameInfo(data)
                }
                })
            }})}, [])

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
    image={gameInfo.background_image}
    alt={`Art for ${gameInfo.name}`}
    />
    </Grid>
    <Grid xs={12} item component={Box} sx={{display: 'flex', flexDirection: 'column' }}>
    <CardHeader
              
              title={`${gameInfo.name}`}
              subheader={`${getYear(gameInfo)}`}
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

export default GameShelfCard