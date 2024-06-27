import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorNoteService {

  constructor(private http: HttpClient) { }

  apiUrl: String = environment.api_url
  private postDoctorNoteApiUrl = this.apiUrl + 'addDoctornote'
  private getDoctorNoteApiUrl = this.apiUrl+'getDoctornote'
  private getDoctorNoteByEmailApiUrl = this.apiUrl+'getDoctornotebyEmail'
  private getDoctorNoteByDoctorApiUrl = this.apiUrl+'getDoctornotebyDoctor'

  postDoctor(data: any): Observable<any> {
    return this.http.post(this.postDoctorNoteApiUrl, data)
  }

  getDoctor():Observable<any>{
    return this.http.get(this.getDoctorNoteApiUrl)
  }
  getDoctorByEmail():Observable<any>{
    return this.http.get(this.getDoctorNoteByEmailApiUrl)
  }
  getDoctorByDoctor():Observable<any>{
    return this.http.get(this.getDoctorNoteByDoctorApiUrl)
  }
}
