import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-doctor',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './dashboard-doctor.component.html',
  styleUrl: './dashboard-doctor.component.css'
})
export class DashboardDoctorComponent implements OnInit {
  doctorAddForm!: FormGroup
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.doctorAddForm = this.fb.group({
      doctorName: ['',Validators.required],
      specialist: ['', [Validators.required]],
      day: ['', [Validators.required]],
      time: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      description:['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
  }
  submit() {
    console.log(this.doctorAddForm.value);
    if (this.doctorAddForm.valid) {
      console.log('Doctor form submitted', this.doctorAddForm.value);
    }
    else {
      console.log('failed to create form');
    }
  }
}
