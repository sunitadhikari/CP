import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WardService {

  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  getAllWards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}getwards`);
  }
  getAllWardsCount(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getwards/count`);
  }

  createWard(wardData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}postWards`, wardData);
  }
  updateWard(id: string, ward: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}editWard/${id}`, ward);
  }

  deleteWard(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}deleteWard/${id}`);
  }
}