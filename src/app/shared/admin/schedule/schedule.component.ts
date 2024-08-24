import { Component, OnInit } from '@angular/core';
import { SharedTableComponent } from '../../sharedComponent/shared-table/shared-table.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScheduleService } from '../../../core/service/admin/schedule.service';
import * as alertify from 'alertifyjs';
import { DoctorService } from '../../../core/service/admin/doctor.service';
import { ConfirmationService } from '../../confirmation/confirmation.service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [SharedTableComponent, CommonModule, ReactiveFormsModule, FormsModule,NgxPaginationModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {
  scheduleForm!: FormGroup
  scheduleTable: any[] = [];
  doctorName: any[] = [];
  scheduleDoctorTable: any[] = [];
  schedulePatientTable: any[] = []
  userRole: string | null | undefined;
  editSchedule: any = null;
  p: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService, private doctorService: DoctorService, private confirmationService: ConfirmationService) {
    this.getDoctorList();
    this.getScheduleByPatients();
  }

  getSchedule() {
    this.scheduleService.getSchedule().subscribe((data) => {
      console.log('Api data is', data);
      this.scheduleTable = data
    })
  }
  getDoctorList() {
    this.doctorService.getDoctor().subscribe((res) => {
      this.doctorName = res.doctors
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
      // availableDays: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      // mobileNumber: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      // sex: ['', Validators.required]
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
      if (this.editSchedule) {
        this.updateSchedule();
      }
      else {
        this.createSchedule();
      }
    }
    else {
      alertify.error('Invalid Form')
    }
  }

  createSchedule() {
    if (this.scheduleForm.valid) {
    //   const formData = { ...this.scheduleForm.value };
    // formData.date = this.formatDate(formData.date);

      this.scheduleService.postSchedule(this.scheduleForm.value).subscribe({
        next: (data) => {
          console.log(data);
          alertify.success('Schedule created successfully');
          this.scheduleForm.reset();
          this.getSchedule();
        },
        error: (error) => {
          // Handle error based on the response status
          if (error.status === 400) {
            alertify.error('Schedule already exists for this doctor on the specified day.');
          } else {
            alertify.error('An error occurred while creating the schedule.');
          }
        }
      });
    } else {
      alertify.error('Invalid Form');
    }
  }
  updateSchedule(): void {
    if (this.editSchedule && this.scheduleForm.valid) {

      // const formData = { ...this.scheduleForm.value };
      // formData.date = this.formatDate(formData.date);

      this.scheduleService.updateSchedule(this.editSchedule._id, this.scheduleForm.value).subscribe({
        next: (res) => {
          alertify.success('Doctor updated successfully');
          this.editSchedule = null;
          this.scheduleForm.reset();
          this.getScheduleByDoctorFun();
        },
        error: (error) => {
          // Handle error based on the response status
          if (error.status === 400) {
            alertify.error('Schedule conflict detected. Please choose a different day.');
          } else {
            alertify.error('Failed to update doctor');
          }
        }
      });
    } else {
      alertify.error('Invalid Form or no schedule to update');
    }
  }

  // updateSchedule(): void {
  //   this.scheduleService.updateSchedule(this.editSchedule._id, this.scheduleForm.value).subscribe((res) => {
  //     alertify.success('Doctor updated successfully');
  //     this.editSchedule = null;
  //     this.scheduleForm.reset();
  //     this.getScheduleByDoctorFun();
  //   },
  //     (error) => {
  //       alertify.error('Failed to update doctor')
  //     }
  //   )
  // }

  edit(schedule: any): void {
    this.editSchedule = schedule;
    this.scheduleForm.patchValue({
      doctorName: schedule.doctorName,
      availableDays: schedule.availableDays,
      date: schedule.date,
      startTime: schedule.startTime,
      endTime: schedule.endTime
    });
  }
  // formatDate(date: string): string {
  //   return new Date(date).toDateString(); // Format date as "Sun Sep 01 2024"
  // }
  async delete(id: string): Promise<void> {
    const confirm = await this.confirmationService.showConfirmationPopup();
    if (confirm) {
      this.scheduleService.deleteSchedule(id).subscribe((res) => {
        this.confirmationService.showSuccessMessage('Delete Successfully')
        this.getScheduleByDoctorFun()
      },
        (error) => {
          this.confirmationService.showErrorMessage('Sorry, cannot be deleted')
          this.getScheduleByDoctorFun();
        }
      )
    }
    else {
      this.confirmationService.showErrorMessage('Delete operation cancelled')
    }
  }
}