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
  scheduleTable: any[] = [];
  scheduleDoctorTable: any[] = [];
  schedulePatientTable: any[]=[]
  userRole: string | null | undefined;
  constructor(private fb: FormBuilder, private scheduleService: ScheduleService) { }

  getSchedule() {
    this.scheduleService.getSchedule().subscribe((data) => {
      console.log('Api data is', data);
      this.scheduleTable = data
    })
  }

  getScheduleByDoctor() {
    this.scheduleService.getScheduleByDoctor().subscribe((data => {
      console.log('api data is ', data);
      this.scheduleDoctorTable = data.data

    }))
  }
  getScheduleByPatients() {
    this.scheduleService.getScheduleByPatient().subscribe((data => {
      console.log('api data is ', data);
      this.schedulePatientTable = data.data

    }))
  }
  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole')

    this.scheduleForm = this.fb.group({
      doctorName: ['', Validators.required],
      availableDays: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      sex: ['', Validators.required]
    })
    this.getSchedule();
    this.getScheduleByDoctor();
    this.getScheduleByPatients()
  }
  submit() {
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
  edit() {
    console.log('Editks item:');
  }

  delete() {
    console.log('Delete item:');
  }
}