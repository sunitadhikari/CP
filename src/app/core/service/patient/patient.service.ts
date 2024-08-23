import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  apiUrl: String = environment.api_url

  private postPatientApi = environment.api_url + "postPatient"
  private getPatientApi = environment.api_url + 'getPatient'
  private getBedStatusApi = environment.api_url + 'bedsStatus'
  private dischargePatientsApi = environment.api_url + 'patients'

  postPatient(data: any): Observable<any> {
    return this.http.post(this.postPatientApi, data)
  }
  getPatient(): Observable<any> {
    return this.http.get(this.getPatientApi)
  }


  getAllPatientsAdmission(): Observable<any> {
    return this.http.get(`${this.apiUrl}patients`);
  }
  
  // Get a patient by ID
  getPatientAdmissionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}patients/${id}`);
  }

  // Create a new patient
  createPatientAdmission(patientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}patients`, patientData);
  }

  // Update a patient
  // updatePatientAdmission(id: string, patientData: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}patients/${id}`, patientData);
  // }
  updatePatientAdmission(id: string, patientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}patients/${id}`, patientData);
  }
  

  // Delete a patient
  deletePatientAdmission(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}patients/${id}`);
  }
  getBedsByWardAndStatus(ward: string, occupied: boolean): Observable<any[]> {
    const params = {
      ward: ward,
      occupied: occupied.toString()
    };
    return this.http.get<any[]>(`${this.getBedStatusApi}`, { params });
  }
  dischargePatient(patientId: string, dischargeDate: Date): Observable<any> {
    const body = { dischargeDate: dischargeDate};
    return this.http.put(`${this.apiUrl}patients/${patientId}/discharge`, body);
  }

}

