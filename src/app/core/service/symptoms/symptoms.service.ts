import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  constructor(private http: HttpClient) { }

  api_Url: String = environment.api_url

  private postSymptomsApiUrl = this.api_Url + 'postSymptoms'
  private getSymptomsApiUrl = this.api_Url + 'getSymptomsbyDoctor'
  private getSymptomsPatientApiUrl = this.api_Url + 'getsymptomsbypatient`'

  postSymptoms(data: any): Observable<any> {
    return this.http.post(this.postSymptomsApiUrl, data)
  }
  getSymptomsDoctor(): Observable<any> {
    return this.http.get(this.getSymptomsApiUrl)
  }
  getSymptomsPatient(): Observable<any> {
    return this.http.get(this.getSymptomsPatientApiUrl)
  }
}
