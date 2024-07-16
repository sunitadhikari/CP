import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../core/service/patient/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admit-patient',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './admit-patient.component.html',
  styleUrl: './admit-patient.component.css'
})
export class AdmitPatientComponent implements OnInit {
  admissionForm: FormGroup;

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.admissionForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      contactNumber: ['', Validators.required],
      address: [''],
      medicalHistory: ['']
    });
  }

  ngOnInit(): void {}

  submitAdmissionForm(): void {
    if (this.admissionForm.valid) {
      this.patientService.createPatientAdmission(this.admissionForm.value).subscribe(
        (data) => {
          console.log('Patient created successfully:', data);
          // Reset form after successful submission
          this.admissionForm.reset();
        },
        (error) => {
          console.error('Error creating patient:', error);
        }
      );
    } else {
      console.error('Invalid admission form');
    }
  }
}