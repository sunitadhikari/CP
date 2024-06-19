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
  ];
  tableColumns = [
    { field: '_id', header: 'SN' },
    { field: 'availableDays', header: 'availableDays' },
    { field: 'startTime', header: 'Start Time' },
    { field: 'endTime', header: 'Day' },
    { field: 'endTime', header: 'End Time' },
    { field: 'status', header: 'Status' },
  ];
  actions = [
    { label: 'Edit', action: this.editItem },
    { label: 'Delete', action: this.deleteItem }
  ];
  getSchedule(){
    debugger
    this.scheduleService.getSchedule().subscribe((data)=>{
      console.log('Api data is' , data);
      this.appointments= data
      debugger
    })
 
  }

  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      doctorName: ['', Validators.required],
      availableDays: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      sex: ['', Validators.required]
    })
    this.getSchedule()
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