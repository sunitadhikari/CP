import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../../core/service/admin/department.service';
import * as alertify from 'alertifyjs';
import { NgxPaginationModule } from 'ngx-pagination';

import { CommonModule } from '@angular/common';
import { ConfirmationService } from '../../confirmation/confirmation.service';

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



  constructor(private formBuilder: FormBuilder, private departmentService: DepartmentService
    ,private confirmationService:ConfirmationService
  ) { }
  department: any[] = []
  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      departmentName: ['', Validators.required],
      mainDepartment: ['', Validators.required],
      flaticon: [''],
      description: ['', Validators.required],
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
     this.department =data.departments
     this.filteredDepartments = [...this.department];
      console.log(this.department);

    })
  }
  clearSearch(): void {
    this.searchTerm = '';
    this.filterDepartments();
  }
  async deleteDepartment(id: string) {
    console.log('button isclicked');
    const confirmed = await this.confirmationService.showConfirmationPopup();
    if (confirmed) {
      this.departmentService.deleteDepartment(id).subscribe(
        (response) => {
          this.getDepartmentList();
          this.confirmationService.showSuccessMessage('Delete Successfully ');
          console.log('Department deleted:', response);
        },
        (error) => {
          this.confirmationService.showErrorMessage('Sorry, Cannot be Deleted');
          this.getDepartmentList();
          console.error('Error deleting department:', error);
        }
      );
    } else {
      this.confirmationService.showErrorMessage('Delete operation cancelled');
    }
  }
  
  onSubmit(): void {
    if (this.departmentForm.valid) {
      const formData = this.departmentForm.value;
      if (this.editingDepartmentId) {
        this.departmentService.updateDepartment(this.editingDepartmentId, formData).subscribe(
          (res) => {
            console.log('Department updated successfully:', res);
            this.confirmationService.showSuccessMessage('Department updated successfully');
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
            this.confirmationService.showSuccessMessage('Department added successfully');

            this.departmentForm.reset();
            this.getDepartmentList();
          },
          (error) => {
            console.error('Error adding department:', error);
            this.confirmationService.showErrorMessage('Error adding department');
          }
        );
      }
      alertify.success('Department added successfully.')

    } else {
      console.error('Form is invalid.');
      this.confirmationService.showErrorMessage('Form is invalid');

      
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