import React from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {Container, LinearProgress,Typography} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { useHistory } from 'react-router-dom'
// import { connect } from 'react-redux'

// PLACE THE SUBMIT BUTTON AT THE BOTTOM OF THE PAGE (to the bottom right)
// ALSO ADD VALIDATION TO THE FIELDS

// ** If possible try to add format validation for CNIC and Mobile Number (like they should be numbers and for CNIC
// ** it should be 13 digits without any dashes or spaces)

const useStyles = makeStyles((theme) => ({
	root: {
    flexGrow: 1,
	},
	rationGharTitle: {
    padding: "25px 0 10px 0",
    // marginTop: 10,
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
  
export default function RegistrationForm() {
  const classes = useStyles()
  let history = useHistory()

  return (
    <Container component="main" maxWidth="xs"> 
      <Typography variant="h4" className={classes.rationGharTitle}>
        Ration Registration Form
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
              <div style={{textAlign:"center"}}>
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
              </div>

              {isSubmitting && <LinearProgress />}
              <div className={classes.displayIcons}>
                <div style={{float: "left"}}>
                  <Button variant="contained" onClick={() => history.goBack()}>Back</Button>
                </div>
                <div style={{float: "right"}}>
                  <Button type="submit" variant="contained" color="primary" onClick={onSubmit} >Submit Form</Button>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Container>
    )
}