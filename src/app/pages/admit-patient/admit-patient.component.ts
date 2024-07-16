import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../core/service/patient/patient.service';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../core/service/admin/department.service';
import { BedService } from '../../core/service/bed/bed.service';
import { map } from 'rxjs';
import * as alertify from 'alertifyjs';
import { NgxPaginationModule } from 'ngx-pagination'; 



@Component({
  selector: 'app-admit-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,NgxPaginationModule],
  templateUrl: './admit-patient.component.html',
  styleUrl: './admit-patient.component.css'
})
export class AdmitPatientComponent implements OnInit {
  admissionForm: FormGroup;
  departments: string[] = [];
  beds: any[] = [];
  patients: any[] = [];
  p: number = 1;

  // constructor(private fb: FormBuilder, private patientService: PatientService,
  //   private departmentService: DepartmentService, private bedService: BedService

  constructor(private fb: FormBuilder, private bedService: BedService,
    private patientService: PatientService,
    private departmentService: DepartmentService,

  ) {
    this.admissionForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      contactNumber: ['', Validators.required],
      address: [''],
      medicalHistory: [''],
      department: ['', Validators.required],
      bedNumber: ['', Validators.required],
      admittedAt: ['']
    });
  }

  ngOnInit(): void {
    this.getDepartments();
    this.patientService.getAllPatientsAdmission().subscribe(
      data => {
        this.patients = data;
      },
      error => {
        console.error('Error fetching patients data', error);
      }
    );
  }
  getDepartments() {
    this.bedService.getBeds().subscribe(
      (data: any[]) => {
        // Filter unique departments
        const departmentsSet = new Set(data.filter(bed => bed.department).map(bed => bed.department));
        this.departments = Array.from(departmentsSet);
        console.log('Departments:', this.departments);
  
        // Filter unoccupied beds
        this.beds = data.filter(bed => !bed.occupied);
        console.log('Unoccupied Beds:', this.beds);
      },
      error => {
        console.error('Error fetching beds:', error);
      }
    );
  }
  
  // getDepartments() {
  //   this.bedService.getBeds().subscribe(
  //     (data: any[]) => {
  //       // Filter unique departments
  //       const departmentsSet = new Set(data.filter(bed => bed.department).map(bed => bed.department));
  //       this.departments = Array.from(departmentsSet);
  //       console.log('Departments:', this.departments);
  //     },
  //     error => {
  //       console.error('Error fetching beds:', error);
  //     }
  //   );
  // }
  onDepartmentChange() {
    const selectedDepartment = this.admissionForm.get('department')?.value;
    if (selectedDepartment) {
      this.bedService.getBeds().subscribe(
        (data: any[]) => {
          // Filter beds by selected department and unoccupied status
          this.beds = data.filter(bed => bed.department === selectedDepartment && !bed.occupied);
          console.log('Filtered Beds:', this.beds);
        },
        error => {
          console.error('Error fetching beds:', error);
        }
      );
    }
  }
  
  // onDepartmentChange() {
  //   const selectedDepartment = this.admissionForm.get('department')?.value;
  //   if (selectedDepartment) {
  //     this.bedService.getBeds().subscribe(
  //       (data: any[]) => {
  //         this.beds = data.filter(bed => bed.department === selectedDepartment);
  //         console.log('Beds:', this.beds);
  //       },
  //       error => {
  //         console.error('Error fetching beds:', error);
  //       }
  //     );
  //   }
  // }
  


  // submitAdmissionForm(): void {
  //   if (this.admissionForm.valid) {   
  //     const formData = this.admissionForm.value;
  //     const bedNumber = formData.bedNumber;
  //     this.patientService.createPatientAdmission(this.admissionForm.value).subscribe(
  //       (data) => {
  //         console.log('Patient created successfully:', data);
  //         // Reset form after successful submission
  //         this.admissionForm.reset();
  //       },
  //       (error) => {
  //         console.error('Error creating patient:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Invalid admission form');
  //   }
  // }
  // submitAdmissionForm(): void {
  //   if (this.admissionForm.valid) {
  //     const formData = this.admissionForm.value;
  //     const bedNumber = formData.bedNumber;

  //     // Step 1: Update bed's occupied status to true
  //     this.bedService.updateBedOccupiedStatus(bedNumber, true).subscribe(
  //       () => {
  //         // Step 2: If bed update is successful, admit the patient
  //         this.patientService.createPatientAdmission(formData).subscribe(
  //           (data) => {
  //             console.log('Patient created successfully:', data);
  //             alertify.success('Patient admitted successfully');
  //             // Reset form after successful submission
  //             this.admissionForm.reset();
  //           },
  //           (error) => {
  //             console.error('Error creating patient:', error);
  //             alertify.error('Failed to admit patient');
  //             // Handle error if patient creation fails
  //             // Optionally, roll back bed occupied status update here if needed
  //           }
  //         );
  //       },
  //       (error) => {
  //         console.error('Error updating bed status:', error);
  //         alertify.error('Failed to update bed status');
  //         // Handle error if updating bed status fails
  //       }
  //     );
  //   } else {
  //     console.error('Invalid admission form');
  //     alertify.error('Invalid form');
  //     // Handle invalid form submission
  //   }
  // }
  submitAdmissionForm(): void {
    if (this.admissionForm.valid) {
      const formData = this.admissionForm.value;
      const bedNumber = formData.bedNumber; // Ensure this matches the value in the form
  
      this.bedService.updateBedOccupiedStatus(bedNumber, true).subscribe(
        () => {
          this.patientService.createPatientAdmission(formData).subscribe(
            (data) => {
              console.log('Patient created successfully:', data);
              alertify.success('Patient admitted successfully');
              this.admissionForm.reset();
            },
            (error) => {
              console.error('Error creating patient:', error);
              alertify.error('Failed to admit patient');
            }
          );
        },
        (error) => {
          console.error('Error updating bed status:', error);
          alertify.error('Failed to update bed status');
        }
      );
    } else {
      console.error('Invalid admission form');
      alertify.error('Invalid form');
    }
  }
  
}