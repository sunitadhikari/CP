import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomManagementService {

  constructor(private http:HttpClient) { }

  apiUrl : string = environment.api_url

  private postRoomManagement = environment.api_url + "postRoom"
  private getRoomApi = environment.api_url + "getRoom"

  postRoomManage(data:any): Observable<any>{
    return this.http.post(this.postRoomManagement,data)
  }
  getRoom(): Observable<any>{
    return this.http.get(this.getRoomApi)
  }
}
