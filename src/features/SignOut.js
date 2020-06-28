import React from 'react';
import {Link} from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {IconButton, Tooltip} from '@material-ui/core' 

import { withFirebase } from './Firebase'
 
const SignOutButton = ({ firebase }) => (
  <Link to='/login'>
    <Tooltip title="Logout" placement="bottom-start">
      <IconButton  edge="end" style={{padding: 10}}>
        <ExitToAppIcon onClick={firebase.doSignOut}/>
      </IconButton>
    </Tooltip>
  </Link>
)
 
export default withFirebase(SignOutButton)