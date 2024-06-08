import { Component, OnInit } from '@angular/core';
import { AppointmentComponent } from "../../../pages/appointment/appointment.component";
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    selector: 'app-dashboard-appointment',
    standalone: true,
    templateUrl: './dashboard-appointment.component.html',
    styleUrl: './dashboard-appointment.component.css',
    imports: [AppointmentComponent,  CommonModule, NgIf, ReactiveFormsModule]
})
export class DashboardAppointmentComponent implements OnInit{
    appointmentForm! : FormGroup 
    constructor(private fb: FormBuilder){}
    ngOnInit(): void {
        this.appointmentForm = this.fb.group({
          name:['', Validators.required],
          email:['', [Validators.required, Validators.email]],
          phone:['',[Validators.required, Validators.pattern(/^(9[4-8][0-9]|01[0-9])\d{7}$/)]],
          date:['', Validators.required],
          time:['', Validators.required],
          doctor:['', Validators.required]
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
