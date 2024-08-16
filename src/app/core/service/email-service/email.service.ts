import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient){}
  api_url : String  = environment.api_url
  
  private sendEmialApiUrl = environment.api_url + "send-email"
  
  sendEmail(data:any): Observable<any>{
   return this.http.post(this.sendEmialApiUrl, data)
  }
 

}
