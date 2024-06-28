import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient) { }

  // apiUrl:String = environment.api_url;

  // private postScheduleApiUrl = this.apiUrl + 'postSchedule'
  // private getScheduleApiUrl = this.apiUrl + 'getSchedule'
  // private getschedulebyEmailApiUrl = this.apiUrl + 'getschedulebyEmail'
  // private getschedulebyDoctorApiUrl = this.apiUrl + 'getschedulebyDoctor'

  // postSchedule(data:any):Observable<any>{
  //   return this.http.post(this.postScheduleApiUrl, data)
  // }
  // getSchedule():Observable<any>{
  //   return this.http.get(this.getScheduleApiUrl)
  // }
  // getScheduleByEmail():Observable<any>{
  //   return this.http.get(this.getschedulebyEmailApiUrl)
  // }
  // getScheduleByDoctor():Observable<any>{
  //   return this.http.get(this.getschedulebyDoctorApiUrl)
  // }
}

