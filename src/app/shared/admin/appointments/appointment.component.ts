import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-appointment',
  standalone: true,
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  imports: [CommonModule, NgIf, ReactiveFormsModule]
})
export class AppointmentComponent implements OnInit {
  appointmentForm!: FormGroup
  appointmentTable : any[]=[]
  constructor(private fb: FormBuilder, private appointmentService: AppointmentService) { }
  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      specialist: ['', Validators.required],
      phone: [ , [Validators.required, Validators.pattern(/^(9[4-8][0-9]|01[0-9])\d{7}$/)]],
      date: ['', Validators.required],
      problem: ['', Validators.required],
      time: ['', Validators.required],
    })
    this.getAppointment()
  }
  submit() {
    console.log('form filled');
    if (this.appointmentForm.valid) {
      this.appointmentService.postAppointment(this.appointmentForm.value).subscribe((data) => {
        console.log(data);
        console.log(this.appointmentForm.value);
        
      })
      alertify.success('Form filled successfully');
      this.appointmentForm.reset()
    }
    else {
    alertify.error('Invalid form')
    }
  }
getAppointment(){
  this.appointmentService.getAppointment().subscribe((data)=>{
    console.log('Table filled succesfully');
  this.appointmentTable= data;
  })
}
edit(){}
delete(){
  console.log('Data deleted');
}
}
