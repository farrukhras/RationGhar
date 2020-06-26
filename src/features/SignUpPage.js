import React from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Container, LinearProgress,Typography, Box} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// Add 2 more fields (facebook and instagram links ke liye)
const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
	},
	rationGharTitle: {
    padding: theme.spacing(2),
    marginTop: 10,
    color: theme.palette.text.primary
	},
}))

export default function SignUpPage() {
	const classes = useStyles()
  return (
    <Container component="main" maxWidth="xs"> 
      <Typography variant="h4" className={classes.rationGharTitle}>
        <Box fontWeight={700} textAlign="center">
          Sign up for Ration Ghar
        </Box>
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
            .required('Required')
            ,
          password: Yup.string()
            .required('Required')
            .min(8,'Must be at least 8 characters')
            .max(30,'Must be atmost 30 characters')
            .matches('^[a-zA-Z0-9]+$', 'All passwords must be alphanumeric (no special symbols).'),
          confirmPassword: Yup.string()
          .when("password",{
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("newPassword")],"Both passwords need to be the same."
            )
          })
        })}
        onSubmit={(values, { setSubmitting }) => {
          // dispatch(changePassword({ name: values.name, cnic: values.cnic}))
          // .then(() => {
          //   setSubmitting(false)
          // })
          console.log("Submitted")  
        }}
      >
        {({onSubmit, isSubmitting})=>{
          return(
            <Form>
              <p>Enter the Information Required</p>

              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                label="Name"
                name="name"
                fullWidth
              ></Field>
              <br/>

              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email address"
                name="email"
              ></Field>


              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="CNIC"
                name="cnic"
              ></Field>

              <br/>

              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                name="Phone Number"
              ></Field>
              <br/>

              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Location"
                name="location"
              ></Field>
              <br/>
              
              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
              ></Field>
              <br/>

              <Field
                component={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
              ></Field>
              <br/>

              {isSubmitting && <LinearProgress />}
              <Button type="submit" variant="contained" color="primary" spacing= '10' onClick={onSubmit} >Submit Form</Button>
              {/* <Button variant="contained" spacing= '10' onClick={() => history.goBack()} style={{marginLeft: 30}}>Back</Button> */}
            
            </Form>
          )
        }}
      </Formik>
    </Container>
    )

}