import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../core/service/admin/doctor.service';
import * as alertify from 'alertifyjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/service/user/user.service';


@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent  implements OnInit {
  doctorForm!: FormGroup;
  doctorList : any[] =[];
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private doctorService:DoctorService, private userService : UserService) {

   }

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      department: [''],
      picture: [''],
      dob: [''],
      sex: ['', Validators.required],
      bloodGroup: [''],
      specialist: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: [''],
      mobileNo: ['', Validators.required],
      careerTitle: ['', Validators.required],
      biography: [''],
      status: ['active', Validators.required]
    });
    this.getDoctorList();

  }

  getDoctorList(){
    this.doctorService.getDoctor().subscribe((data)=>{
      // console.log(data);
      this.doctorList=data;
      console.log(this.doctorList);

    })
  }
  onSubmit() {
   
    if(this.doctorForm.valid){
      this.userService.postRegister(this.doctorForm.value).subscribe((data)=>{
       console.log(data);
       alertify.success('Doctor Added Successfully')
       this.doctorForm.reset()
      })

    }
    else{
      alertify.error('Invalid Form')
    }

    
  }
}