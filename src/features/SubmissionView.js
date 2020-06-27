import React from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Container, LinearProgress,Typography, Box} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { useHistory } from 'react-router-dom'
// import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
	},
	formTitle: {
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

export default function SubmissionView() {
  const classes = useStyles()
  let history = useHistory()

	return (
		<Container component="main" maxWidth="xs"> 
      <Typography variant="h4" className={classes.formTitle}>
        Form Submitted
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
          <Form style={{paddingBottom: "15%"}}>
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
            <div className={classes.displayIcons}>
              <div style={{float: "right"}}>
                <Button type="submit" variant="contained" color="primary" onClick={onSubmit}>Close Form</Button>
              </div>
            </div>
          </Form>
          )
        }}
      </Formik>
		</Container>
		)
}