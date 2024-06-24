import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BedService {

  constructor(private http: HttpClient) { }
  api_url: String = environment.api_url

  private postBedApiUrl = environment.api_url + "postBed"
  private getBedApiUrl = environment.api_url + "getBed"
  private deleteApiUrl = environment.api_url + "delBed"

  postBed(data: any): Observable<any> {
    return this.http.post(this.postBedApiUrl, data)
  }
  getBed(): Observable<any> {
    return this.http.get(this.getBedApiUrl)
  }
  deleteBed(id:number):Observable<any>{
return this.http.delete(this.deleteApiUrl + id)
  }
}
