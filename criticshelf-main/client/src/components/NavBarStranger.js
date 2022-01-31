import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CardHeader from '@mui/material/CardHeader';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const NavBarStranger = ({theme}) => {
  return (
      <ThemeProvider theme={theme}>
    <AppBar position="static" sx={{ p: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "#fafafa", display: "block" }} href="/login">
              Log In
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "#fafafa", display: "block" }} href="/login">
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};
export default NavBarStranger