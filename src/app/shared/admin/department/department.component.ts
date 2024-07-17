import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../core/service/admin/department.service';
import * as alertify from 'alertifyjs';
import { NgxPaginationModule } from 'ngx-pagination';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponentimplements {
  departmentForm!: FormGroup;
  p: number = 1;
  editingDepartmentId: string | null = null;
  editing: boolean = false;
  searchTerm: string = '';
  filteredDepartments: any[] = [];



  constructor(private formBuilder: FormBuilder, private departmentService: DepartmentService) { }
  department: any[] = []
  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
      // mainDepartment: ['', Validators.required],
      flaticon: [''],
      description: [''],
      status: ['active', Validators.required]
    });
    this.getDepartmentList()
  }
  filterDepartments(): void {
    this.filteredDepartments = this.department.filter((department) =>
      department.departmentName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  getDepartmentList() {
    this.departmentService.getDepartment().subscribe((data) => {
      this.department = data
      this.filteredDepartments = [...this.department];
      console.log(this.department);

    })
  }
  clearSearch(): void {
    this.searchTerm = '';
    this.filterDepartments();
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
  onSubmit(): void {
    if (this.departmentForm.valid) {
      const formData = this.departmentForm.value;
      if (this.editingDepartmentId) {
        this.departmentService.updateDepartment(this.editingDepartmentId, formData).subscribe(
          (res) => {
            console.log('Department updated successfully:', res);
            this.editingDepartmentId = null;
            this.departmentForm.reset();
            this.getDepartmentList();
          },
          (error) => {
            console.error('Error updating department:', error);
          }
        );
      } else {
        this.departmentService.postDepartment(formData).subscribe(
          (res) => {
            console.log('Department added successfully:', res);
            this.departmentForm.reset();
            this.getDepartmentList();
          },
          (error) => {
            console.error('Error adding department:', error);
          }
        );
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  editDepartment(department: any): void {
    this.editingDepartmentId = department._id;
    this.departmentForm.patchValue({
      departmentName: department.departmentName,
      mainDepartment: department.mainDepartment,
      flaticon: department.flaticon,
      description: department.description,
      status: department.status
    });
  }




  cancelEdit(): void {
    this.editingDepartmentId = null;
    this.departmentForm.reset();
  }
}