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

  postPatient(data: any): Observable<any> {
    return this.http.post(this.postPatientApi, data)
  }
  getPatient(): Observable<any> {
    return this.http.get(this.getPatientApi)
  }


  getAllPatientsAdmission(): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients`);
  }

  // Get a patient by ID
  getPatientAdmissionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/${id}`);
  }

  // Create a new patient
  createPatientAdmission(patientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}patients`, patientData);
  }

  // Update a patient
  updatePatientAdmission(id: string, patientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}patients/${id}`, patientData);
  }

  // Delete a patient
  deletePatientAdmission(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/patients/${id}`);
  }
}

