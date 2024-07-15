import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SymptomsService } from '../../../core/service/symptoms/symptoms.service';
import * as alertify from 'alertifyjs';
import { DoctorService } from '../../../core/service/admin/doctor.service';

@Component({
  selector: 'app-symptoms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './symptoms.component.html',
  styleUrl: './symptoms.component.css'
})
export class SymptomsComponent implements OnInit {
  symptomsForm!: FormGroup;
  prescriptionForm!: FormGroup;
  patientTable: any[] = [];
  doctorTable: any[] = [];
  doctorList: any[] = [];
  userRole:string|null |undefined;
  showModal: boolean = false;
  selectedPatient: any;
  // prescription: { medicine: string, suggestion: string } = { medicine: '', suggestion: '' };
  currentPatient: any = {}; // To store the current patient data
  prescription: any = {}; // To store prescription data for the current patient
  constructor(private formBuilder: FormBuilder, private symptomsService: SymptomsService,
    private doctorService:DoctorService
  ) {


  }
  ngOnInit(): void {
    this.getDocList()
    this.symptomsForm = this.formBuilder.group({
      // doctor: [''],
      symptoms: ['', [Validators.required, Validators.minLength(10)]],
      patient: ['']

    });
    this.prescriptionForm = this.formBuilder.group({
      medicine: ['', Validators.required],
      suggestion: ['', Validators.required],
      patientId: [''] 
    });

    this.userRole = localStorage.getItem('userRole')
    this.getSymptomsPatient()
    this.getSymptomsDoctor()
  }
  launchModal(patient: any) {
    this.currentPatient = patient;
    this.prescription = {}; 
  }
  submitPrescription() {
    if (this.prescriptionForm.valid) {
      console.log('Prescription submitted for patient:', this.currentPatient, 'Data:', this.prescription);
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
getDocList(){
  this.doctorService.getDoctor().subscribe((res)=>{
    console.log(res);
    this.doctorList=res
  })
}
  onSubmit() {
    console.log('form correct');
    if (this.symptomsForm.valid) {
      this.symptomsService.postSymptoms(this.symptomsForm.value).subscribe((data) => {
        console.log('form valid');
      })
      alertify.success('Success')
    }
    else {
      alertify.error('Error to submit.')
    }
  }
  getSymptomsPatient() {
    this.symptomsService.getSymptomsPatient().subscribe((response) => {
      console.log(response);
      this.patientTable = response.data;
    })
  }
  getSymptomsDoctor(){
    this.symptomsService.getSymptomsDoctor().subscribe((data)=>{
      console.log(data);
      this.doctorTable = data.data
    })
  }
  edit() { }
  delete() { }
}