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
 private getAppointmentHistoryApiUrl = this.apiUrl + 'docAppointmentsEmail'
 private getAppointmentEmailApiUrl = this.apiUrl + 'appointmentsByEmail'
 private paidAppointmentsApiUrl = this.apiUrl + 'paidAppointments'
 private updatePaymentStatusApiUrl = this.apiUrl + 'updatePaymentStatus';
 private getDoctorsByDepartmentApiUrl = this.apiUrl + 'getDoctorsByDepartment';

//  private getAppointmentsByDoctorEmailApiUrl = this.apiUrl + 'getAppointmentsByDoctorEmail'


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
paidAppointmentsHistory():Observable<any>{
return this.http.get(this.paidAppointmentsApiUrl)
}
getAppointmentsByDoctorEmail():Observable<any>{
return this.http.get(this.getAppointmentHistoryApiUrl)
}
updatePaymentStatus(id: string, payload: any): Observable<any> {
  return this.http.post(this.updatePaymentStatusApiUrl, { id, payload });
}
getDoctorsByDepartment(department: string): Observable<any> {
  return this.http.get(`${this.getDoctorsByDepartmentApiUrl}/${department}`);
}
}
