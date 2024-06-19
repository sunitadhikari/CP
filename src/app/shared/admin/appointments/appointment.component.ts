import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    selector: 'app-appointment',
    standalone: true,
    templateUrl: './appointment.component.html',
    styleUrl: './appointment.component.css',
    imports: [  CommonModule, NgIf, ReactiveFormsModule]
})
export class AppointmentComponent implements OnInit{
    appointmentForm! : FormGroup 
    constructor(private fb: FormBuilder){}
    ngOnInit(): void {
        this.appointmentForm = this.fb.group({
          username:['', Validators.required],
          email:['', [Validators.required, Validators.email]],
          specialist:['', Validators.required],
          phone:[ 0 ,[Validators.required, Validators.pattern(/^(9[4-8][0-9]|01[0-9])\d{7}$/)]],
          date:['', Validators.required],
          problem:['', Validators.required],
          time:['', Validators.required],
        })
    }
    submit(){
    if(this.appointmentForm.valid){
      console.log('Form Submitted', this.appointmentForm.value);
    }
    else{
      console.log('Form is not valid');
    }
    }

}
