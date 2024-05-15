import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  apiUrl:string = environment.api_url

  private registerApi  = environment.api_url + "userSignup"

  postSignup(data:any):Observable <any>{
    return this.http.post(this.registerApi, data);
  }
}
