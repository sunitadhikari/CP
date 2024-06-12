import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../core/service/admin/department.service';
import * as alertify from 'alertifyjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponentimplements {
  departmentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private departmentService: DepartmentService) { }
department : any[] =[]
  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
      mainDepartment: ['', Validators.required],
      flaticon: [''],
      description: [''],
      status: ['active', Validators.required]
    });
    this.getDepartmentList()
  }

  getDepartmentList(){
    this.departmentService.getDepartment(this.departmentForm.value).subscribe((data) => {
     this.department =data
      console.log(this.department);
      
    })
  } 

  onSubmit() {
    if (this.departmentForm.valid) {
      this.departmentService.postDepartment(this.departmentForm.value).subscribe((res) => {
        console.log(res);
        alertify.success('Successfully added')
        this.departmentForm.reset()
      })
   
    }
    else {
      console.log('Department Add form doesnot work');
      alertify.error('Form Invalid')
    }
  }
}