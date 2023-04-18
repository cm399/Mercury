import React, { useEffect, useState } from "react"
import api from "../utils/api"
import { Employee, IDepartmentDetails } from "../models/Models"
import { useParams } from "react-router-dom"



export const DepartmentDetails = () => {
	const [departmentDetails, setDepartmentDetails] = useState<IDepartmentDetails | any>()

	type Tparams = {
		id: string
	}

	const params:Tparams = useParams()

	useEffect(() => {
		(async () => {
			try {
				setDepartmentDetails(await api.listEmployeesInDepartment(params.id))
			}
			catch (ex) {
				console.error(ex)
			}
		})()

	}, [params])

	if (!departmentDetails) {
		return <p>Loading...</p>
	}
	else if (departmentDetails.length === 0) {
		return <p>No employees</p>
	}
	return (
		<>
			<h2>
				{departmentDetails.name || "No department"}
			</h2>
			<ul>
				{departmentDetails.employeeDetails.map((e: Employee) => <li key={e.id}>{e.name}</li>)}
			</ul>
		</>

	)
}