import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from '../../../core/service/report-service/report.service';

@Component({
  selector: 'app-dashboard-report',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dashboard-report.component.html',
  styleUrl: './dashboard-report.component.css'
})
export class DashboardReportComponent implements OnInit{
  userRole:string|null |undefined;
  doctorDischargeReportForm!: FormGroup;
  hospitalDischargeReportForm!: FormGroup;
  constructor(private fb:FormBuilder,private reportservice:ReportService){}

  ngOnInit(): void {
    this.userRole= localStorage.getItem('userRole')
    this.doctorDischargeReportForm = this.fb.group({
      patientName: ['', Validators.required],
      patientAge: ['', Validators.required],
      diagnosis: ['', Validators.required],
      treatmentGiven: ['', Validators.required],
      dischargeInstructions: ['', Validators.required],
      followUpPlan: ['', Validators.required]
    });

    this.hospitalDischargeReportForm = this.fb.group({
      patientName: ['', Validators.required],
      patientAge: ['', Validators.required],
      patientGender: ['', Validators.required],
      admissionDate: ['', Validators.required],
      dischargeDate: ['', Validators.required],
      finalDiagnosis: ['', Validators.required],
      summaryOfTreatment: ['', Validators.required],
      dischargeMedications: ['', Validators.required],
      followUpInstructions: ['', Validators.required]
    });
}
submitDoctorReport(): void {
  if (this.doctorDischargeReportForm.valid) {
    this.reportservice.postDoctorReport(this.doctorDischargeReportForm.value)
      .subscribe(
        (response) => {
          console.log('Doctors discharge report submitted successfully:', response);
          this.doctorDischargeReportForm.reset();
        },
        (error) => {
          console.error('Error submitting doctors discharge report:', error);
        }
      );
  }
}

submitHospitalReport(): void {
  if (this.hospitalDischargeReportForm.valid) {
    this.reportservice.postHospitalReport(this.hospitalDischargeReportForm.value)
      .subscribe(
        (response) => {
          console.log('Hospital discharge report submitted successfully:', response);
          this.hospitalDischargeReportForm.reset();
        },
        (error) => {
          console.error('Error submitting hospital discharge report:', error);
        }
      );
  }
}
}
