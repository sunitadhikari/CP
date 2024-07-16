import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BedService {

//   constructor(private http: HttpClient) { }
//   api_url: String = environment.api_url

//   private postBedApiUrl = environment.api_url + "postBed"
//   private getBedApiUrl = environment.api_url + "getBed"
//   private deleteApiUrl = environment.api_url + "delBed/"

//   postBed(data: any): Observable<any> {
//     return this.http.post(this.postBedApiUrl, data)
//   }
//   getBed(): Observable<any> {
//     return this.http.get(this.getBedApiUrl)
//   }
//   deleteBed(id:number):Observable<any>{
// return this.http.delete(this.deleteApiUrl + id)
//   }

private apiUrl = `${environment.api_url}beds`;
private apiUrl1 = `${environment.api_url}add-bed`;

constructor(private http: HttpClient) {}

getBeds(): Observable<any> {
  return this.http.get(this.apiUrl);
}

addBed(data: any): Observable<any> {
  return this.http.post(this.apiUrl1, data);
}

occupyBed(bedId: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${bedId}/occupy`, {});
}}
