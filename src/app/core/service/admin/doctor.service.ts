import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }
apiUrl : string = environment.api_url

private addDoctorApi = environment.api_url+ "userSignup"
private getDoctorApi = environment.api_url + "getDoctors"

postDoctor(data:any):Observable <any>{
  return this.http.post(this.addDoctorApi, data)
}
getDoctor():Observable <any>{
  return this.http.get(this.getDoctorApi)
}
deleteDoctor(id: string): Observable<any> {
  return this.http.delete<any>(`${environment.api_url}delDoctor/${id}`);
}
updateDoctor(id:string, data:any):Observable<any>{
  return this.http.put<any>(`${this.apiUrl}updateDoctor/${id}`, data);
}
}
