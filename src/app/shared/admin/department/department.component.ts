import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../core/service/admin/department.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponentimplements {
  departmentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
      mainDepartment: ['', Validators.required],
      flaticon: [''],
      description: [''],
      status: ['active', Validators.required]
    });
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.departmentService.postDepartment(this.departmentForm.value).subscribe((res) => {
        console.log(res);
        alertify.success('Successfully added')
        this.departmentForm.reset()
      })
      this.departmentService.getDepartment(this.departmentForm.value).subscribe((data) => {
        console.log(data);
        
      })
    }
    else {
      console.log('Department Add form doesnot work');
      alertify.error('Form Invalid')
    }
  }
}