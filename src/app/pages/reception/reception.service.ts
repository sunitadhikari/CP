import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  constructor(private http: HttpClient) { }

  apiUrl: String = environment.api_url

  private postPatientApi = environment.api_url + "postPatient"
  private getPatientApi = environment.api_url + 'getPatient'

 
}
