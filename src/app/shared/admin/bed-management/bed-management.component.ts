import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BedService } from '../../../core/service/bed/bed.service';
import * as alertify from 'alertifyjs';
import { RoomManagementService } from '../../../core/service/room-management/room-management.service';
import { DepartmentService } from '../../../core/service/admin/department.service';
import { NgxPaginationModule } from 'ngx-pagination'; 


@Component({
  selector: 'app-bed-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule,NgxPaginationModule],
  templateUrl: './bed-management.component.html',
  styleUrl: './bed-management.component.css'
})
export class BedManagementComponent implements OnInit {
  beds: any[] = [];
  bedForm: FormGroup;
  departments: any[] = [];
  departmentBeds: any[] = []; 
  filteredBeds: any[] = [];
  p: number = 1;
  filterForm: FormGroup;


  constructor(
    private bedService: BedService,
    private departmentService: DepartmentService,
    private fb: FormBuilder
  ) {
    this.bedForm = this.fb.group({
      department: ['', Validators.required],
      bedNumbers: ['', [Validators.required, Validators.pattern(/^\d+(,\d+)*$/)]],
      charges: [0, [Validators.required, Validators.min(0)]],
      occupied: [false]

    })
    this.filterForm = this.fb.group({
      department: [''],
      status: ['all'] 
    });
  }

  ngOnInit(): void {
    this.fetchBeds();
    this.fetchDepartments();
  }
  applyFilters(): void {
    const departmentFilter = this.filterForm.value.department;
    const statusFilter = this.filterForm.value.status;

    this.filteredBeds = this.beds.filter(bed => {
      const matchDepartment = !departmentFilter || bed.department === departmentFilter;

      let matchStatus = true;
      if (statusFilter === 'occupied') {
        matchStatus = bed.occupied;
      } else if (statusFilter === 'unoccupied') {
        matchStatus = !bed.occupied;
      }

      return matchDepartment && matchStatus;
    });
  }

  resetFilters(): void {
    this.filterForm.reset({ status: 'all' });
    this.applyFilters();
  }
  fetchBeds(): void {
    this.bedService.getBeds().subscribe(
      (data) => {
        this.beds = data;
        this.applyFilters(); 
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

addBed(): void {
  if (this.bedForm.valid) {

    this.bedService.addBed(this.bedForm.value).subscribe(
      (data) => {
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