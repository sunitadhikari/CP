import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../core/service/patient/patient.service';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../core/service/admin/department.service';
import { BedService } from '../../core/service/bed/bed.service';
import { map } from 'rxjs';
import * as alertify from 'alertifyjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { WardService } from '../../core/service/ward-service/ward.service';
import { UserService } from '../../core/service/user/user.service';



@Component({
  selector: 'app-admit-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  templateUrl: './admit-patient.component.html',
  styleUrl: './admit-patient.component.css'
})
export class AdmitPatientComponent implements OnInit {
  admissionForm: FormGroup;
  beds: any[] = [];
  patients: any[] = [];
  departmentsData: any[] = [];
  wards: any[] = [];
  wardsData: any[] = [];
  doctors: any[] = [];
  filteredDoctors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private bedService: BedService,
    private patientService: PatientService,
    private departmentService: DepartmentService,
    private wardService: WardService,
    private userService: UserService
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
      ward: ['', Validators.required],
      bedNumber: ['', Validators.required],
      checkedBy: ['', Validators.required],
      admittedAt: [new Date()]
    });
  }

  ngOnInit(): void {
    this.fetchData();
    this.getDepartments();
    this.fetchDoctors();
    this.fetchDepartments();
    this.onDepartmentChangeData();
  }

  fetchDepartments() {
    this.departmentService.getDepartment().subscribe((data: any) => {
      this.departmentsData = data; 
    });
    this.wardService.getAllWards().subscribe((data)=>{
      this.wardsData=data
    })
    this.patientService.getAllPatientsAdmission().subscribe((res)=>{
      this.patients=res
    })
  }


  fetchDoctors() {
    this.userService.getDoctors().subscribe((data: any) => {
      this.doctors = data.doctors;
    });
  }

  onDepartmentChangeData() {
    this.admissionForm.get('department')?.valueChanges.subscribe(selectedDepartment => {
      this.filteredDoctors = this.doctors.filter(doctor => doctor.department === selectedDepartment);
      this.admissionForm.get('checkedBy')?.setValue(''); // Reset checkedBy selection
    });
  }

  fetchData(): void {
    this.bedService.getBeds().subscribe(
      (data: any[]) => {
        // Filter unoccupied beds
        this.beds = data.filter(bed => !bed.occupied);
      },
      error => {
        console.error('Error fetching beds:', error);
      }
    );
  }

  getDepartments() {
    this.bedService.getBeds().subscribe(
      (data: any[]) => {
        // Filter unique departments
        const departmentsSet = new Set(data.filter(bed => bed.ward).map(bed => bed.ward));
        this.wards = Array.from(departmentsSet);

        // Filter unoccupied beds
        this.beds = data.filter(bed => !bed.occupied);
      },
      error => {
        console.error('Error fetching beds:', error);
      }
    );
  }

  onDepartmentChange(): void {
    const selectedWard = this.admissionForm.get('ward')?.value;
    if (selectedWard) {
      this.bedService.getBeds().subscribe(
        (data: any[]) => {
          // Filter beds by selected ward and unoccupied status
          this.beds = data.filter(bed => bed.ward === selectedWard && !bed.occupied);
        },
        error => {
          console.error('Error fetching beds:', error);
        }
      );
    }
  }

  submitAdmissionForm(): void {
    if (this.admissionForm.valid) {
      const formData = this.admissionForm.value;
      const bedNumber = formData.bedNumber;

      this.bedService.updateBedOccupiedStatus(bedNumber, true).subscribe(
        () => {
          this.patientService.createPatientAdmission(formData).subscribe(
            () => {
              alertify.success('Patient admitted successfully');
              this.admissionForm.reset();
              this.fetchData(); // Refresh data after admission
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
  editAdmit(){

  }
  deleteAdmit(){}
}