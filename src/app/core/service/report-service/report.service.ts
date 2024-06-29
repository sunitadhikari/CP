import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  apiUrl: String = environment.api_url

  private postHospitalReportApiUrl = environment.api_url + "hospitalDischargeReport"
  private postDoctorReportApiUrl = environment.api_url + 'doctorDischargeReport'

  postDoctorReport(data: any): Observable<any> {
    return this.http.post(this.postDoctorReportApiUrl, data)
  }
  postHospitalReport(data: any): Observable<any> {
    return this.http.post(this.postHospitalReportApiUrl, data)
  }

}
