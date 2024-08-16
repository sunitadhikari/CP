import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../core/service/patient/patient.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
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

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.reportForm = this.fb.group({
      patient: ['', Validators.required],
      date: ['', Validators.required],
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
      console.log(this.reportForm.value);
      // Handle form submission logic here
    }
  }
}