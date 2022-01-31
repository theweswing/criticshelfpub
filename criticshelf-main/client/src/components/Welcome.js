import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ThemeProvider } from "@mui/material/styles";

function Welcome({theme}) {

return (
<ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        <Typography component="h1" variant="h4" color="black">
            Welcome to CRITICSHELF.COM
          </Typography>
        <Typography component="h1" variant="h5" color="black" sx={{mt:2, mb: 2}}>
            We all love to consume media and share our opinions.
          </Typography>
      <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 1, mb: 2 }} variant="h6" component="div" color="black">
            On CriticShelf, rate Movies, TV Shows, Books, Video Games or Albums.
          </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 1, mb: 2 }} variant="h6" component="div" color="black">
            Whether you watch it, read it, play it or otherwise consume it--this is the place.
          </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 1, mb: 0 }} variant="h6" component="div" color="black">
            Sign up now and start building up your shelf!
          </Typography>
      </Grid>
      </Box>
      </ThemeProvider>
    );
  };
export default Welcome