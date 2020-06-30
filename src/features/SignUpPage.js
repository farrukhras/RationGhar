import React, { useState } from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import {Container,Typography} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { useHistory, withRouter } from "react-router-dom"
import { compose } from 'recompose'
import { withFirebase } from './Firebase'
import Fab from '@material-ui/core/Fab'
import ErrorSnackbar from '../ui/ErrorSnackbar'
// import ChatBot from 'react-simple-chatbot';
import homebg from './home.jpg'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
    position: 'absolute',
    minWidth: '100%',
    color: theme.palette.secondary.main
	},
	rationGharTitle: {
    padding: "25px 0 10px 0",
    color: theme.palette.text.primary,
    fontWeight: 700,
    textAlign: "center",
  },
  displayIcons: {
    display: "inline-block",
    width: "100%",
    float: "left",
    padding: "5px 0 0 0"
  },
}))

function SignUpForm(props) {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const classes = useStyles()
  let history = useHistory()

  return (
    <div style={{backgroundImage: 'linear-gradient(to right, #e0c2c2 , blue)'}}>
      <img style={{width: '100vw', height: '100%', float: 'left'}} src={homebg} alt="RationGhar"/>
      
      <Container component="main" className={classes.root}>
      <Container component="main" maxWidth="sm" style={{backgroundColor: '#feffd5', borderStyle: 'solid', borderColor: '#baa5a5', marginTop: 50}}> 
      
      <Typography variant="h4" className={classes.rationGharTitle}>
          Sign Up for RationGhar
        </Typography>
      
        <Formik
          validateOnChange={false} validateOnBlur={true}
          initialValues = {{
            name: '',
            email:'',
            cnic: '',
            phoneNumber: '',
            location:'',
            password:'',
            confirmPassword:'',
          }}
          validationSchema = {Yup.object({
            name: Yup.string()
              .required('Required'),
            email: Yup.string()
              .required('Required'),
            cnic: Yup.string()
              .required('Required'),
            phoneNumber: Yup.string()
              .required('Required'),
            location: Yup.string()
              .required('Required'),
            password: Yup.string()
              .required('Required')
              .min(8,'Must be at least 8 characters')
              .max(30,'Must be at most 30 characters')
              .matches('^[a-zA-Z0-9]+$', 'All passwords must be alphanumeric (no special symbols).'),
            // confirmPassword: Yup.string()
            // .when("password",{
            //   is: val => (val && val.length > 0 ? true : false),
            //   then: Yup.string().oneOf(
            //     [Yup.ref("newPassword")],"Both passwords need to be the same."
            //   )
            // })
          })}
          onSubmit={(values, { setSubmitting }) => {
            const name = values.name
            const email = values.email
            const password = values.password
            const cnic = values.cnic
            const number = values.phoneNumber
            const location = values.location
            
            props.firebase
              .doCreateUserWithEmailAndPassword(email, password)
              .then(authUser => {
                // Create a user in the Firebase realtime database
                return props.firebase
                  .user(authUser.user.uid)
                  .set({
                    email,
                    name,
                    cnic,
                    number,
                    location,
                  })
              })
              .then(() => {
                setSuccess(!success)
                props.history.push('/login')
              })
              .catch(error => {
                values.password = ''
                values.confirmPassword = ''
                setError(error)
              })
          }}
        >
          {({submitForm, isSubmitting})=>{
            return(
              <Form style={{paddingBottom: "15%"}}>
                <div style={{textAlign:"center"}}>
                  <p>Enter the Information Required</p>
                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    label="Name"
                    name="name"
                    fullWidth
                  ></Field>
                  <br/>

                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="Email address"
                    name="email"
                  ></Field>

                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="CNIC"
                    name="cnic"
                  ></Field>
                  <br/>

                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                  ></Field>
                  <br/>

                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="Location"
                    name="location"
                  ></Field>
                  <br/>
                  
                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    name="password"
                  ></Field>
                  <br/>

                  <Field
                    component={TextField}
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                  ></Field>
                  <br/>
                </div>
                <div className={classes.displayIcons}>
                  <div style={{float: "left"}}>
                    <Fab style={{backgroundColor: "#C3073F"}} color="primary" variant="contained" onClick={() => history.goBack()}><h3>Back</h3></Fab>
                  </div>
                  <div style={{float: "right"}}>
                    <Fab style={{backgroundColor: "#C3073F"}} variant="contained" color="primary" onClick={submitForm}><h3>Sign Up</h3></Fab>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
        {/* <ChatBot
          headerTitle="Speech Synthesis"
          speechSynthesis={{ enable: true, lang: 'en' }}
          steps={[
            {
              id: '1',
              message: 'What is your name?',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Hi {previousValue}, nice to meet you!, How may i help you',
              end: true,
            },
          ]}
          style={{marginLeft: 500, marginBottom: 100}}
        /> */}
        {success && <ErrorSnackbar stateError={"Account Created Successfully!"}/>}
        {error && <ErrorSnackbar stateError={error.message}/>}
      </Container>
      </Container>
    </div>
  )
}

const SignUpPage = compose (
  withRouter,
  withFirebase,
)(SignUpForm)

export default SignUpPage