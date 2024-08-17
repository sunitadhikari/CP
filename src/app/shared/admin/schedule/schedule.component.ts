import { Component, OnInit } from '@angular/core';
import { SharedTableComponent } from '../../sharedComponent/shared-table/shared-table.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../../core/service/admin/schedule.service';
import * as alertify from 'alertifyjs';
import { DoctorService } from '../../../core/service/admin/doctor.service';

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
  doctorName: any[] = [];
  scheduleDoctorTable: any[] = [];
  schedulePatientTable: any[]=[]
  userRole: string | null | undefined;
  constructor(private fb: FormBuilder, private scheduleService: ScheduleService,private doctorService:DoctorService) {
    this.getDoctorList();
    this.getScheduleByPatients();
   }

  getSchedule() {
    this.scheduleService.getSchedule().subscribe((data) => {
      console.log('Api data is', data);
      this.scheduleTable = data
    })
  }
  getDoctorList(){
    this.doctorService.getDoctor().subscribe((res)=>{
      this.doctorName=res.doctors
    })
  }

  getScheduleByDoctorFun() {
    this.scheduleService.getScheduleByDoctor().subscribe((data => {
      console.log('api data is ', data);
      this.scheduleDoctorTable = data.data

    }))
  }
  getScheduleByPatients() {
    this.scheduleService.getSchedule().subscribe((data => {
      console.log('api data is ', data);
      this.schedulePatientTable = data

    }))
  }
  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole')
    this.scheduleForm = this.fb.group({
      doctorName: ['', Validators.required],
      availableDays: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      sex: ['', Validators.required]
    }, { validators: this.timeDifferenceValidator });
  
    this.getSchedule();
    this.getScheduleByDoctorFun();
    this.getScheduleByPatients()
  }
  timeDifferenceValidator(group: AbstractControl): ValidationErrors | null {
    const startTime = group.get('startTime')!.value;
    const endTime = group.get('endTime')!.value;

    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}:00`);
      const end = new Date(`1970-01-01T${endTime}:00`);
      const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); 

      if (diff >= 2 && diff <= 4) {
        return null;
      }
      return { timeDifference: true };
    }
    return null;
  }

  submit() {
    if (this.scheduleForm.valid) {
      this.scheduleService.postSchedule(this.scheduleForm.value).subscribe((data) => {
        console.log(data);
      })
      alertify.success('Form Filled Successfully')
      this.scheduleForm.reset()
      this.getSchedule()
    }
    else {
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