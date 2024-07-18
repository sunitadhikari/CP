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
private apiUrl2 = `${environment.api_url}getCountbeds`;

constructor(private http: HttpClient) {}

getBeds(): Observable<any> {
  return this.http.get(this.apiUrl);
}
getBedsCounts(): Observable<any> {
  return this.http.get(this.apiUrl2);
}
getBedsByWard(ward: string): Observable<any[]> {
  const params = {
    ward: ward
  };
  return this.http.get<any[]>(`${this.apiUrl}`, { params });
}

addBed(data: any): Observable<any> {
  return this.http.post(this.apiUrl1, data);
}
updateBedOccupiedStatus(bedId: string, occupied: boolean): Observable<any> {
  const url = `${this.apiUrl}/${bedId}/update-occupied-status`;
  return this.http.put(url, { occupied });
}
occupyBed(bedId: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${bedId}/occupy`, {});
}}
