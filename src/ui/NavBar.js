import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles } from '@material-ui/core/styles'
import {AppBar, Toolbar, IconButton, Avatar, Typography, Grid, Tooltip} from '@material-ui/core'
import SignOut from '../features/SignOut'

const useStyles = makeStyles((theme) => ({
	displayIcons: {
    display: "inline-block",
    width: "100%",
    float: "left",
    padding: "5px 0 0 0"
  },
}))

export default function NavBar() {
	const classes = useStyles()
	
  return (
    <div>
      <AppBar position="static">
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
									NGO Name
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