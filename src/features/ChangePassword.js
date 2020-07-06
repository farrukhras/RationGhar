import React, { useState } from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import {Container,Typography, Box, Fab} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import ErrorSnackbar from '../ui/ErrorSnackbar'
import { compose } from 'recompose'
import { useHistory, withRouter } from "react-router-dom"
import { withFirebase } from './Firebase'
import landingbg from './landingBG.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'absolute',
    minWidth: '100%',
    color: theme.palette.secondary.main
  },
  changePasswordTitle: {
    padding: "25px 0 10px 0",
    color: theme.palette.text.primary,
    fontWeight: 700,
    textAlign: "center"
  },
	displayIcons: {
    display: "inline-block",
    width: "100%",
    float: "left",
    padding: "5px 0 0 0"
  },
}))

function ChangePasswordForm(props) {
	const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const classes = useStyles()
  const history = useHistory()

  return (
    <div>
      <img style={{width: '100vw', height: '100%', float: 'left'}} src={landingbg} alt="RationGhar"/>
      <Container component="main" className={classes.root}> 
        <Container component="main" maxWidth="sm" style={{backgroundColor: '#feffd5', borderStyle: 'solid', borderColor: '#baa5a5', marginTop: 50}}> 
          <Typography variant="h4" className={classes.changePasswordTitle}>
						Change Password
          </Typography>
          <Formik
            validateOnChange={false} 
            validateOnBlur={true}
            initialValues = {{
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            }}
            validationSchema = {Yup.object({
              currentPassword: Yup.string()
                .required('Required')
                .min(8,'Must be at least 8 characters')
                .max(30,'Must be at most 30 characters'),
              newPassword: Yup.string()
                .required('Required')
                .min(8,'Must be at least 8 characters')
                .max(30,'Must be at most 30 characters')
                .matches('^[a-zA-Z0-9]+$', 'All passwords must be alphanumeric (no special symbols).'),
              confirmPassword: Yup.string()
                .required('Required')
                .when("newPassword",{
                  is: val => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("newPassword")],"Both passwords need to be the same."
                  )
                })
            })}
            onSubmit={(values) => {
              props.firebase
                .doPasswordUpdate(values.newPassword)
                .then(() => {
                  setSuccess("Password Successfully changed!")
                  values.currentPassword = ''
                  values.newPassword = ''
                  values.confirmPassword = ''
                })
                .catch(error => {
                  setError(error)
                })
            }}
          >
            {({submitForm, isSubmitting})=>{
              return(
                <Form style={{paddingBottom: "15%"}}>
                  <div style={{textAlign:"center"}}>
                    <p style={{color: "#000000"}}>Minimum 8 characters, maximum 30 characters and must be alphanumeric.</p>
                    <Field
                      component={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      fullWidth
                    ></Field>

                    <br/>
                    <br/>

                    <Field
                      component={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type="password"
                    ></Field>

                    <br/>
                    <br/>

                    <Field
                      component={TextField}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                    ></Field>
                    <br/>
                    <br/>
                  </div>
                  
                  <div className={classes.displayIcons}>
                    <div style={{float: "left"}}>
                      <Fab style={{backgroundColor: "#6D3E58"}} color="primary" variant="extended" onClick={() => history.goBack()}><h3>Back</h3></Fab>
                    </div>
                    <div style={{float: "right"}}>
                      <Fab style={{backgroundColor: "#6D3E58"}} variant="extended" color="primary" onClick={submitForm}><h3>Change my Password</h3></Fab>
                    </div>
                  </div>
                </Form>
              )
            }}
          
          </Formik>

          {success && <ErrorSnackbar stateError={success}/>}
          {error && <ErrorSnackbar stateError={error.message}/>}
        </Container>
      </Container>
    </div>
  )
}

const ChangePassword = compose (
  withRouter,
  withFirebase,
)(ChangePasswordForm)

export default (ChangePassword)