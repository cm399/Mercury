import React from "react";
import { Employee } from "../models/Models";
import api from "../utils/api";
import { Link } from "react-router-dom";

type EmployeeListProps = {};
type EmployeeListState = {
  allEmployees?: Employee[];
};

export class EmployeeList extends React.Component<
  EmployeeListProps,
  EmployeeListState
> {
  state: EmployeeListState = { };

  componentDidMount() {
	  const self = this
	  api.listEmployees()
	  .then(employees => self.setState({allEmployees: employees}))
  }

  render() {
    return (
			<div className="employee_list_page">
			<h2>Employee List</h2>
			<ul>
				{ !this.state.allEmployees && (
					<p>Fetching employees</p>
				)}
				{this.state.allEmployees?.map((employee)=> <EmployeeDetail key={employee.id} employee={employee}/>)}
			</ul>
			</div>
		);
  }
}

type EmployeeDetailProps = {
  employee: Employee;
}; 

const EmployeeDetail = ({ employee }: EmployeeDetailProps) => {
	return (
		<li className="employee_detail">
			<Link to={`employee/${employee.id}`}>{employee.name}</Link>
		</li>
	)
}
