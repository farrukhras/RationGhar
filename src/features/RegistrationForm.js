import React, { useState } from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import {Container ,Typography} from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { useHistory, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from './Firebase'
import ErrorSnackbar from '../ui/ErrorSnackbar'
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
  const history = useHistory()

  return (
    <div>
      <img style={{width: '100vw', height: '100%', float: 'left'}} src={homebg} alt="RationGhar"/>
      
      <Container component="main" className={classes.root}>
        <Container component="main" maxWidth="sm" style={{backgroundColor: '#feffd5', borderStyle: 'solid', borderColor: '#baa5a5', marginTop: 50}}> 
          <Typography variant="h4" className={classes.rationGharTitle}>
            Ration Registration Form
          </Typography>
          <Formik
            validateOnChange={false} 
            validateOnBlur={true}
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
              cnic: Yup.number()
              .typeError('CNIC must be a number')
              .required('Required'),
              phoneNumber: Yup.number()
                .typeError('Phone must be a number')
                .required('Required'),
              location: Yup.string()
                .required('Required'),
              salary: Yup.number()
                .typeError('Salary must be a number')
                .required('Required'),
              occupation: Yup.string()
                .required('Required'),
              familyMembersNumber: Yup.number()
                .typeError('Must be a number')
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
                    <p style={{color: "#000000"}}>Enter the Information Required</p>
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
                      label="Salary"
                      name="salary"
                    ></Field>
                    <br/>

                    <Field
                      component={TextField}
                      variant="filled"
                      margin="normal"
                      required
                      fullWidth
                      label="Occupation"
                      name="occupation"
                    ></Field>
                    <br/>
                    
                    <Field
                      component={TextField}
                      variant="filled"
                      margin="normal"
                      required
                      fullWidth
                      label="Number of family members"
                      name="familyMembersNumber"
                    ></Field>
                    <br/>
                  </div>

                  <div className={classes.displayIcons}>
                    <div style={{float: "left", width: '200'}}>
                      <Button variant="contained" size="large" color="primary" style={{backgroundColor: '#C3073F'}} onClick={() => history.goBack()}>Back</Button>
                    </div>
                    <div style={{float: "right"}}>
                      <Button variant="contained" size="large" color="primary" style={{backgroundColor: '#C3073F'}} onClick={submitForm}>Submit Form</Button>
                    </div>
                  </div>
                </Form>
              )
            }}
          </Formik>

          {error && <ErrorSnackbar stateError={error}/>}
        </Container>
      </Container>
    </div>
    )
}

const RegistrationForm = compose (
  withRouter,
  withFirebase,
)(RegistrationPage)

export default RegistrationForm