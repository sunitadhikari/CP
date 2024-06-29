import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }
  apiUrl: string = environment.api_url
  private departmentApiUrl = environment.api_url + "addDepartment"
  private getDepartmentApiUrl = environment.api_url + "getDepartment"

  postDepartment(data: any): Observable<any> {
    return this.http.post(this.departmentApiUrl, data)
  }
  getDepartment():Observable<any> {
    return this.http.get(this.getDepartmentApiUrl)
  }
  deleteDepartment(id:string):Observable<any>{
    return this.http.delete<any>(environment.api_url+(`delDepartment/${id}`))
  }
}
