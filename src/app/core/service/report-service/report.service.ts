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
  private getDoctorReportApiUrl = environment.api_url + 'doctorDischargeReport'
  private getHospitalReportApiUrl = environment.api_url + 'gethospitalDischargeReport'
  private admittedpatientbyDepartmentApiUrl = environment.api_url + 'admittedpatientbyDepartment'
  // private getHospitalReportApiUrl = `${this.apiUrl}/hospitalDischargeReport`;

  postDoctorReport(data: any): Observable<any> {
    return this.http.post(this.postDoctorReportApiUrl, data)
  }
  postHospitalReport(data: any): Observable<any> {
    return this.http.post(this.postHospitalReportApiUrl, data)
  }
  getHospitalDischargeReports(): Observable<any> {
    return this.http.get<any>(this.getHospitalReportApiUrl);
  }
  getDischargeReportsByDoctor(): Observable<any> {
    return this.http.get<any>(this.getDoctorReportApiUrl);
  }
  getAdmnittedPatientReports(): Observable<any> {
    return this.http.get<any>(this.admittedpatientbyDepartmentApiUrl);
  }
// Inside your report service
getPatientById(patientId: string): Observable<any> {
  return this.http.get<any>(`apiUrldoctorDischargeReport/${patientId}`);
}

}
