import { Component, OnInit } from '@angular/core';
import { SharedTableComponent } from '../../sharedComponent/shared-table/shared-table.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../../core/service/admin/schedule.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [SharedTableComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  scheduleForm!: FormGroup
  constructor(private fb: FormBuilder, private scheduleService: ScheduleService) { }
  appointments = [
    { id: 1, patient: 'John Doe', Doctor: 'Dr. Smith', date: '2024-06-18', Time: '10:00 AM', Status: 'Scheduled' },
    { ID: 2, patient: 'Jane Smith', Doctor: 'Dr. Johnson', date: '2024-06-19', Time: '11:00 AM', Status: 'Confirmed' }
  ];
  tableColumns = [
    { field: 'id', header: 'ID' },
    { field: 'patient', header: 'Patient' },
    { field: 'Doctor', header: 'Doctor' },
    { field: 'date', header: 'Date' },
    { field: 'Time', header: 'Time' },
    { field: 'Status', header: 'Status' },
  ];
  actions = [
    { label: 'Edit', action: this.editItem },
    { label: 'Delete', action: this.deleteItem }
  ];

  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      doctorName: ['', Validators.required],
      availableDays: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      sex: ['', Validators.required]
    })
  }
  submit() {
    console.log('Checked');
    debugger
    if (this.scheduleForm.valid) {
      this.scheduleService.postSchedule(this.scheduleForm.value).subscribe((data) => {
        console.log(data);
      })
      alertify.success('Form Filled Successfully')
      this.scheduleForm.reset()
    }
    else {
      debugger
      alertify.error('Invalid Form ')
    }
  }
  editItem(row: any) {
    console.log('Editks item:', row);
  }

  deleteItem(row: any) {
    console.log('Delete item:', row);
  }
}