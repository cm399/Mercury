
import { Department, Employee } from '../models/Models'
import { HTTPMethod, Service, Request, request } from './_abstract'



const Requests = {
    departments: new Request<Department[]>(HTTPMethod.get, "v1/departments"),
    employees: new Request<Employee[]>(HTTPMethod.get, 'v1/employees'),
}

class Backend implements Service {
    baseUrl = process.env.REACT_APP_API_HOST

    async listEmployees(): Promise<Employee[]> {
        return request(this, Requests.employees).call()
    }
    
    async getEmployee(id: string): Promise<Employee> {
        const employee = new Request<Employee>(HTTPMethod.get, `v1/employee/${id}`)
        return request(this, employee).call()
    }

    async listDepartments(): Promise<Department[]> {
        return request(this, Requests.departments).call()
    }

    async listEmployeesInDepartment(departmentId: string): Promise<Employee[]> {
       const  employeesInDepartment = new Request<Employee[]>(HTTPMethod.get, `v1/departments/${departmentId}`)
        return request(this, employeesInDepartment).call()
    }

}


export default new Backend()