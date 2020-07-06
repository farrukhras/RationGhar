import React, { useState } from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from 'formik-material-ui'
import loginbg from './loginbg.jpg'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from './Firebase'
import ErrorSnackbar from '../ui/ErrorSnackbar'
import Fab from '@material-ui/core/Fab'

const useStyles = makeStyles(theme=>({
	root: {
    position: 'absolute',
    width: '30vw',
    height: '100%',
    backgroundColor: "#DBDBDA",
    color: theme.palette.secondary.main
	},
	input: {
    color: 'black',
  },
  displayIcons: {
    display: "inline-block",
    width: "92%",
    float: "left",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    backgroundColor: "#6D3E58",
  },
}))

function LoginForm(props) {
  const [error, setError] = useState(null)
  const classes = useStyles()
  
	return (
    <div>
      <img style={{position: 'absolute', left: '30vw', width: '70vw', height: '100%'}} src={loginbg} alt="RationGhar"/>
      <div className={classes.root}>
        <div style={{marginTop: '30vh', marginLeft: '3vw'}}>
          <Formik
            // enableReinitialize = "true"
            validateOnChange={false} validateOnBlur={true}
            initialValues = {{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                  .email('Invalid Email Address')
                  .required('Required'),
                password: Yup.string()
                  .required('Required')
            })}
            onSubmit={(values, { setSubmitting }) => {
              const email = values.email
              const password = values.password

              props.firebase
                .doSignInWithEmailAndPassword(email, password)
                .then(() => {
                  props.history.push('/ngo-dashboard')
                  // setSubmitting(false)
                })
                .catch(error => {
                  values.email = ''
                  values.password = ''
                  setError(error)
                })
            }}
          >
            {({submitForm, isSubmitting})=>(
              <Form>
                <h1 style={{color: "#272323", fontSize: "300%"}}>NGO Login</h1>
                <Field
                  style = {{backgroundColor: 'white', width: "24vw"}}
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  label="Email"
                  name="email"
                  InputProps={{
                    className: classes.input,
                  }}
                ></Field>

                <br/>   
                
                <Field
                  style = {{backgroundColor: 'white', width: "24vw"}}
                  component={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  label="Password"
                  name="password"
                  type="password"
                  InputProps={{
                    className: classes.input,
                  }}
                > 
                </Field>     
                
                <br/>    
                <br/>
                
                <div className={classes.displayIcons}>
                  <div style={{float: "left"}}>
                    <Link to='/signup'>
                      <Fab
                        size="large" 
                        color="primary"
                        variant="extended" 
                        spacing= '10'
                        className={classes.extendedIcon}
                      >
                        <h3>Sign Up</h3>
                      </Fab>
                    </Link>
                  </div>
                  <div style={{float: "right"}}>
                    <Fab 
                      size="large" 
                      onClick={submitForm} 
                      variant="extended" 
                      color="primary" 
                      spacing= '10'
                      className={classes.extendedIcon}
                    >
                      <h3>Login</h3>
                    </Fab>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          {error && <ErrorSnackbar stateError={error.message}/>}
        </div>
      </div>
    </div>
  )
}

const LoginPage = compose (
  withRouter,
  withFirebase,
)(LoginForm)

export default LoginPage