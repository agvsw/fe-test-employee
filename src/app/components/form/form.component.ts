import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { DatePipe } from '@angular/common';
import { Position } from 'src/app/models/position.model';
import { PositionService } from 'src/app/services/position.service';
import { EmployeeServicesService } from '../../services/employee-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  id: number;
  positions: Position[];
  employee: any;
  formEmployee: FormGroup;
  position: Position;
  dataExist: boolean;
  routeState: any;
  emp: any;

  constructor(private router: Router,  private route: ActivatedRoute,
    private employeeService: EmployeeServicesService,
    private positionService: PositionService,
    private fb: FormBuilder,
    private datePipe: DatePipe
    ) { 
      if(this.router.getCurrentNavigation().extras.state){
        this.routeState = this.router.getCurrentNavigation().extras.state;
        if(this.routeState){
          this.emp = this.routeState
        }
      }
    }
  ngOnInit(): void {
      
      this.id = + this.route.snapshot.queryParamMap.get('id');
      this.getAllPosition();

      this.formEmployee = this.fb.group({
        name: ['', Validators.required],
        birthDate: ['', Validators.required],
        position: ['', Validators.required],
        nip: ['', Validators.required],
        gender: ['', Validators.required]
      })      
      if(this.id){
        this.setValue();
      }
  }


   setValue(){
    this.formEmployee.controls['name'].setValue(this.emp.name);
    this.formEmployee.controls['birthDate'].setValue(this.emp.birthDate);
    this.formEmployee.controls['position'].setValue(this.emp.position.id);
    this.formEmployee.controls['nip'].setValue(this.emp.idNumber);
    this.formEmployee.controls['gender'].setValue(`${this.emp.gender}`)
  }

  async getEmployee(id){
    let response = await this.employeeService.getEmployeeById(id).toPromise();
    if(response.responseCode === 20){
      this.employee = response.data;
    }
  }

  async getAllPosition(){
    let response = await this.positionService.getAllPosition().toPromise();
    if(response.responseCode === 20){
      this.positions = response.data;
    }
  }

  params: any = {
    id: '',
    name: '',
    birthDate: '',
    position: {},
    idNumber: 0,
    gender: 0,
    isDelete: 0  
  }

  async save(){
    if(this.emp){
      this.params.id = this.emp.id;
    }
    this.params.name = this.formEmployee.controls["name"].value;
    this.params.birthDate = `${this.formEmployee.controls["birthDate"].value}`;
    this.params.position = {
      id: +this.formEmployee.controls["position"].value
    };
    this.params.idNumber = +this.formEmployee.controls["nip"].value;
    this.params.gender = +this.formEmployee.controls["gender"].value;
    
  }

  async saveToService(){
    let response = await this.employeeService.addEmployee(this.params).toPromise();
    if(response.responseCode === 20){
      this.router.navigate(['/index'])
    }else{
      alert(response.responseMessage)
    }
  }

  back(){
    this.router.navigate(['/index'])
  }
}
