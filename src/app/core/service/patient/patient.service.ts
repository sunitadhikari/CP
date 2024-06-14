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
}

