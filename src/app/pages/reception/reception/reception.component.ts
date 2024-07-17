import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import * as alertify from 'alertifyjs';
import { DepartmentService } from '../../../core/service/admin/department.service';
import { UserService } from '../../../core/service/user/user.service';
import { ReceptionService } from '../reception.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reception',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reception.component.html',
  styleUrl: './reception.component.css'
})
export class ReceptionComponent implements OnInit{



  receptionForm!: FormGroup;
  receptionList : any[] =[];
  departmentList : any[] =[];
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private receptionService:ReceptionService,private departmentService:DepartmentService, private userService : UserService) {

   }

  ngOnInit(): void {
    this.receptionForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      picture: [''],
      dob: [''],
      sex: ['', Validators.required],
      bloodGroup: [''],
      address: ['', Validators.required],
      mobileNo: ['', Validators.required],
      status: ['active', Validators.required],
      role:['reception']
    });

  }

  onSubmit() {
   
    if(this.receptionForm.valid){
      this.userService.postRegister(this.receptionForm.value).subscribe((data)=>{
      
       console.log(data);
       alertify.success('reception Added Successfully')
     
       this.receptionForm.reset()
      })
    }
    else{
      alertify.error('Invalid Form')
    }
  }
  edit(){}

  delete(id: string): void {
   
  }
}
