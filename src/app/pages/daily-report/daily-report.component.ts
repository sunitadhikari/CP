import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../core/service/patient/patient.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
interface AdmittedPatient {
  _id: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  contactNumber: string;
  address: string;
  medicalHistory: string;
  department: string;
  bedNumber: string;
  admittedAt: Date;
  isActive: boolean;
}
@Component({
  selector: 'app-daily-report',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './daily-report.component.html',
  styleUrl: './daily-report.component.css'
})
export class DailyReportComponent implements OnInit {
  reportForm!: FormGroup;
  admitPatient: AdmittedPatient[] = [];
  // admitPatient: [] = [];
  selectedPatient: any;
  today: string | undefined; // Add this variable
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD

    this.reportForm = this.fb.group({
      patient: ['', Validators.required],
      date: [today, Validators.required], // Set the default value to today's date
      symptoms: ['', Validators.required],
      diagnosis: ['', Validators.required],
      treatment: ['', Validators.required]
    });

    this.fetchAdmittedPatients();
  }
  fetchAdmittedPatients(): void {
    const apiUrl = 'http://localhost:3000/admittedpatientbyDepartment';
    this.http.get<{ patient: AdmittedPatient[] }>(apiUrl).subscribe(
      (response) => {
        this.admitPatient = response.patient;
      },
      (error) => {
        console.error('Error fetching admitted patients:', error);
      }
    );
  }
  onSubmit() {
    if (this.reportForm.valid) {
      const apiUrl = 'http://localhost:3000/dailyReport';
      this.http.post(apiUrl, this.reportForm.value).subscribe(
        (response) => {
          console.log('Report submitted successfully:', response);
          // Navigate to another page or show success message
          this.router.navigate(['/reports']); // Example: Redirect to a report listing page
        },
        (error) => {
          console.error('Error submitting report:', error);
        }
      );
    }
  }
}