import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit{
constructor(private fb:FormBuilder,private appointmentList:AppointmentService){
  this.appointmentList.getAppointmentsByDoctorEmail().subscribe((res)=>{
    console.log(res);
  })

}
  patientAdd! : FormGroup
  ngOnInit(): void {
      this.patientAdd=this.fb.group({
        firstName:['', Validators.required],
        lastName:['', Validators.required],
        dob:['', Validators.required],
        email:['', [Validators.required, Validators.email]],
        mobile:['', [Validators.required, Validators.pattern(/^(9[4-8][0-9]|01[0-9])\d{7}$/)]],
        address:['', Validators.required],
        sex:['', Validators.required],
        bloodGroup:['', Validators.required],


      }) 
  }
  submit(){}
}
