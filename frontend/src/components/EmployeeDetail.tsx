import { useEffect, useState } from "react"
import api from "../utils/api"
import { useParams } from "react-router-dom"
import { Employee } from "../models/Models"

export const EmployeeDetail = () => {

	const [employee, setEmployee] = useState<Employee | undefined>()
	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		(async () => {
			try {
				setEmployee(await api.getEmployee(id))
			}
			catch (ex) {
				console.error(ex)
			}
		})()
	}, [id])

	if (!employee) {
		return <p>Loading...</p>
	}

	return (
		<>
		<h2>{employee.name}</h2>
		<ul>
			<li className="emp_det">{"Bio: "+employee.bio}</li>
			<li className="emp_det">{"DOB: "+(employee.birthday).toString().slice(0,10)}</li>
		</ul>
		</>)
}