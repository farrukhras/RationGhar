import React from 'react'
import NavBar from '../ui/NavBar'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Grid, Box, Typography, Card } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList';
import ListIcon from '@material-ui/icons/List';
import { Link } from 'react-router-dom'

//NAVBAR only shows if the user is logged in (will later be moved to the App.js file and will be shown only if user is loggedIn)

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
}))

export default function NGODashboard() {
	const classes = useStyles()
  const image = 'https://images.vexels.com/media/users/3/148166/isolated/preview/488f0787445ac3d5e112561829ec5467-abstract-orange-square-background-by-vexels.png'

  function SettingsLinkBox({text, bgImage, link, icon}){ // same function as one used in CMS by Hamza
    return(
      <Grid item>
        <Link to={link} style={{ textDecoration: 'none' }}>
          <Card style={{
            width: 150,
            height: 100,
            border: 30,
            padding: 40,
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
		<div style={{backgroundImage: "url('https://s3-eu-west-1.amazonaws.com/images.danb.me/trello-backgrounds/pink.jpg')", height: "100vh", backgroundSize: "100% 100%"}}>
			<NavBar />
			<Container component="main" className={classes.root}>
				<div style={{textAlign: "center"}}>
					<h1>100+</h1> {/** replace this number with the total rations served once backend linked*/}
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
			</Container>
		</div>
	)
}

