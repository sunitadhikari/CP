import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BedService } from '../../../core/service/bed/bed.service';
import * as alertify from 'alertifyjs';
import { RoomManagementService } from '../../../core/service/room-management/room-management.service';
import { DepartmentService } from '../../../core/service/admin/department.service';


@Component({
  selector: 'app-bed-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './bed-management.component.html',
  styleUrl: './bed-management.component.css'
})
export class BedManagementComponent implements OnInit {
  beds: any[] = [];
  bedForm: FormGroup;
  departments: any[] = [];
  departmentBeds: any[] = []; // Holds department beds info (occupied and unoccupied)

  constructor(
    private bedService: BedService,
    private departmentService: DepartmentService,
    private fb: FormBuilder
  ) {
    this.bedForm = this.fb.group({
      department: ['', Validators.required],
      bedNumbers: ['', Validators.required],
      charges: [0, Validators.required] ,
      occupied: [false]

    })
  }

  ngOnInit(): void {
    this.fetchBeds();
    this.fetchDepartments();
  }

  fetchBeds(): void {
    this.bedService.getBeds().subscribe(
      (data) => {
        this.beds = data;
      },
      (error) => {
        console.error('Error fetching beds:', error);
      }
    );
  }

  fetchDepartments(): void {
    this.departmentService.getDepartment().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }
 // Angular Component

addBed(): void {
  if (this.bedForm.valid) {
   // Ensure 'bedNumber' matches the formControlName in your HTML

    this.bedService.addBed(this.bedForm.value).subscribe(
      (data) => {
        // this.beds.push(data); // Assuming 'data' is the new bed object returned from the API
        alertify.success('Beds added successfully');
        this.bedForm.reset();
      },
      (error) => {
        console.error('Error adding beds:', error);
        alertify.error('Failed to add beds');
      }
    );
  } else {
    alertify.error('Invalid form');
  }
}


  

  private areUniquePositiveNumbers(numbers: number[]): boolean {
    const uniqueNumbers = new Set(numbers);
    return numbers.every(num => num > 0 && uniqueNumbers.has(num));
  }
}