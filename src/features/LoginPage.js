import React from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container } from '@material-ui/core'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { TextField } from 'formik-material-ui'
import { connect } from 'react-redux'
// import { login, clearError } from './userSlice'
// import ErrorSnackbar from '../../ui/ErrorSnackbar'
import landingBG from './landingBG.jpg'

const useStyles = makeStyles(theme=>({
	root: {
    position: 'absolute',
    maxWidth: '32vw',
    marginLeft: 0,
    marginTop: 0,
    height: '100%',
    backgroundColor: "#DBDBDA40",
    color: theme.palette.secondary.main
	},
	input: {
    color: 'black',
	}
  }))
  
export default function LoginPage() {
	const classes = useStyles()
	return (
    <Container component="main" className={classes.root}>
      <img style={{position: 'absolute', left: '30vw', width: '70vw', height: '100vh'}}
      src={landingBG} alt="RationGhar"/>
      {/* <img style={{
        position: 'absolute',
        left: '3vw',
        width: '12vw',
        height: '10vh',
        paddingTop: 800,
        paddingLeft: 20,
        paddingRight:10,
      }}
      src={lumslogo} alt="lumslogo"/> */}
      

      {/* <img style={{
        position: 'absolute',
        left: '3vw',
        width: '25vw',
        height: '20vh',
        paddingTop: 50,
        // paddingLeft: -10,
        // paddingRight:-10,
        borderColor: "#F5FFFA",
      }}
      src={cmsLogo} alt="cmsLogo"/> */}
      
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
              <h1 style={{color: "black"}}>Login</h1>

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
              <Button size="large" onClick={submitForm} type="submit"
              variant="contained" color="secondary" spacing= '10'
              endIcon={<NavigateNextIcon/>}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
        
        </div>
          
      {/* <ErrorSnackbar stateError={error} clearError={clearError}/> */}
    </Container>
  )
}