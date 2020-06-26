import React from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Container, LinearProgress,Typography, Box} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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

export default function SubmissionView() {
	const classes = useStyles()
	return (
		<Container component="main" maxWidth="xs"> 
      <Typography variant="h4" className={classes.rationGharTitle}>
      <Box fontWeight={700} textAlign="center">
        Form Submitted
      </Box>
      </Typography>
      <Formik
      validateOnChange={false} validateOnBlur={true}
      initialValues = {{
        name: '',
        cnic: '',
        phoneNumber: '',
        location:'',
        salary:'',
        occupation:'',
        familyMembersNumber:'',
      }}
      validationSchema = {Yup.object({
        name: Yup.string()
        .required('Required'),
        cnic: Yup.string()
        .required('Required')
        ,
        phoneNumber: Yup.string()
        .required('Required'),
        
        location: Yup.string()
        .required('Required')
        ,
        salary: Yup.string()
        .required('Required')
        ,
        occupation: Yup.string()
        .required('Required')
        ,
        familyMembersNumber: Yup.string()
        .required('Required')
        ,
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
          label="Salary"
          name="salary"
          ></Field>
          <br/>

          <Field
          component={TextField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Occupation"
          name="occupation"
          ></Field>
          <br/>
          
          <Field
          component={TextField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Number of family members"
          name="familyMembersNumber"
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