import React, { useState } from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import {Container ,Typography} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { useHistory, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from './Firebase'
import Fab from '@material-ui/core/Fab'
import ErrorSnackbar from '../ui/ErrorSnackbar'

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
  
function RegistrationPage(props) {
  const [error, setError] = useState(null)

  const classes = useStyles()
  let history = useHistory()

  return (
    <div style={{background: '#0C1E2A', padding: "10px"}}>
      <Container component="main" maxWidth="xs" style={{backgroundColor: 'white', borderStyle: 'solid', borderColor: '#baa5a5'}}> 
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
            familyMembersNumber: '',
          }}
          validationSchema = {Yup.object({
            name: Yup.string()
              .required('Required'),
            cnic: Yup.string()
              .required('Required'),
            phoneNumber: Yup.string()
              .required('Required'),
            location: Yup.string()
              .required('Required'),
            salary: Yup.string()
              .required('Required'),
            occupation: Yup.string()
              .required('Required'),
            familyMembersNumber: Yup.string()
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            const name = values.name
            const cnic = values.cnic
            const number = values.phoneNumber
            const location = values.location
            const salary = values.salary
            const occupation = values.occupation
            const familyNumber = values.familyMembersNumber
            const assignmentStatus = "Unassigned"
            const complete = "In Progress" 
            const assignedTo = ""
            const assignedToNGOName = ""
            const ngoNum = ""

            props.firebase
              .form(cnic)
              .set({
                name,
                cnic,
                number,
                location,
                salary, 
                occupation,
                familyNumber,
                assignmentStatus,
                complete,
                assignedTo,
                assignedToNGOName,
                ngoNum
              })
              .then(() => {
                setError("Form Submitted Successfully!!")
                // props.history.push('/')
              })
              .catch(error => {
                values.name = ''
                values.cnic = ''
                values.phoneNumber = ''
                values.location = ''
                values.salary = ''
                values.occupation = ''
                values.familyMembersNumber = ''
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
                    name="phoneNumber"
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

                <div className={classes.displayIcons}>
                  <div style={{float: "left"}}>
                    <Fab variant="contained" onClick={() => history.goBack()}>Back</Fab>
                  </div>
                  <div style={{float: "right"}}>
                    <Fab variant="contained" color="primary" onClick={submitForm}>Submit Form</Fab>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>

        {error && <ErrorSnackbar stateError={error}/>}
      </Container>
    </div>
    )
}

const RegistrationForm = compose (
  withRouter,
  withFirebase,
)(RegistrationPage)

export default RegistrationForm