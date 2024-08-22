import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabTechService } from '../../../../core/service/lab-tech/lab-tech.service';
import * as alertify from 'alertifyjs';
import { UserService } from '../../../../core/service/user/user.service';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.css'
})
export class LabComponent implements OnInit {

  labForm!: FormGroup
  labList: any[] = []
  constructor(private fb: FormBuilder, private labService: LabTechService, private userService:UserService) { }

  ngOnInit(): void {
    this.labForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      department: [''],
      image: [''],
      dob: [''],
      sex: ['', Validators.required],
      bloodGroup: [''],
      specialist: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: [''],
      mobileNo: ['', Validators.required],
      careerTitle: ['', Validators.required],
      biography: [''],
      status: ['active', Validators.required],
      role:['labtec']
    })
    this.labTable()
  }
  labTable(){
    this.labService.getLab().subscribe((data)=>{
      console.log(data);
      this.labList = data.labtecs
    })
  }
  onSubmit() {
    // console.log(this.labForm.value);
    if (this.labForm.valid) {
      this.userService.postRegister(this.labForm.value).subscribe((data) => {
        console.log(data);
        alertify.success('Check your mail for validation')
        this.labForm.reset()
      })
    }
    else {
      alertify.error('Form is not valid.')
    }
  }
  edit(){}
delete(){}
}
