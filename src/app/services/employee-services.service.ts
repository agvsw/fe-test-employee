import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { CommonResponse } from '../models/commonResponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServicesService {

  constructor(private http: HttpClient) { }

  URL_EMPLOYEE: string = 'http://localhost:8080/employee'

  addEmployee(employee: Employee): Observable<CommonResponse<Employee>>{
    return this.http.post<CommonResponse<Employee>>(this.URL_EMPLOYEE, employee)
  }

  getAllEmployee(): Observable<CommonResponse<Employee[]>>{
    return this.http.get<CommonResponse<Employee[]>>(`${this.URL_EMPLOYEE}s`)
  }

  deleteEmployee(id: number): Observable<CommonResponse<Employee>>{
    return this.http.delete<CommonResponse<Employee>>(`${this.URL_EMPLOYEE}/${id}`)
  }

  getEmployeeById(id: number): Observable<CommonResponse<Employee>>{
    return this.http.get<CommonResponse<Employee>>(`${this.URL_EMPLOYEE}/${id}`)
  }

}
