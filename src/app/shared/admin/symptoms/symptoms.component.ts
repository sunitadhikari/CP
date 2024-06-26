import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SymptomsService } from '../../../core/service/symptoms/symptoms.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-symptoms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './symptoms.component.html',
  styleUrl: './symptoms.component.css'
})
export class SymptomsComponent implements OnInit {
  symptomsForm!: FormGroup;
  patientTable: any[] = []
  doctorTable: any[] = []

  userRole:string|null |undefined;
  constructor(private formBuilder: FormBuilder, private symptomsService: SymptomsService) {

  }
  ngOnInit(): void {
    this.symptomsForm = this.formBuilder.group({
      doctor: [''],
      symptoms: ['', [Validators.required, Validators.minLength(10)]],
      patient: ['']

    });
    this.userRole = localStorage.getItem('userRole')
    this.getSymptomsPatient()
    this.getSymptomsDoctor()
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
      this.doctorTable = data
    })
  }
  edit() { }
  delete() { }
}