import React, { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables"
import { withFirebase } from './Firebase'
import ErrorSnackbar from '../ui/ErrorSnackbar'

function ActiveRequestsList(props) {
	const [data, setData]= useState([])
	const [error, setError]= useState(null)

	useEffect(() => {
		async function enableApp() {
			await props.firebase.forms().once('value', snapshot => {
				const formsObject = snapshot.val()
				
				const tempList = []
				
				if (formsObject === null) {
					setError(!error)
					// console.log("Forms not Present")
				} else {
					Object.keys(formsObject).map(key => {
						const tempData = [
							formsObject[key].cnic,
							formsObject[key].location,
							formsObject[key].assignedToNGOName === "" ? "none" : formsObject[key].assignedToNGOName,
							formsObject[key].ngoNum === "" ? "none" : formsObject[key].ngoNum,
							formsObject[key].complete
						]
				
						tempList.push(tempData)
					})
					setData(tempList)
				}
			})
		}
		enableApp()
	}, [])

	const columns = ["ID", "Location", "Assigned NGO", "NGO Contact", "Status"]

	const options = {
    download: false,
    disableToolbarSelect: true,
    selectableRows:false,
		rowsPerPage: 7,
		print: false
}

	return (
		<div>
			<MUIDataTable
				title={"Active Request List"}
				data={data}
				columns={columns}
				options={options}
			/>
			{error && <ErrorSnackbar stateError={"No Active Forms"}/>}
		</div>
	)
}

export default withFirebase(ActiveRequestsList)