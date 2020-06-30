import React, { useState } from 'react'
import { Select, FormControl, MenuItem } from '@material-ui/core'
import { withFirebase } from './Firebase'
import ErrorSnackbar from '../ui/ErrorSnackbar'

function ChangeFormStatusSelect(props) {
  const [localStatus, setLocalStatus] = useState(props.formData.complete)
	const [open, setOpen] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)

  function handleChange(e) {
		const newStatus = e.target.value
		setLocalStatus(newStatus)
		
		return props.firebase
		.form(props.cnic)
		.set({
			...props.formData,
			complete: newStatus,
		})
		.then(() => {
			setSuccess(true)
		})
		.catch(error => {
			setError(error)
		})
  }

  const options = ["In Progress", "Fulfilled"]
  const statusColors = {
    "In Progress": "#F1C231",
    "Fulfilled": "#009D5E",
	}
	

  return (
    <div>
      <FormControl variant="outlined">
        <Select
          labelId = "status-label"
          id="label"
          open = {open}
          onClose={()=>setOpen(false)}
          value={localStatus}
          onOpen={()=>setOpen(true)}
          style={{height: 30, width: 200, backgroundColor: statusColors[localStatus] + '60'}}
          variant = "outlined"
          onChange={handleChange}
        >
        {
          options.map((option, index) => <MenuItem key={index} value={option}>{option}</MenuItem>)
        }
        </Select>
      </FormControl>

			{success && <ErrorSnackbar stateError={`Form Status Changed Successfully to "${localStatus}"`}/>}
			{error && <ErrorSnackbar stateError={error.message}/>}
    </div>
  )
}

export default withFirebase(ChangeFormStatusSelect)