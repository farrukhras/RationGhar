import React, { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables"
import { Button, Box } from '@material-ui/core'
import { withFirebase } from './Firebase'
import ErrorSnackbar from '../ui/ErrorSnackbar'
import SubmissionView from './SubmissionView'
import ChangeFormStatusSelect from './ChangeCompleteStatus'
import { Dialog, AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

function AssignedRequestsList(props) {
	const [data, setData]= useState([])
	// const [error, setError] = useState(null)
	const [open, setOpen] = useState(false)
	const classes = useStyles()
	const [cnicUser, setCnicUser] = useState("")
	const [currFormData, setCurrFormData] = useState({})
	const [emptyList, setEmptyList] = useState(null)

	async function handleClickOpen(name, cnic, number, location, salary, occupation, numFam) {
		setOpen(true)

		const formD = {
			name,
			cnic,
			number,
			location,
			salary, 
			occupation,
			numFam
		}

		await setCurrFormData(formD)
		await setCnicUser(cnic)
  }

  function handleClose() {
    setOpen(false)
  }

	useEffect(() => {
		async function enableApp() {
			await props.firebase.forms().once('value', snapshot => {
				const formsObject = snapshot.val()
				
				const tempList = []
				
				if (formsObject === null) {
					setEmptyList(!emptyList)
				} else {
					Object.keys(formsObject).map(key => {
						if (props.firebase.auth.currentUser !== null) {
							const currUserId = props.firebase.auth.currentUser.uid

							if (formsObject[key].assignmentStatus === "Assigned" && currUserId === formsObject[key].assignedTo) {
								const tempData = [
									formsObject[key].cnic,
									formsObject[key].location,
									formsObject[key].salary,
									<ChangeFormStatusSelect cnic={formsObject[key].cnic} formData={formsObject[key]}/>,
									<ViewSubmission 
										name={formsObject[key].name}
										cnic={formsObject[key].cnic} 
										number={formsObject[key].number} 
										location={formsObject[key].location} 
										salary={formsObject[key].salary} 
										occupation={formsObject[key].occupation} 
										numFam={formsObject[key].familyNumber}
									/>
								]

								tempList.push(tempData)
							} 
						}
					})
					setData(tempList)
				}
			})
		}
		enableApp()
	}, [])
	
	function ViewSubmission({name, cnic, number, location, salary, occupation, numFam}) {
		return (
			<div>
				<Button 
					color="primary" 
					size="medium"
					variant = "contained"
					onClick={() => {handleClickOpen(name, cnic, number, location, salary, occupation, numFam)}}
					style={{backgroundColor: "#6D3E58"}}
				>
					view form
				</Button>
			</div>
		)
	}
	
	const columns = [
		{
			name:"ID",
			options: {
				customBodyRender: (value) => {
					return (
						<Typography style={{fontWeight: 600}}>
							{value}
						</Typography>
					)
				}
			}
		},
		'Location',
		{name: 'Salary', options: {filter: false}},
		{name: 'Status', options: {filter: false, print: false, download: true, sort: false}},
		{name: '', options: {filter: false, print: false, download: true, sort: false, viewColumns: false}},
	]

	const options = {
		download: false,
		disableToolbarSelect: true,
		selectableRows:false,
		rowsPerPage: 10,
		print: false,
		searchPlaceholder: 'Search for an Assigned Request...',
	}

	return (
		<div>
			<MUIDataTable
				title={
					<Typography variant="h5">
						<Box fontWeight={600}>
						Assigned Requests
						</Box>
					</Typography>
				}
				data={data}
				columns={columns}
				options={options}
			/>
		
			<Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Submitted Form 
            </Typography>
          </Toolbar>
        </AppBar>
        <SubmissionView cnic={cnicUser} formData={currFormData}/>
      </Dialog>

			{/* {error && <ErrorSnackbar stateError={error}/>} */}
			{emptyList && <ErrorSnackbar stateError={"No Assigned Forms"}/>}
		</div>
	)
}

export default withFirebase(AssignedRequestsList)