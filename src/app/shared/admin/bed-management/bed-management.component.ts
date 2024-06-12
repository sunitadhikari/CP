import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-bed-management',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './bed-management.component.html',
  styleUrl: './bed-management.component.css'
})
export class BedManagementComponent implements OnInit {
  bedForm!: FormGroup;
  statuses = ['Active', 'Inactive'];

  constructor(private fb: FormBuilder,) { }

  ngOnInit() {
    this.bedForm = this.fb.group({
      name: ['', Validators.required],
      bedNumber: [0, Validators.required],
      bedCapacity: [0, Validators.required],
      description: [''],
      status: ['Active', Validators.required]
    });
  }

  onSubmit() {
    if (this.bedForm.valid) {
     
    }
  }
}