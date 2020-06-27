import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Grid, Box, Typography, Card, Button } from '@material-ui/core'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import logo from './Logo.png'

const useStyles = makeStyles(theme=>({
  root: {
    position: 'absolute',
    maxWidth: '100vw',
    height: '100%',
    // backgroundColor: "#3578fa",
    backgroundImage: 'linear-gradient(to bottom, #e0c2c2 , #75a7a8)',
    color: theme.palette.secondary.main
  },
  details: {
    textAlign: "center",
    marginTop: "5%"
  },
  displayIcons: {
    display: "inline-block",
    width: "100%",
    float: "left",
  },
  settingsBoxText: {
    color: theme.palette.secondary.main,
    fontWeight: 500
  },
}))

export default function HomePage() {
  const classes = useStyles()
  const image = 'https://images.vexels.com/media/users/3/148166/isolated/preview/488f0787445ac3d5e112561829ec5467-abstract-orange-square-background-by-vexels.png'

  function SettingsLinkBox({text, bgImage, link, icon}){ // same function as one used in CMS by Hamza
    return(
      <Grid item>
        <Link to={link} style={{ textDecoration: 'none' }}>
          <Card style={{
            width: 200,
            height: 200,
            border: 30,
            padding: 60,
            margin: 20,
            borderRadius: '10%',
            backgroundImage:bgImage,
            backgroundPosition:'50%',
          }}
          > 
            <Box color="secondary.main" style={{ fontSize: 34 }} clone>
              {icon}
            </Box>
            <Typography variant='h5' className={classes.settingsBoxText}>
              {text}
            </Typography>
          </Card>
        </Link>
      </Grid>
    )    
  }

  return (
    <Container component="main" className={classes.root}>
      <div>
        <Link to='/submission-view'>
          <Fab variant="contained" color="default" style={{float: "right", marginTop: "3vh"}}>
            Submission View 
          </Fab>
        </Link>
        <Link to='/ngo-dashboard'>
          <Fab variant="contained" color="default" style={{float: "right", marginTop: "3vh"}}>
            NGO DashBoard
          </Fab>
        </Link>
        <Link to='/login'>
          <Fab variant="contained" color="default" style={{float: "right", marginTop: "3vh"}}>
            NGO Login
          </Fab>
        </Link>
      </div>
      <div>
        {/* <h1 className={classes.details}>RationGhar</h1> */}
        <img style={{position: 'absolute', left: '45vw', width: '10vw', height: '20vh'}}
        src={logo} alt="RationGharlogo"/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
        <div>
          <div style={{float: "left", textAlign: "left", width:"33.33333%"}}>
            <h1 style={{marginLeft: "15vh"}}>100+</h1> {/** replace this number with the total rations served once backend linked*/}
            <h4 style={{marginLeft: "9vh"}}>Rations Delivered</h4>
          </div>
          <div style={{float: "left", textAlign: "center",  width:"33.33333%", marginTop: "2vh"}}>
            <span>Here comes the basic details about RationGhar and what it is about and any other important information 
              that may be required. Any this will be written by none other than owen very own: HAMZA FAROOQ!!! and he is a 
              GUY for some reason.</span>
            </div>
          <div style={{float: "right", textAlign: "right",  width:"33.33333%"}}>
            <h2 style={{marginRight: "15vh"}}>15+</h2> {/** replace this number with the total ngos served once backend linked*/}
            <h4 style={{paddingLeft: 50}}>Partnered NGO's</h4>
          </div>
        </div>
      </div>
      <Grid container direction="row" justify="center" alignItems="center">
        <SettingsLinkBox 
          text="Ration Registration Form" 
          bgImage={`linear-gradient(to bottom,  #FFA40080, #FFC65F), url(${image})`}
          link="/registration-form" // link to the form that Hamza will make
          icon={<TextFieldsIcon />}
        />

        <SettingsLinkBox 
          text="View Active Requests" 
          link="/active-requests" // link to the active requests
          bgImage={`linear-gradient(to bottom, #008A6470, #22C197),url(${image})`}
          icon={<FormatListBulletedIcon />}
        />
      </Grid>
    </Container>
  )
}