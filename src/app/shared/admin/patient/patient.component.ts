import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../../core/service/patient/patient.service';
import { CommonModule } from '@angular/common';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private patientService: PatientService) { }
  patientForm!: FormGroup
  patientList :any[]=[]

  ngOnInit(): void {
    this.patientForm = this.formBuilder
      .group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        phoneNo: [''],
        mobileNo: ['', Validators.required],
        bloodGroup: [''],
        dob: [''],
        sex: ['', Validators.required],
        address: ['', Validators.required],
        status: ['active', Validators.required],
      })
      this.patient();
  }
  submit() {
    console.log(this.patientForm.value);
    if (this.patientForm.valid) {
      this.patientService.postPatient(this.patientForm.value).subscribe((data) => {
        console.log(data);
      })
      alertify.success('Successfully Added')
      this.patientForm.reset()
    }
    else {
      alertify.error('Failed to Addd')
    }
  }
 patient(){
  this.patientService.getPatient().subscribe((data)=>{
    this.patientList =data
    console.log('data');
  })
 }

}
