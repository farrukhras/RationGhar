import React, { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables"
import { Button } from '@material-ui/core'
import { withFirebase } from './Firebase'
import ErrorSnackbar from '../ui/ErrorSnackbar'
import SubmissionView from './SubmissionView'
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

function AllRequestsList(props) {
	const [data, setData]= useState([])
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)
	const [currAssignedUser, setCurrAssignedUser] = useState("")
	const [open, setOpen] = useState(false)
	const classes = useStyles()
	const [cnicUser, setCnicUser] = useState("")
	const [currFormData, setCurrFormData] = useState({})
	const [emptyList, setEmptyList] = useState(null)

	var currUser = ""
	var currUserName = ""
	var currMobNum = ""

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
					// console.log("Forms not Present")
				} else {
					Object.keys(formsObject).map(key => {
						if (formsObject[key].assignmentStatus !== "Assigned") {
							const tempData = [
								formsObject[key].cnic,
								formsObject[key].location,
								formsObject[key].salary,
								formsObject[key].assignmentStatus,
								<ViewSubmission 
									name={formsObject[key].name}
									cnic={formsObject[key].cnic} 
									number={formsObject[key].number} 
									location={formsObject[key].location} 
									salary={formsObject[key].salary} 
									occupation={formsObject[key].occupation} 
									numFam={formsObject[key].familyNumber}
								/>,
								<SelectButton cnic={formsObject[key].cnic} formData={formsObject[key]}/>
							]
							
							tempList.push(tempData)
						}
					})
					setData(tempList)
				}
			})
		}
		enableApp()
	}, [])
	
	async function handleClick({cnic, formData}) {
		setSuccess(false)

		await props.firebase.users().once('value', snapshot => {
			const usersObject = snapshot.val()
			
			if (usersObject === null) {
				console.log("User Not Preset")
			} else {
				if (props.firebase.auth.currentUser !== null) {
					const currUserId = props.firebase.auth.currentUser.uid

					Object.keys(usersObject).map(key => {
						if (currUserId === key) {
							console.log(currUserId)
							currUser = currUserId
							currUserName = usersObject[key].name
							currMobNum = usersObject[key].number
							setCurrAssignedUser(usersObject[key].name)
						}
					})
				}
			}
		})

		return props.firebase
		.form(cnic)
		.set({
			...formData,
			assignedTo: currUser,
			assignedToNGOName: currUserName,
			ngoNum: currMobNum,
			assignmentStatus: "Assigned"
		})
		.then(() => {
			setSuccess(true)
		})
		.catch(error => {
			setError(error)
		})
	}
	
	function SelectButton({cnic, formData}) {
		return (
			<div>
				<Button 
					color="primary"
					size="small"
					variant = "contained"
					onClick={() => handleClick({cnic, formData})}
				>
					Select Request
				</Button>
			</div>
		)
	}
	
	function ViewSubmission({name, cnic, number, location, salary, occupation, numFam}) {
		return (
			<div>
				<Button 
					color="primary" 
					size="small"
					variant = "contained"
					onClick={() => {handleClickOpen(name, cnic, number, location, salary, occupation, numFam)}}
				>
					view form
				</Button>
			</div>
		)
	}
	

	const columns = ["ID", "Location", "Salary", "Status", "", ""]
	
	const options = {
    download: false,
    disableToolbarSelect: true,
    selectableRows:false,
		rowsPerPage: 10,
		print: false
}

	return (
		<div>
			<MUIDataTable
				title={"All Requests"}
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

			{success && <ErrorSnackbar stateError={`Assigned To ${currAssignedUser}`}/>}
			{error && <ErrorSnackbar stateError={error.message}/>}
			{emptyList && <ErrorSnackbar stateError={"No Active Forms"}/>}
		</div>
	)
}

export default withFirebase(AllRequestsList)