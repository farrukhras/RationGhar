import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import 'typeface-montserrat'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import HomePage from './features/HomePage'
import ActiveRequestsList from './features/ActiveRequestsList'
import RegistrationForm from './features/RegistrationForm'
import NGODashboard from './features/NGODashboard'
import LoginPage from './features/LoginPage'
import SignUpPage from './features/SignUpPage'
import ChangePassword from './features/ChangePassword'
import AllRequestList from './features/AllRequestList'
import AssignedRequests from './features/AssignedRequests'
import SubmissionView from './features/SubmissionView'
import { withFirebase } from './features/Firebase'

function App(props) {
  const [authUser, setAuthUser] = useState(null)

  const appTheme = createMuiTheme({
    palette: {
      secondary: {
        main: '#ffffff',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'Montserrat',
      ].join(','),
      fontSize: 12,
    },
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          fontSize: 13
        }
      }
    }
  })

  // the user object to check if user is logged in or not
  props.firebase.auth.onAuthStateChanged(authUser => {
    if (authUser) {
      setAuthUser(authUser)
    } else {
      setAuthUser(null)
    }
  })

  return (
    <Router>
      <ThemeProvider theme={appTheme}>
        <div>
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/registration-form" component={RegistrationForm}/>
            <Route path="/active-requests" component={ActiveRequestsList}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/ngo-dashboard" component={authUser ? NGODashboard : LoginPage}/>
            <Route path="/change-password" exact component={authUser ? ChangePassword : LoginPage}/>
            <Route path="/request-list" component={authUser ? AllRequestList : LoginPage}/>
            <Route path="/assigned-list" component={authUser ? AssignedRequests : LoginPage}/>
            <Route path="/submission-view" component={authUser ? SubmissionView : LoginPage}/>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default withFirebase(App)
