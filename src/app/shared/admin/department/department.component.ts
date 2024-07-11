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
    this.departmentService.getDepartment().subscribe((data) => {
     this.department =data
      console.log(this.department);
      
    })
  } 
  deleteDepartment(id: string) {
    this.departmentService.deleteDepartment(id).subscribe(
      (response) => {
        alertify.success('Successfully Deleted')
        this.getDepartmentList()

        console.log('Department deleted:', response);
      },
      error => {
        console.error('Error deleting department:', error);
        this.getDepartmentList()
      }
    );
  }
  onSubmit() {
    if (this.departmentForm.valid) {
      this.departmentService.postDepartment(this.departmentForm.value).subscribe((res) => {
        console.log(res);
        alertify.success('Successfully added')
        this.departmentForm.reset()
        this.getDepartmentList()

      })
   
    }
    else {
      console.log('Department Add form doesnot work');
      alertify.error('Form Invalid')
    }
  }
}