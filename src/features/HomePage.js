import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Grid, Box, Typography, Card, Button } from '@material-ui/core'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import homebg from './home.jpg'
import { withFirebase } from './Firebase'

const useStyles = makeStyles(theme=>({
  root: {
    position: 'absolute',
    minWidth: '100%',
    color: theme.palette.secondary.main
  },
  details: {
    textAlign: "center",
    marginLeft: "10%",
    fontSize: "450%",
    textShadow: '3px 3px #e0ccbd',
    fontWeight: 'bold',
    marginBottom: -10
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

function HomePage(props) {
  const [users, setUsers] = useState([])
  const [delivered, setDelivered] = useState(0)

  const classes = useStyles()
  const image = 'https://images.vexels.com/media/users/3/148166/isolated/preview/488f0787445ac3d5e112561829ec5467-abstract-orange-square-background-by-vexels.png'

  function SettingsLinkBox({text, bgImage, link, icon}){ // same function as one used in CMS by Hamza
    return(
      <Grid item>
        <Link to={link} style={{ textDecoration: 'none' }}>
          <Card style={{
            width: 200,
            height: 100,
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

  useEffect(() => {
    async function enableUser() {
      await props.firebase.users().once('value', snapshot => {
        const usersObject = snapshot.val()
        if (usersObject !== null) {
          var usersList = []
          Object.keys(usersObject).map(key => {
            usersList.push(usersObject[key].name)
          })
          setUsers(usersList)
        }
      })
    }

    async function enableForms() {
      await props.firebase.forms().once('value', snapshot => {
        const formsObject = snapshot.val()
        if (formsObject !== null) {
          var counter = 0
          Object.keys(formsObject).map(key => {
            if (formsObject[key].complete === "Fulfilled") {
              counter += 1
            }
          })
          setDelivered(counter)
        }
      })
    }
    
    enableUser()
    enableForms()
  }, [])
  
  return (
    <div>
      <img style={{width: '100vw', height: '100%', float: 'left'}} src={homebg} alt="RationGhar"/>
      <Container component="main" className={classes.root}>
        <div>
          <Link to='/login'>
            <Fab variant="extended" size='large' color="primary" style={{float: "right", marginTop: "3vh", backgroundColor: "#C3073F"}}>
              <h3>NGO Login</h3>
            </Fab>
          </Link>
        </div>
        <div>
          <p className={classes.details}>Ration Ghar</p>
          <div>
            <div style={{float: "left", textAlign: "left", width:"33.33333%"}}>
              <h1 style={{marginLeft: "28%", fontSize: "300%", textShadow: '3px 3px #e0ccbd'}}>{delivered !== 0 ? `${delivered}+` : "0"}</h1>
              <h4 style={{marginLeft: "12vh"}}>Rations Delivered</h4>
            </div>
            <div style={{float: "left", textAlign: "center",  width:"33.33333%", marginTop: "7vh"}}>
              <span>Ration Ghar is an initiative to provide platform to Non-Government Organizations to reach out to those 
                who are in dire need of food and daily necessities especially during the difficult times of COVID'19</span>
            </div>
            <div style={{float: "right", textAlign: "right",  width:"33.33333%"}}>
              <h1 style={{marginRight: "25%", fontSize: "300%",textShadow: '3px 3px #e0ccbd'}}>{users.length}+</h1>
              <h4 style={{marginRight: "12vh"}}>Partnered NGO's</h4>
            </div>
          </div>
          <Grid container direction="row" justify="center" alignItems="center">
          <SettingsLinkBox 
            text="Ration Registration Form" 
            bgImage={`linear-gradient(to bottom,  #6F223280, #C3073F), url(${image})`}
            link="/registration-form" // link to the form that Hamza will make
            icon={<TextFieldsIcon />}
          />

          <SettingsLinkBox 
            text="View Active Requests" 
            link="/active-requests" // link to the active requests
            bgImage={`linear-gradient(to bottom, #e5c61680, #e5c616),url(${image})`}
            icon={<FormatListBulletedIcon />}
          />
        </Grid>
        </div>
      </Container>
    </div>
  )
}

export default withFirebase(HomePage)