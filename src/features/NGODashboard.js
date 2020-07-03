import React, { useState, useEffect } from 'react'
import NavBar from '../ui/NavBar'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Grid, Box, Typography, Card } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList';
import ListIcon from '@material-ui/icons/List';
import { Link } from 'react-router-dom'
import { withFirebase } from './Firebase'
import homebg from './home.jpg'
import LockIcon from '@material-ui/icons/Lock'

const useStyles = makeStyles(theme=>({
  root: {
    position: 'absolute',
    maxWidth: '100vw',
    height: '50%'
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
  colorSet: {
    color: "#ffffff"
  }
}))

function NGODashboard(props) {
  const [userName, setUserName] = useState('')
  const [delivered, setDelivered] = useState(0)

	const classes = useStyles()
  const image = 'https://images.vexels.com/media/users/3/148166/isolated/preview/488f0787445ac3d5e112561829ec5467-abstract-orange-square-background-by-vexels.png'

  useEffect(() => {
    async function enableUser() {
      await props.firebase.users().once('value', snapshot => {
        const usersObject = snapshot.val()
        
        if (usersObject === null) {
          console.log("User Not Preset")
        } else {
          if (props.firebase.auth.currentUser !== null) {
            const currUserId = props.firebase.auth.currentUser.uid
            Object.keys(usersObject).map(key => {
              if (currUserId === key) {
                setUserName(usersObject[key].name)
              }
            })
          }
        }
      })
    }

    async function enableForm() {
      await props.firebase.forms().once('value', snapshot => {
        const formsObject = snapshot.val()
        
        if (formsObject !== null) {
          var counter = 0
          if (props.firebase.auth.currentUser !== null) {
            const currUserId = props.firebase.auth.currentUser.uid

            Object.keys(formsObject).map(key => {
              if (currUserId === formsObject[key].assignedTo) {
                if (formsObject[key].complete === "Fulfilled") {
                  counter += 1
                }
              }
            })
            setDelivered(counter)
          }
        }
      })
    }

    enableUser()
    enableForm()
  }, [])

  function SettingsLinkBox({text, bgImage, link, icon}){ // same function as one used in CMS by Hamza
    return(
      <Grid item>
        <Link to={link} style={{ textDecoration: 'none' }}>
          <Card style={{
            width: 250,
            height: 200,
            border: 30,
            padding: 50,
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
		<div>
      <NavBar userName={userName}/>
			<img style={{width: '100vw', height: '100%', float: 'left'}} src={homebg} alt="RationGhar"/>
			<Container component="main" className={classes.root}>
				<div className={classes.colorSet} style={{textAlign: "center"}}>
          <h1 style={{fontSize: "300%"}}>{delivered !== 0 ? `${delivered}+` : "0"}</h1>
          <h2>Rations Delivered</h2>
				</div>

				<Grid container direction="row" justify="center" alignItems="center">
					<SettingsLinkBox 
						text="View All Requests" 
						bgImage={`linear-gradient(to bottom,  #FFA40080, #FFC65F), url(${image})`}
						link="/request-list"
						icon={<ListIcon />}
					/>

					<SettingsLinkBox 
						text="View Assigned Requests" 
						bgImage={`linear-gradient(to bottom, #008A6470, #22C197),url(${image})`}
						link="/assigned-list"
						icon={<FilterListIcon />}
					/>
				</Grid>

        <Grid container direction="row" justify="center" alignItems="center">
          <SettingsLinkBox 
          text="Change Password" 
          link="/change-password"
          bgImage={`linear-gradient(to bottom, #3578FA70, #736BE8),url(${image})`}
          icon={<LockIcon/>}
          />
        </Grid>
			</Container>
		</div>
	)
}

export default withFirebase(NGODashboard)
