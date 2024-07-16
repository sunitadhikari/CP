import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: string;
  contactNumber: string;
  address: string;
  medicalHistory: string;
  department: string;
  bedNumber: string;
  admittedAt: Date;
  isActive: boolean;
}

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit{
  patients: any[] = []; 
constructor(private fb:FormBuilder,private appointmentList:AppointmentService,private http: HttpClient){
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
      this.fetchAdmittedPatients()
  }
  fetchAdmittedPatients(): void {
    const apiUrl = 'http://localhost:3000/admittedpatientbyDepartment';

    this.http.get<{ patient: Patient[] }>(apiUrl).subscribe(
      (response) => {
        this.patients = response.patient;
      },
      (error) => {
        console.error('Error fetching admitted patients:', error);
        // Handle error scenario as per your application's requirements
      }
    );
  }
  submit(){}
}
