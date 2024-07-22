import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private baseUrl = 'http://localhost:3000'; // Adjust this as per your backend URL

  constructor(private http: HttpClient) { }

  updatePaymentStatus(itemId: string, payload: any, amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-payment-status`, { itemId, payload, amount });
  }

  saveBill(billData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save-bill`, billData);
  }
}