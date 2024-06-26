import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  constructor(private http: HttpClient) { }

  apiUrl = environment.api_url

 private postAppointmentApiUrl = this.apiUrl   + 'postAppointment'
 private getAppointmentApiUrl = this.apiUrl + 'getAppointment'
 private getAppointmentHistoryApiUrl = this.apiUrl + 'getAppointmentHistory'
 private getAppointmentEmailApiUrl = this.apiUrl + 'appointmentsByEmail'


 postAppointment(data :any):Observable<any>{
  return this.http.post(this.postAppointmentApiUrl, data)
 }
getAppointment():Observable<any>{
return this.http.get(this.getAppointmentApiUrl)
}
getAppointmentByEmail():Observable<any>{
return this.http.get(this.getAppointmentEmailApiUrl)
}
getAppointmentHistory():Observable<any>{
return this.http.get(this.getAppointmentHistoryApiUrl)
}
 
}
