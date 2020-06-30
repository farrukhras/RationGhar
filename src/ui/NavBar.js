import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Toolbar, Avatar, Typography, Grid, Tooltip} from '@material-ui/core'
import SignOut from '../features/SignOut'

const useStyles = makeStyles((theme) => ({
	displayIcons: {
    display: "inline-block",
    width: "100%",
    float: "left",
    padding: "5px 0 0 0"
  },
}))

export default function NavBar({userName}) {
	const classes = useStyles()
	
  return (
    <div>
      <AppBar position="static" style={{backgroundColor: "#FCCC77"}}>
        <Toolbar style={{minHeight: 50}}>
					<div className={classes.displayIcons}>
						<div style={{float: "left"}}>
							<Grid container direction="row">
								<Avatar
									style={{width: 35, height: 35, marginLeft: -15}} 
									alt="NGO"
									src="https://dcassetcdn.com/design_img/10133/25833/25833_303600_10133_image.jpg"
								/>
								<Typography style={{fontWeight: 600, margin: 3, fontSize: 20}}>
									{userName}
								</Typography>
							</Grid>
            </div>
            <div style={{float: "right"}}>
							<SignOut/>
            </div>
					</div>
        </Toolbar>
      </AppBar>
    </div>
  )
}