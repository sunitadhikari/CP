import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient) { }
  api_url : String = environment.api_url
  private postScheduleUrl = environment.api_url + '/postSchedule'
  private getScheduleUrl = environment.api_url +'/getSchedule'

  postSchedule(data:any):Observable<any>{
   return this.http.post(this.postScheduleUrl, data)
  }
  getSchedule():Observable<any>{
    return this.http.get(this.getScheduleUrl)
  }
}
