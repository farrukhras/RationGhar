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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  changePasswordTitle: {
    padding: theme.spacing(2),
    marginTop: 10,
    color: theme.palette.text.primary
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
    <Container component="main" maxWidth="xs"> 
      <Typography variant="h4" className={classes.changePasswordTitle}>
        <Box fontWeight={700} textAlign="center">
          Change Password
        </Box>
      </Typography>
      <Formik
        validateOnChange={false} validateOnBlur={true}
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
            <Form>
              <p>Minimum 8 characters, maximum 30 characters and must be alphanumeric.</p>

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
							<div className={classes.displayIcons}>
								<div style={{float: "left"}}>
									<Fab style={{backgroundColor: "#C3073F90"}} color="primary" variant="contained" onClick={() => history.goBack()}><h3>Back</h3></Fab>
								</div>
								<div style={{float: "right"}}>
									<Fab style={{backgroundColor: "#C3073F90"}} variant="contained" color="primary" onClick={submitForm}><h3>Change my Password</h3></Fab>
								</div>
              </div>
            </Form>
          )
        }}
      
			</Formik>

			{success && <ErrorSnackbar stateError={success}/>}
			{error && <ErrorSnackbar stateError={error.message}/>}
    </Container>
  )
}

const ChangePassword = compose (
  withRouter,
  withFirebase,
)(ChangePasswordForm)

export default (ChangePassword)