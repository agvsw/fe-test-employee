import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeServicesService } from '../../services/employee-services.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private router: Router, private employeeService: EmployeeServicesService) { }

  employees: Employee [] = [];
  idDeleted: number;
  page: number = 1;
  size: number = 10;

  ngOnInit(): void {
    this.getAccount({
      page: this.page, 
      size: this.size
    })
  }

  async getAccount(params){
    let response = await this.employeeService.getAllEmployee().toPromise();
    if (response.responseCode === 20){
      this.employees = response.data;
    }    
  }

  setIdDelete(id){
    this.idDeleted = id;
  }

  async deleteEmployee(){
  
    let response = await this.employeeService.deleteEmployee(this.idDeleted).toPromise();
    
    this.ngOnInit();
  }
  
  editEmployee(id, data){
    this.router.navigate([`/form`], {
      queryParams: {
        id
      },
      state: data
    })
  }

  addEmployee(){
    this.router.navigate(['/form'])
  }

}
