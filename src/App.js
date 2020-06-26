import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import 'typeface-montserrat'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import HomePage from './features/HomePage'
import ActiveRequestsList from './features/ActiveRequestsList'
import RegistrationForm from './features/RegistrationForm'
import NGODashboard from './features/NGODashboard'
import LoginPage from './features/LoginPage'
import SignUpPage from './features/SignUpPage'
import AllRequestList from './features/AllRequestList'
import AssignedRequests from './features/AssignedRequests'
import SubmissionView from './features/SubmissionView'

function App() {

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
            <Route path="/ngo-dashboard" component={NGODashboard}/>
            <Route path="/request-list" component={AllRequestList}/>
            <Route path="/assigned-list" component={AssignedRequests}/>
            <Route path="/submission-view" component={SubmissionView}/>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
