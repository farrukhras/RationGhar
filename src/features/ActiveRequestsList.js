import React from 'react'
import MUIDataTable from "mui-datatables"

export default function ActiveRequestsList() {
	const columns = ["ID", "Location", "Assigned NGO", "NGO Contact", "Status"]

	const data = [
		["1", "Lahore", "Hamza Foundation", "0333", "Fulfilled"],
		["2", "Karachi", "Zoraiz Foundation", "0332", "In Progress"],
		["3", "Islamabad", "Ahmed Foundation", "0331", "Fulfilled"],
		["4", "Peshawar", "Farrukh Foundation", "0330", "Fulfilled"],
		["5", "Quetta", "Ramez Foundation", "0334", "In Progress"],
		["6", "Multan", "Aiyan Foundation", "0335", "In Progress"],
		["7", "Kashmir", "Raahim Foundation", "0336", "Fulfilled"],
		["8", "Lahore", "XYZ Foundation", "0337", "Fulfilled"],
	]
	
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
		</div>
	)
}