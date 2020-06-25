import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import 'typeface-montserrat'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import HomePage from './features/HomePage'

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
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
