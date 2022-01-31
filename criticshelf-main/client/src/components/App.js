import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material/styles";
import Header from "./Header";
import HeaderStranger from "./HeaderStranger";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import Login from "./Login";
import SearchMedia from "./SearchMedia";
import MyShelf from "./MyShelf";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import MovieShelf from "./MovieShelf";
import TVShelf from "./TVShelf";
import AlbumShelf from "./AlbumShelf";
import BookShelf from "./BookShelf";
import GameShelf from "./GameShelf";
import About from "./About";
import { Box } from "@mui/system";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
        });
      }
    });
  }, []);

  const colorTheme = createTheme({
    palette: {
       primary: {
          // main: blueGrey[600],
          // contrastText: grey[50]
          main: "#000000",
          contrastText: "#FFFFFF"
       },
       secondary: {
          // main: blueGrey[600],
          // contrastText: grey[50]
          main: "#000000",
          contrastText: "#FFFFFF"
       }
    }
 });

  if (!user) return (
    <>
    <HeaderStranger theme={colorTheme} user={user} setUser={setUser}/>
    <Switch>
    <Route exact path="/">
            <Welcome setUser={setUser} user={user} theme={colorTheme}/>
          </Route>
          <Route exact path="/about">
            <About theme={colorTheme}/>
          </Route>
          <Route exact path="/signup">
            <SignUp setUser={setUser} user={user} theme={colorTheme}/>
          </Route>
          <Route exact path="/login">
            <Login setUser={setUser} user={user} theme={colorTheme}/>
          </Route>
          <Route path="*">
            <Welcome setUser={setUser} user={user} theme={colorTheme}/>
          </Route>
    </Switch>
    <Copyright sx={{ mt: 4, mb: 1 }} />
</>
  );

  return (
    <>
    <Header theme={colorTheme} user={user} setUser={setUser}/>
    <Switch>
      <Route exact path="/search">
      <SearchMedia theme={colorTheme} user={user}/>
      </Route>
      <Route exact path="/about">
            <About theme={colorTheme}/>
      </Route>
      <Route exact path="/myshelf">
      <MyShelf theme={colorTheme} user={user}/>
      </Route>
      <Route exact path="/myshelf/movies">
      <MovieShelf theme={colorTheme} user={user}/>
      </Route>
      <Route exact path="/myshelf/tv">
      <TVShelf theme={colorTheme} user={user}/>
      </Route>
      <Route exact path="/myshelf/music">
      <AlbumShelf theme={colorTheme} user={user}/>
      </Route>
      <Route exact path="/myshelf/books">
      <BookShelf theme={colorTheme} user={user}/>
      </Route>
      <Route exact path="/myshelf/games">
      <GameShelf theme={colorTheme} user={user}/>
      </Route>
      <Route path="*">
      <SearchMedia theme={colorTheme} user={user}/>
      </Route>
    </Switch>
    <Copyright sx={{ mt: 4, mb: 1 }} />
    </>
  );
}

const Copyright = (props) => {
  return (
    <Box spacing={0}
    direction="column"
    justifyContent="center"
    alignItems="center"
    sx={{mt:2}}>
    <Grid container
            spacing={0}
            direction="column"
            justifyContent="center"
            alignItems="stretch">
    <Grid item component={Typography}
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {"Copyright © "}
      <a  href="/about">
        CriticShelf
      </a>{" "}
      {new Date().getFullYear()}
      </Grid>
      <Grid item component={Typography}
      variant="body2"
      color="text.secondary"
      align="center"
    >
      Version 0.5 (01.27.22)
      </Grid>
      </Grid>
      <Grid container
            spacing={.5}
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            sx={{mt: 1}}>
        <Grid item component={Typography} xs={12} variant="body2" color="text.secondary" align="center">
          Database Powered By:
        </Grid>
        <Grid item component={Typography} xs={12} variant="body2" color="text.secondary" align="center">
          {"Movies & TV: "}
          <a  href="https://www.themoviedb.org/">
        TMDB
      </a>
        </Grid>
        <Grid item component={Typography} xs={12} variant="body2" color="text.secondary" align="center">
          {"Music: "}
          <a  href="https://www.last.fm/api">
        Last.FM
      </a>
        </Grid>
        <Grid item component={Typography} xs={12} variant="body2" color="text.secondary" align="center">
          {"Video Games: "}
          <a  href="https://rawg.io/">
        RAWG
      </a>
        </Grid>
        <Grid item component={Typography} xs={12} variant="body2" color="text.secondary" align="center">
          {"Books: "}
          <a href="https://developer.google.com/books">
        Google Books API Family
      </a>
        </Grid>
        <Grid item component={Typography} xs={12} variant="body2" color="text.secondary" align="center">
          
        </Grid>
      </Grid>
      </Box>
    
  );
};

export default App;
