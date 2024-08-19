import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  getSymptomsDoctor() {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }
  api_url : String = environment.api_url
  apiUrl:String = environment.api_url;

  private postScheduleApiUrl = this.apiUrl + 'postSchedule'
  private getScheduleApiUrl = this.apiUrl + 'getSchedule'
  private getschedulebyPatientApiUrl = this.apiUrl + 'getschedulebyPatient'
  private getschedulebyDoctorApiUrl = this.apiUrl + 'getschedulebyDoctor'

  postSchedule(data:any):Observable<any>{
    return this.http.post(this.postScheduleApiUrl, data)
  }
  getSchedule():Observable<any>{
    return this.http.get(this.getScheduleApiUrl)
  }
  getScheduleByPatient():Observable<any>{
    return this.http.get(this.getschedulebyPatientApiUrl)
  }
  getScheduleByDoctor():Observable<any>{
    return this.http.get(this.getschedulebyDoctorApiUrl)
  }
  deleteSchedule(id:String):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}delschedule/${id}`)
  }
  updateSchedule(id:String, data:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}updateschedule/${id}`, data)
  }
}
