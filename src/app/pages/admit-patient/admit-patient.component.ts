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
import { ConfirmationService } from '../../shared/confirmation/confirmation.service';



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
  filteredBeds: any[] = [];
  selectedWardType: string = '';
  editingPatientId : string | null = null;



  constructor(
    private fb: FormBuilder,
    private bedService: BedService,
    private patientService: PatientService,
    private departmentService: DepartmentService,
    private wardService: WardService,
    private userService: UserService,
    private confirmationService: ConfirmationService
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
    this.admissionForm.get('ward')?.valueChanges.subscribe((selectedWardType: string) => {
      this.onWardTypeChange(selectedWardType);
    });
  }

  fetchDepartments() {
    this.departmentService.getDepartment().subscribe((data: any) => {
      this.departmentsData = data.departments;
    });
    this.wardService.getAllWards().subscribe((data) => {
      this.wardsData = data
    })
    this.patientService.getAllPatientsAdmission().subscribe((res) => {
      this.patients = res.patients
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
  dischargePatient(patientId: string): void {
    const dischargeDate = new Date();
    this.patientService.dischargePatient(patientId, dischargeDate).subscribe(
      (response) => {
        console.log('Patient discharged:', response);
      },
      (error) => {
        console.error('Error discharging patient:', error);
      }
    );
  }

  // fetchData(): void {
  //   this.bedService.getBeds().subscribe(
  //     (data: any[]) => {
  //       // Filter unoccupied beds
  //       this.beds = data.filter(bed => !bed.occupied);
  //     },
  //     error => {
  //       console.error('Error fetching beds:', error);
  //     }
  //   );
  // }
  fetchData(): void {
    this.bedService.getBeds().subscribe(
      (data: any[]) => {
        // Filter out unoccupied beds
        this.beds = data.filter(bed => !bed.occupied);
        // Filter beds based on the selected ward type
        this.filterBedsByWardType();
      },
      error => {
        console.error('Error fetching beds:', error);
      }
    );
  }
  
  filterBedsByWardType(): void {
    this.filteredBeds = this.beds.filter(bed => bed.ward === this.selectedWardType);
  }
  
  onWardTypeChange(selectedWardType: string): void {
    this.selectedWardType = selectedWardType;
    this.filterBedsByWardType();
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
      this.patientService.getBedsByWardAndStatus(selectedWard, false).subscribe(
        (data: any[]) => {
          // Filter unoccupied beds
          this.beds = data;
        },
        error => {
          console.error('Error fetching beds:', error);
        }
      );
    } else {
      this.beds = [];
    }
  }
  

  // submitAdmissionForm(): void {
  //   if (this.admissionForm.valid) {
  //     const formData = this.admissionForm.value;
  //     const bedNumber = formData.bedNumber;

  //     this.bedService.updateBedOccupiedStatus(bedNumber, true).subscribe(
  //       () => {
  //         this.patientService.createPatientAdmission(formData).subscribe(
  //           () => {
  //             alertify.success('Patient admitted successfully');
  //             this.admissionForm.reset();
  //             this.fetchData(); // Refresh data after admission
  //           },
  //           (error) => {
  //             console.error('Error creating patient:', error);
  //             alertify.error('Failed to admit patient');
  //           }
  //         );
  //       },
  //       (error) => {
  //         console.error('Error updating bed status:', error);
  //         alertify.error('Failed to update bed status');
  //       }
  //     );
  //   } else {
  //     console.error('Invalid admission form');
  //     alertify.error('Invalid form');
  //   }
  // // }
  submitAdmissionForm(): void {
    if (this.admissionForm.valid) {
      const formData = this.admissionForm.value;
      
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
    } else {
      console.error('Invalid admission form');
      alertify.error('Invalid form');
    }
  }
  // submitAdmissionForm(): void {
  //   if (this.admissionForm.valid) {
  //     const formData = this.admissionForm.value;
      
  //     if (this.editingPatientId) {
  //       // If editing an existing patient
  //       this.patientService.updatePatientAdmission(this.editingPatientId, formData).subscribe(
  //         (res) => {
  //           console.log('Patient updated successfully:', res);
  //           alertify.success('Patient updated successfully');
  //           this.editingPatientId = null;
  //           this.admissionForm.reset();
  //           this.fetchData(); // Refresh data after update
  //         },
  //         (error) => {
  //           console.error('Error updating patient:', error);
  //           alertify.error('Failed to update patient');
  //         }
  //       );
  //     } else {
  //       // If adding a new patient
  //       this.patientService.createPatientAdmission(formData).subscribe(
  //         (res) => {
  //           console.log('Patient admitted successfully:', res);
  //           alertify.success('Patient admitted successfully');
  //           this.admissionForm.reset();
  //           this.fetchData(); // Refresh data after admission
  //         },
  //         (error) => {
  //           console.error('Error creating patient:', error);
  //           alertify.error('Failed to admit patient');
  //         }
  //       );
  //     }
  //   } else {
  //     console.error('Invalid admission form');
  //     alertify.error('Invalid form');
  //   }
  // }
  
  
  editPatient(patient: any): void {
    this.editingPatientId = patient._id;
    this.admissionForm.patchValue({
      firstName: patient.firstName,
      lastName: patient.lastName,
      dob: patient.dob,
      gender: patient.gender,
      contactNumber: patient.contactNumber,
      address: patient.address,
      medicalHistory: patient.medicalHistory,
      department: patient.department,
      ward: patient.ward,
      bedNumber: patient.bedNumber,
      checkedBy: patient.checkedBy
    });
  }
  
  async deleteAdmit(id: string) {
    const confirm = await this.confirmationService.showConfirmationPopup();
    if (confirm) {
      this.patientService.deletePatientAdmission(id).subscribe((res) => {
        this.confirmationService.showSuccessMessage('Delete successfully')
        this.fetchDepartments()
      },
        (error) => {
          this.confirmationService.showErrorMessage('Sorry, Cannot be deleted')
          this.fetchDepartments()

        }
      )
    }
    else {
      this.confirmationService.showErrorMessage('Delete operation cancelled.')
    }
  }
}