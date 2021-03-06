import React, { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables"
import { withFirebase } from './Firebase'
import ErrorSnackbar from '../ui/ErrorSnackbar'
import { Box, Typography } from '@material-ui/core'

function ActiveRequestsList(props) {
	const [data, setData]= useState([])
	const [error, setError]= useState(null)

	function StatusBackground({value}) {
		return (
			<Box borderRadius={5} color="secondary.main" style={{
				backgroundColor: value === "In Progress" ? "#F1C231": "#009D5E",
				padding: 5,
				maxWidth: '6vw',
				textAlign: "center"
			}}>
				<Typography variant="h5" style={{fontSize: 12, fontWeight: 700}}>
					{value}
				</Typography>
			</Box>
		)
	}

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
							// formsObject[key].complete
							<StatusBackground value = {formsObject[key].complete}/>
						]
				
						tempList.push(tempData)
					})
					setData(tempList)
				}
			})
		}
		enableApp()
	}, [])

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
		"Assigned NGO",
		{name: 'NGO Contact', options: {filter: false}},
		{name: 'Status', options: {filter: false, print: false, download: true, sort: false}},
	]

	const options = {
    download: false,
    disableToolbarSelect: true,
    selectableRows:false,
		rowsPerPage: 7,
		print: false,
		searchPlaceholder: 'Search for a Request...',
}

	return (
		<div>
			<MUIDataTable
				title={
					<Typography variant="h5">
						<Box fontWeight={600}>
							Active Requests
						</Box>
					</Typography>
				}
				data={data}
				columns={columns}
				options={options}
			/>

			{error && <ErrorSnackbar stateError={"No Active Forms"}/>}
		</div>
	)
}

export default withFirebase(ActiveRequestsList)