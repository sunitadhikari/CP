import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabTechService {
  constructor(private http: HttpClient){}
  api_url : String  = environment.api_url
  
  private postLabApiUrl = environment.api_url + "postLab"
  private getLabApiUrl = environment.api_url + "getLab"
  
  postLab(data:any): Observable<any>{
   return this.http.post(this.postLabApiUrl, data)
  }
  
  getLab():Observable<any>{
    return this.http.get(this.getLabApiUrl)
  }

}
