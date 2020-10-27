import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { CommonResponse } from '../models/commonResponse';
import { Position } from '../models/position.model'

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  
  constructor(private http: HttpClient) { }

  URL_POSITION: string = 'http://localhost:8080/position'

  getAllPosition(): Observable<CommonResponse<Position[]>>{
    return this.http.get<CommonResponse<Position[]>>(`${this.URL_POSITION}s`)
  }

}
