import React from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container, Grid } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { TextField } from 'formik-material-ui'
// import { connect } from 'react-redux'
// import { login, clearError } from './userSlice'
// import ErrorSnackbar from '../../ui/ErrorSnackbar'
import landingBG from './landingBG.jpg'
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'

const useStyles = makeStyles(theme=>({
	root: {
    position: 'absolute',
    maxWidth: '32vw',
    marginLeft: 0,
    marginTop: 0,
    height: '100%',
    // backgroundColor: "#DBDBDA40",
    backgroundImage: 'linear-gradient(to bottom, white , blue)',
    color: theme.palette.secondary.main
	},
	input: {
    color: 'black',
  },
  displayIcons: {
    display: "inline-block",
    width: "100%",
    float: "left",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function LoginPage() {
	const classes = useStyles()
	return (
    <Container component="main" className={classes.root}>
      <img style={{position: 'absolute', left: '30vw', width: '70vw', height: '100vh'}}
      src={landingBG} alt="RationGhar"/>
      
      <div style={{marginTop: '30vh', marginLeft: '3vw'}}>
      <Formik
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
        onSubmit={ (values, { setSubmitting }) => {
            // dispatch(login({email: values.email, password: values.password, userType: userType}))
            // .then(() => {
            //   setSubmitting(false)
            // }) 
          }
        }
        >
          {({submitForm, isSubmitting})=>(
            <Form>
              <h1 style={{color: "black"}}>NGO Login</h1>
              <Field
                style = {{backgroundColor: 'white'}}
                component={TextField}
                variant="filled"
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
                style = {{backgroundColor: 'white'}}
                component={TextField}
                variant="filled"
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
              <div className={classes.displayIcons} style={{maxWidth: "16.5vw"}}>
                <div style={{float: "left"}}>
                  <Link to='/signup'>
                    <Fab
                    size="large" 
                    // onClick={submitForm} 
                    // type="submit"
                    variant="contained" 
                    color="secondary" 
                    spacing= '10'
                    // endIcon={<NavigateNextIcon/>}
                    className={classes.extendedIcon}
                    >
                      signup
                    </Fab>
                    
                  </Link>
                </div>
                <div style={{float: "right"}}>
                  <Fab 
                    size="large" 
                    onClick={submitForm} 
                    // type="submit"
                    variant="extended" 
                    color="secondary" 
                    spacing= '20'
                    // endIcon={<NavigateNextIcon/>}
                    className={classes.extendedIcon}
                  >
                    Login
                  </Fab>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        
        </div>
          
      {/* <ErrorSnackbar stateError={error} clearError={clearError}/> */}
    </Container>
  )
}