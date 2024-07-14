import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  apiUrl: string = environment.api_url

  private registerApi = environment.api_url + "userSignup"
  private getUserRegister = environment.api_url + "getUserSignup"
  private postLogin = environment.api_url + "signin"

  postRegister(data: any): Observable<any> {
    return this.http.post(this.registerApi, data);
  }

  getRegister(): Observable<any> {
    return this.http.get(this.getUserRegister)
  }
  postUserLogin(data: any): Observable<any> {
    return this.http.post(this.postLogin, data)
  }
}
