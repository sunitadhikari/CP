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

private addDoctorApi = environment.api_url+ "addDoctor"
private getDoctorApi = environment.api_url + "getDoctor"

postDoctor(data:any):Observable <any>{
  return this.http.post(this.addDoctorApi, data)
}
getDoctor(value: any):Observable <any>{
  return this.http.get(this.getDoctorApi)
}

}
