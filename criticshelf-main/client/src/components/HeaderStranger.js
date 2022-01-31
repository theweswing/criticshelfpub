import React from "react";
import {ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Rating } from "@mui/material";

const Header = ({theme, user, setUser} ) => {

    return (
        <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ p: 2, width: "100vw", border: 1, borderColor: "#FFD700", }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Grid container
        spacing={0}
        direction="column"
        justifyContent="center"
        >
              <Grid item component={Typography}
                variant="h7"
                align="center"
                sx={{ ml: .3, display: { xs: 1, md: "flex" } }}
              >
                CRITICSHELF
                </Grid>
                <Grid item component={Rating} align="center" sx={{display:{xs: 1, md:"flex"} }}label="Average Rating" name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
            </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "#fafafa", display: "block" }} href="/login">
              Log In
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "#fafafa", display: "block" }} href="/signup">
              Sign Up
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "#fafafa", display: "block" }} href="/about">
              About
            </Button>
          </Box>
          </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>
    );
  };
  export default Header