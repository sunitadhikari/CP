import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponentimplements {
  departmentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
    if (this.departmentForm.invalid) {
      return;
    }}}