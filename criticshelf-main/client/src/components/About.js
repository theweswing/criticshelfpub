import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ThemeProvider } from "@mui/material/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { Stack } from "@mui/material";
import { IconButton } from "@mui/material";

function About({theme}) {
    const[toggleWhy,setToggleWhy]=useState(false)
    const[toggleTech,setToggleTech]=useState(false)
    const[toggleAboutMe,setToggleAboutMe]=useState(false)
    const[toggleVersion,setToggleVersion]=useState(false)


function handleWhy(){
    setToggleAboutMe(false)
    setToggleTech(false)
    setToggleVersion(false)
    setToggleWhy(!toggleWhy)
}

function handleAboutMe(){
    setToggleWhy(false)
    setToggleTech(false)
    setToggleVersion(false)
    setToggleAboutMe(!toggleAboutMe)
}

function handleTech(){
    setToggleWhy(false)
    setToggleAboutMe(false)
    setToggleVersion(false)
    setToggleTech(!toggleTech)
}

function handleVersion(){
    setToggleWhy(false)
    setToggleAboutMe(false)
    setToggleTech(false)
    setToggleVersion(!toggleVersion)
}

if(toggleWhy===false && toggleTech===false && toggleAboutMe===false && toggleVersion===false){
    return (
<ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"flex-start",
          }}
        >
        <Grid item component={Typography} variant="h2" color="black" align="left">
            About CriticShelf
          </Grid>
        <Grid item component={Box}
        sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent:"flex-start",
          }}>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:0}}>
                CriticShelf is a website for those who love to think critically.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                If you have opinions on the things you watch, read or listen to, CriticShelf is for you.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                It's simple: 
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
            After you finish that movie, TV show, book, new album, or video game...
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
            Log in to your CriticShelf account, and leave it a rating and review.
            </Grid>
        </Grid>
        <Grid item component={Typography} variant="h4" color="black" align="left">
            Why? {toggleWhy ? 
            <ArrowDropDownIcon onClick={handleWhy}></ArrowDropDownIcon> :
            <ArrowRightIcon onClick={handleWhy}></ArrowRightIcon>}
          </Grid>
          <Grid item component={Typography} variant="h4" color="black" align="left">
            Technology {toggleTech ? 
            <ArrowDropDownIcon onClick={handleTech}></ArrowDropDownIcon> :
            <ArrowRightIcon onClick={handleTech}></ArrowRightIcon>}
          </Grid>
          <Grid item noWrap component={Typography} variant="h4" color="black" align="left">
            About Me {toggleAboutMe ? 
            <ArrowDropDownIcon onClick={handleAboutMe}></ArrowDropDownIcon> :
            <ArrowRightIcon onClick={handleAboutMe}></ArrowRightIcon>}
          </Grid>
          <Grid item noWrap component={Typography} variant="h4" color="black" align="left">
            Version 0.5 {toggleVersion ? 
            <ArrowDropDownIcon onClick={handleVersion}></ArrowDropDownIcon> :
            <ArrowRightIcon onClick={handleVersion}></ArrowRightIcon>}
          </Grid>
      </Box> 
      </ThemeProvider>
    )
}
if(toggleWhy===true){
    return (
<ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"flex-start",
          }}
        >
        <Grid item component={Typography} variant="h2" color="black" align="left">
            About CriticShelf
          </Grid>
        <Grid item component={Box}
        sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent:"flex-start",
          }}>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:0}}>
                CriticShelf is a website for those who love to think critically.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                If you have opinions on the things you watch, read or listen to, CriticShelf is for you.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                It's simple: 
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
            After you finish that movie, TV show, book, new album, or video game...
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
            Log in to your CriticShelf account, and leave it a rating and review.
            </Grid>
        </Grid>
        <Grid item component={Typography} variant="h4" color="black" align="left">
            Why?
            <ArrowDropDownIcon onClick={handleWhy}></ArrowDropDownIcon> 
          </Grid>
          <Grid item component={Box}
        sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent:"flex-start",
          }}>
          <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                There are plenty of similar websites. Some that are quite good.
            </Grid>  
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                But to my knowledge, most of these sites are dedicated to only one form of art:
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                Letterboxd is fantastic, but only does movies. Goodreads is fine, but only does books.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                When the new Netflix series, Kanye album or Marvel movie comes out, we find out:
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                Everyone's a critic.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                So why not have a place to share those opinions? To see what others think?
            </Grid>             
          </Grid>
          </Box>
          </ThemeProvider>
    )
}
if(toggleTech===true){
    return (
<ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"flex-start",
          }}
        >
        <Grid item component={Typography} variant="h2" color="black" align="left">
            About CriticShelf
          </Grid>
        <Grid item component={Box}
        sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent:"flex-start",
          }}>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:0}}>
                CriticShelf is a website for those who love to think critically.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                If you have opinions on the things you watch, read or listen to, CriticShelf is for you.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                It's simple: 
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
            After you finish that movie, TV show, book, new album, or video game...
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
            Log in to your CriticShelf account, and leave it a rating and review.
            </Grid>
        </Grid>
        <Grid item component={Typography} variant="h4" color="black" align="left">
            Technology
            <ArrowDropDownIcon onClick={handleTech}></ArrowDropDownIcon>
          </Grid>
          <Grid item component={Box}
        sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent:"flex-start",
          }}>
          <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                CriticShelf is built with a React front-end, a Rails back, and styled with Material UI.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                It draws from four APIs as data sources, all credited at the bottom of the page.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                Users, reviews, and other site data is managed on a PostgreSQL database.
            </Grid>      
          </Grid>
          </Box>
          </ThemeProvider>
    )
}
if(toggleAboutMe===true){
    return (
<ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"flex-start",
          }}
        >
        <Grid item component={Typography} variant="h2" color="black" align="left">
            About CriticShelf
          </Grid>
        <Grid item component={Box}
        sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent:"flex-start",
          }}>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:0}}>
                CriticShelf is a website for those who love to think critically.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                If you have opinions on the things you watch, read or listen to, CriticShelf is for you.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                It's simple: 
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
            After you finish that movie, TV show, book, new album, or video game...
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
            Log in to your CriticShelf account, and leave it a rating and review.
            </Grid>
        </Grid>
        <Grid item noWrap component={Typography} variant="h4" color="black" align="left">
            About Me
            <ArrowDropDownIcon onClick={handleAboutMe}></ArrowDropDownIcon>
          </Grid>
          <Grid item component={Box}
        sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent:"flex-start",
          }}>
          <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1, pl:18}}>
                My name is Wes Schierenbeck, and I created CriticShelf.
            </Grid>
            <Grid item component={Stack} 
            sx={{mb:1}}
            direction={{xs:"column", sm:"row"}} spacing={2} justifyContent="center"> 
                <IconButton 
                href="https://www.linkedin.com/in/kanyewes/"
                target="_blank"
                rel="noreferrer noopener"
                // sx={{border:1,borderColor:"black"}} 
                aria-label="Example">
                    <LinkedInIcon icon={LinkedInIcon} />
                </IconButton>
                <IconButton 
                href="https://www.linkedin.com/in/kanyewes/"
                target="_blank"
                rel="noreferrer noopener"
                // sx={{border:1,borderColor:"black"}} 
                aria-label="Example">
                    <GitHubIcon icon={GitHubIcon} />
                </IconButton>
                <IconButton 
                href="https://twitter.com/theweswing"
                target="_blank"
                rel="noreferrer noopener"
                // sx={{border:1,borderColor:"black"}} 
                aria-label="Example">
                    <TwitterIcon icon={TwitterIcon} />
                </IconButton>
                <IconButton 
                href="https://theweswing.substack.com/"
                target="_blank"
                rel="noreferrer noopener"
                // sx={{border:1,borderColor:"black"}} 
                aria-label="Example">
                    <RssFeedIcon icon={RssFeedIcon} />
                </IconButton>
                <IconButton 
                component="a"
                href="mailto:wes@wschierenbeck.com"
                target="_blank"
                rel="noreferrer noopener"
                // sx={{border:1,borderColor:"black"}} 
                aria-label="Example">
                    <EmailIcon icon={EmailIcon} />
                </IconButton>
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                I'm from Brooklyn, NY and I love talking about things I enjoyed-- and things I hated.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                CriticShelf was born when Goodreads ignored my emails about adding half-star ratings.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                It was my final project at the Flatiron School's Full-Stack Software Engineer Bootcamp.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                Please enjoy, and feel free to reach out with any feedback.
            </Grid>      
          </Grid>
          </Box>
          </ThemeProvider>
    )
}
if(toggleVersion===true){
    return (
        <ThemeProvider theme={theme}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"flex-start",
          }}
        >
        <Grid item component={Typography} variant="h2" color="black" align="left">
            About CriticShelf
          </Grid>
        <Grid item component={Box}
        sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent:"flex-start",
          }}>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:0}}>
                CriticShelf is a website for those who love to think critically.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                If you have opinions on the things you watch, read or listen to, CriticShelf is for you.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                It's simple: 
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
            After you finish that movie, TV show, book, new album, or video game...
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
            Log in to your CriticShelf account, and leave it a rating and review.
            </Grid>
        </Grid>
        <Grid item component={Typography} variant="h4" color="black" align="left">
            Version Info
            <ArrowDropDownIcon onClick={handleVersion}></ArrowDropDownIcon>
          </Grid>
          <Grid item component={Box}
        sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            justifyContent:"flex-start",
          }}>
          <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                CriticShelf is in its first launched version, v0.5
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                In 0.5, users can review and rate media, and view their "shelf" of reviews.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                Users can see a piece of media's average rating and number of ratings.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                Known Issues:
            </Grid> 
            <Grid item component={Typography} xs={12} variant="h7" color="black" sx={{mb:1}}>
            • It is deeply, deeply mobile unfriendly. Use a computer.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h7" color="black" sx={{mb:1}}>
            • The search function can be a bit finnicky if you speed type through it.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h7" color="black" sx={{mb:1}}>
            • The Music database is a bit incomplete for some modern releases.
            </Grid>
            <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
                1.0 Goals:
            </Grid> 
            <Grid item component={Typography} xs={12} variant="h7" color="black" sx={{mb:1}}>
            • Adding Friends, and viewing other users' shelves
            </Grid>
            <Grid item component={Typography} xs={12} variant="h7" color="black" sx={{mb:1}}>
            • A feed of recent reviews and new releases
            </Grid>
            <Grid item component={Typography} xs={12} variant="h7" color="black" sx={{mb:1}}>
            • Users naming their "Favorites" and "GOAT" pieces of media
            </Grid>
            <Grid item component={Typography} xs={12} variant="h7" color="black" sx={{mb:1}}>
            • Improved styling and a mobile-friendly site.
            </Grid>              
          </Grid>
          </Box>
          </ThemeProvider>    
    )
}
// return (
// <ThemeProvider theme={theme}>
//         <Box
//           sx={{
//             marginTop: 2,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent:"flex-start",
//           }}
//         >
//         <Grid item component={Typography} variant="h2" color="black" align="left">
//             About CriticShelf
//           </Grid>
//         <Grid item component={Box}
//         sx={{
//             marginTop: 3,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "left",
//             justifyContent:"flex-start",
//           }}>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:0}}>
//                 CriticShelf is a website for those who love to think critically.
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 If you have opinions on the things you watch, read or listen to, CriticShelf is for you.
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 It's simple: 
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//             After you finish that movie, TV show, book, new album, or video game...
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//             Log in to your CriticShelf account, and leave it a rating and review.
//             </Grid>
//         </Grid>
//         <Grid item component={Typography} variant="h4" color="black" align="left">
//             Why? {toggleWhy ? 
//             <ArrowDropDownIcon onClick={handleWhy}></ArrowDropDownIcon> :
//             <ArrowRightIcon onClick={handleWhy}></ArrowRightIcon>}
//           </Grid>
//           {toggleWhy ?
//           <Grid item component={Box}
//         sx={{
//             marginTop: 2,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "left",
//             justifyContent:"flex-start",
//           }}>
//           <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 There are plenty of similar websites. Some that are quite good.
//             </Grid>  
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 But to my knowledge, most of these sites are dedicated to only one type of media:
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 Letterboxd is fantastic, but only for movies. Goodreads is fine enough, but just books.
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 When the new Netflix series, Kanye album or Marvel movie comes out, we find out:
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 Everyone's a critic.
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 So why not have a place to share those opinions? To see what others think?
//             </Grid>             
//           </Grid> : null}
//           <Grid item component={Typography} variant="h4" color="black" align="left">
//             Technology {toggleTech ? 
//             <ArrowDropDownIcon onClick={handleTech}></ArrowDropDownIcon> :
//             <ArrowRightIcon onClick={handleTech}></ArrowRightIcon>}
//           </Grid>
//           {toggleTech ?
//           <Grid item component={Box}
//         sx={{
//             marginTop: 2,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "left",
//             justifyContent:"flex-start",
//           }}>
//           <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 CriticShelf is built with a React front-end, a Rails back, and styled with Material UI.
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 It draws from four APIs as data sources, all credited at the bottom of the page.
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 Users, reviews, and other site data is managed on a PostgreSQL database.
//             </Grid>      
//           </Grid> : null}
//           <Grid item noWrap component={Typography} variant="h4" color="black" align="left">
//             About Me {toggleAboutMe ? 
//             <ArrowDropDownIcon onClick={handleAboutMe}></ArrowDropDownIcon> :
//             <ArrowRightIcon onClick={handleAboutMe}></ArrowRightIcon>}
//           </Grid>
//           {toggleAboutMe ?
//           <Grid item component={Box}
//         sx={{
//             marginTop: 2,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "left",
//             justifyContent:"flex-start",
//           }}>
//           <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1, pl:18}}>
//                 My name is Wes Schierenbeck, and I created CriticShelf.
//             </Grid>
//             <Grid item component={Stack} 
//             sx={{mb:1}}
//             direction={{xs:"column", sm:"row"}} spacing={2} justifyContent="center"> 
//                 <IconButton 
//                 href="https://www.linkedin.com/in/kanyewes/"
//                 target="_blank"
//                 rel="noreferrer noopener"
//                 // sx={{border:1,borderColor:"black"}} 
//                 aria-label="Example">
//                     <LinkedInIcon icon={LinkedInIcon} />
//                 </IconButton>
//                 <IconButton 
//                 href="https://www.linkedin.com/in/kanyewes/"
//                 target="_blank"
//                 rel="noreferrer noopener"
//                 // sx={{border:1,borderColor:"black"}} 
//                 aria-label="Example">
//                     <GitHubIcon icon={GitHubIcon} />
//                 </IconButton>
//                 <IconButton 
//                 href="https://twitter.com/theweswing"
//                 target="_blank"
//                 rel="noreferrer noopener"
//                 // sx={{border:1,borderColor:"black"}} 
//                 aria-label="Example">
//                     <TwitterIcon icon={TwitterIcon} />
//                 </IconButton>
//                 <IconButton 
//                 href="https://theweswing.substack.com/"
//                 target="_blank"
//                 rel="noreferrer noopener"
//                 // sx={{border:1,borderColor:"black"}} 
//                 aria-label="Example">
//                     <RssFeedIcon icon={RssFeedIcon} />
//                 </IconButton>
//                 <IconButton 
//                 component="a"
//                 href="mailto:wes@wschierenbeck.com"
//                 target="_blank"
//                 rel="noreferrer noopener"
//                 // sx={{border:1,borderColor:"black"}} 
//                 aria-label="Example">
//                     <EmailIcon icon={EmailIcon} />
//                 </IconButton>
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 I'm from Brooklyn, NY and I love talking about the stuff I like. And yes, the stuff I hate.
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 CriticShelf was born when Goodreads ignored my emails about adding half-star ratings.
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 It was my final project at the Flatiron School's Full-Stack Software Engineer Bootcamp.
//             </Grid>
//             <Grid item component={Typography} xs={12} variant="h6" color="black" sx={{mb:1}}>
//                 Please enjoy, and feel free to reach out with any feedback.
//             </Grid>
//           </Grid>
//            : null}
//       </Box> 
//       </ThemeProvider>
//     );
  };
export default About