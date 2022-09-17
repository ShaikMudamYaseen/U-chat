
import '../App.css';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Logo from "./logo"
import channel from "../assets/channels.png"
import Grid from '@mui/material/Grid';
import message from "../assets/direct_message.png"
import { useNavigate } from 'react-router-dom';
import { Auth } from '.';
// import {Link,Outlet} from 'react-router-dom'



function Landing() {
  const [signin, setSignin]=useState(false)
  const [signup, setSignup]=useState(false)
  
  const onclickSignup=()=>{
    setSignup(true)

  }
  const onclickSignin=()=>{
    setSignin(true)
    console.log("clicked");


  }
  if(signin){
    return <Auth signup={false}/>
  }
  else if(signup){
    return <Auth signup={true}/>


  }
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{boxShadow:"0px 0px 0px"}} >
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontWeight:"bold" }}>
            U-Chat
          </Typography>
          <Button color="inherit" variant='outlined'sx={{marginRight:"1rem"}} onClick={onclickSignup} >sign up</Button>
          <Button color="inherit" variant='contained' sx={{backgroundColor:"white",color:"#1976D2"}} onClick={onclickSignin} >Sign in</Button>
        </Toolbar>
      </AppBar>
      </Box>
      <div style={{backgroundColor:"#1976D2",minHeight:"20rem",display:'flex',flexDirection:'column',boxShadow:"0px 2px 15px gray" }}>
      <Typography variant='h3'  color="white"  align="center" sx={{fontWeight:"bold",maxWidth:"40rem",paddingTop:"4rem",alignSelf:'center'}}>
      Great teamwork starts with a <span style={{color:'#F1C40F'}}>digital HQ</span>
          </Typography>
      <Typography variant='subtitle1' align="center"  color="white" sx={{maxWidth:"40rem",paddingTop:"1rem",alignSelf:'center'}}>
      With all your people, tools and communication in one place, you can work faster and more flexibly than ever before.
      </Typography>
      </div>
      <Box sx={{flexGrow:1,marginTop:"2rem",padding:"1rem"}}>
        <Grid container spacing={2} sx={{margin:"2rem"}}>
          <Grid item xs={12} md={6} sx={{alignSelf:'center',textAlign:"center"}}>
          <img src={channel} style={{maxWidth:"30rem",maxHeight:"30rem",boxShadow:"0px 0px 25px gray",borderRadius:"0px 100px 100px 0px", margin:"0px auto"}}/>
          </Grid>
          <Grid item xs={12} md={5} sx={{alignSelf:"center"}}>
          <Typography variant="h4" align='center' sx={{fontWeight:"bold"}}>
          Bring your team together
          </Typography>
          <Typography variant="subtitle1" align='center'>
          At the heart of U-Chat are channels: organised spaces for everyone and everything that you need for work. In channels, it’s easier to connect across departments, offices, time zones and even other companies.
          </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{flexGrow:1,marginTop:"2rem",padding:"1rem"}}>
        <Grid container spacing={2} sx={{margin:"2rem"}}>
          <Grid item xs={12} md={5}  >
          <Typography variant="h4" align='center' sx={{fontWeight:"bold"}}>
          Choose how you want to work
          </Typography>
          <Typography variant="subtitle1" align='center'>
          In U-Chat, you’ve got all the flexibility to work when, where and how it’s best for you. You can easily chat, send audio and video clips, or join a huddle to talk things through live.
          </Typography>
          
          </Grid>
          <Grid item xs={12} md={7} sx={{alignSelf:'center',textAlign:"center"}}>
          <img src={message} style={{maxWidth:"30rem",maxHeight:"30rem",boxShadow:"0px 0px 25px gray",borderRadius:"0px 100px 100px 0px", margin:"0px auto"}}/>
          
          </Grid>
        </Grid>
      </Box>
      <div style={{backgroundColor:"#0D47A1",height:"7rem",alignItems:"center"}}>
      <Typography variant="h6" align='center' color="white" sx={{marginTop:"2rem"}}>
         Contact Us
          </Typography>
          <Typography variant="subtitle1" align='center' color="white" >
            dummymr86@gmail.com
          </Typography>
          <p style={{color:'white',marginLeft:"1rem"}}>&copy;2022 U-chat</p>

      </div>

      </>

    
  );
}

export default Landing
